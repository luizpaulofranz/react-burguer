/** Esse eh um component Statefull, ou container, pois gerencia o estado 
 * do hamburguer mais varios componentes filhos*/

import React, { Component } from 'react';
// usamos nosso wrapper para tratar elementos adjacentes
import Aux from '../../hoc/Aux/Aux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';

const INGREDIENT_PRICES = {
    salad: 0.75,
    cheese: 1,
    meat: 2.5,
    bacon: 1.5
}

class BurgerBuilder extends Component {

    state = {
        // the ingredients and its quantities
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        // base burger price
        totalPrice: 5,
        // to disable checkout button
        purchasable: false,
        // to toggle modal
        purchasing: false
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
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'My Name',
                address: {
                    street: 'One Street',
                    zipCode: '546516',
                    country: 'Brasil'
                },
                email: 'dummydata@email.com',
            },
            deliveryMethod: 'Cheapest'
        }
        // .json to create the correct collection in firebase.
        axios.post('/orders.json', order).then(
            response => console.log(response)
        ).catch(err => console.log(err));
    }

    // and here we pass down our state handlers as props
    render() {
        // copy disableinfo array
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            // a simple array which contains true or false in each position
            // used to disable or not the Less button
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} 
                        purchaseProceed={this.purchaseProceedHandler} 
                        purchaseCancel={this.purchaseCancelHandler} 
                        price={this.state.totalPrice.toFixed(2)}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/> 
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler} 
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;