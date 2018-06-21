import React from 'react';
import classes from './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ( props ) => {

    // all of this turns our ingredients state in an array of BurgerIngredinet
    // Object.keys returns an array with all keys/props of a given object
    const transformIngredients = Object.keys(props.ingredients)
        .map(ingredientKey => {
            // Array return a new array with the given number of positions
            // here we create a number of specific ingredient accordly with the ingredient value
            return [...Array(props.ingredients[ingredientKey])].map(
                // this syntax indicates that the value isn't important, we want the key
                (_,i) => {
                    return <BurgerIngredient key={ingredientKey+i} type={ingredientKey} />
                }
            )
        });
    // and here we simply show the ingredient array
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;