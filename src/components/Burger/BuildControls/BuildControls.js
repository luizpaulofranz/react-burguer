/* this component lists all ingredients controls, using BuildControl child component */
import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';
// this array will be our controls to add/remove ingredients
const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                clickAdd={() => props.ingredientAdded(ctrl.type)}
                clickRemove={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>
            {props.isAuth ? 'ORDER NOW' : 'SIGN IN' }
        </button>
    </div>
);

export default buildControls;