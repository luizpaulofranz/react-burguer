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
// import just the actions for this component
// the actions will execute ASYN codes and THEN call the reducer 
// to finally update the state
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        // to toggle modal
        purchasing: false
    }

    componentDidMount() {
        // this action is passed by reducer (redux)
        this.props.onInitIngredients();
    }

    // only checks if we have some ingredients
    updatePurchaseState = (currentIngredients) => {
        // Object.values returns an array with values of object properties, similiar with keys()
        // here we sum the values of all our ingredients
        const sum = Object.values(currentIngredients).reduce((sum, el) => {
            return sum + el;
        },0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({purchasing: true});
        } else {
            // redirects there after login
            this.props.onSetAuthRedirectPath('/checkout')
            // history comes by router
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false });
    }

    purchaseProceedHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('checkout');
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
        let burger = this.props.error ? <p>Can't load the ingredients!</p>:<Spinner />;
        // components that uses ingredients must be checked
        if (this.props.ings) {
            burger = (
            <Aux>
                {/*the ingredients comes through props injected by redux*/}
                <Burger ingredients={this.props.ings}/> 
                <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded} 
                    ingredientRemoved={this.props.onIngredientRemoved} 
                    disabled={disabledInfo}
                    isAuth={this.props.isAuth}
                    price={this.props.totalPrice}
                    purchasable={this.updatePurchaseState(this.props.ings)}
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
    // ings become a prop here in this component
    // which contains the state stored in Redux
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    // these will became props, with contains the actionCreators
    // which execute ASYNC codes and returns an object with dispatch to the reducers
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch( actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setPathRedirect(path))
    };
}

// global error handler
export default connect(mapStateToProps, mapDispatchToProps)(withErrorhandler(BurgerBuilder, axios));