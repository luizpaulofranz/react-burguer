/** Esse eh um component Statefull, ou container, pois gerencia o estado 
 * do hamburguer mais varios componentes filhos*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
// usamos nosso wrapper para tratar elementos adjacentes
import Aux from '../../hoc/Aux/Aux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/Ui/Spinner/Spinner';
import withErrorhandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        // the ingredients and its quantities
        ingredients: null,
        // to disable checkout button
        purchasable: false,
        // to toggle modal
        purchasing: false,
        // to show spinner
        loading: false,
        error: null
    }

    componentDidMount () {
        axios.get('https://study-react-burger.firebaseio.com/ingredients.json')
        .then(res => {
            this.setState({ingredients: res.data});
        })
        .catch(err => {this.setState({error:true})});
    }

    updatePurchaseState = (currentIngredients) => {
        // Object.values returns an array with values of object properties, similiar with keys()
        // here we sum the values of all our ingredients
        const sum = Object.values(currentIngredients).reduce((sum, el) => {
            return sum + el;
        },0);
        this.setState({purchasable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false });
    }

    purchaseProceedHandler = () => {
        // here we mount our GETs in URL
        const queryParams = [];
        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        }
        // we pass price by URL
        queryParams.push('price=' + this.props.totalPrice);
        const queryString = queryParams.join('&');
        // here we force the navigation to another URL WITH our query params
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    // and here we pass down our state handlers as props
    render() {
        // copy disableinfo array
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            // a simple array which contains true or false in each position
            // used to disable or not the Less button
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // show or hide spinner on order summary until server responses
        let orderSummary = null;
        // shows spinner on burgers place until the ingredients's loaded
        let burger = this.state.error ? <p>Can't load the ingredients!</p>:<Spinner />;
        // components that uses ingredients must be checked
        if (this.props.ings) {
            burger = (
            <Aux>
                <Burger ingredients={this.props.ings}/> 
                <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded} 
                    ingredientRemoved={this.props.onIngredientRemoved} 
                    disabled={disabledInfo}
                    price={this.props.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.props.ings} 
                purchaseProceed={this.purchaseProceedHandler} 
                purchaseCancel={this.purchaseCancelHandler} 
                price={this.props.totalPrice.toFixed(2)}
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    // ing become a prop here in this component
    // which contains the state stored in Redux
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    // this two became props too, with contains the methods to change global state
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    };
}

// global error handler
export default connect(mapStateToProps, mapDispatchToProps)(withErrorhandler(BurgerBuilder, axios));