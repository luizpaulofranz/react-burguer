/** Esse eh um component Statefull, ou container, pois gerencia o estado 
 * do hamburguer mais varios componentes filhos*/

import React, { Component } from 'react';
// usamos nosso wrapper para tratar elementos adjacentes
import Aux from '../../hoc/Aux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        totalPrice: 5
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
                <Burger ingredients={this.state.ingredients}/> 
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler} 
                    disabled={disabledInfo}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;