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

const INGREDIENT_PRICES = {
    salad: 0.75,
    cheese: 1,
    meat: 2.5,
    bacon: 1.5
}

class BurgerBuilder extends Component {

    state = {
        // the ingredients and its quantities
        ingredients: null,
        // base burger price
        totalPrice: 5,
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

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        // the safe way to update state
        // create a copy of current state part and handle that copy
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = (oldCount+1);
        const ingredientPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + ingredientPrice;
        // then finally set the state to our handled state
        this.setState({totalPrice: updatedPrice, ingredients: updatedIngredients});
        // we must pass the ingredients like this, becouse setState is assyncronous operation
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0 ) {
            return;
        }
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = (oldCount-1);
        const ingredientPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - ingredientPrice;
        this.setState({totalPrice: updatedPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
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
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        // we pass price by URL
        queryParams.push('price=' + this.state.totalPrice);
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
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.props.ings} 
                purchaseProceed={this.purchaseProceedHandler} 
                purchaseCancel={this.purchaseCancelHandler} 
                price={this.state.totalPrice.toFixed(2)}
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
        ings: state.ingredients
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