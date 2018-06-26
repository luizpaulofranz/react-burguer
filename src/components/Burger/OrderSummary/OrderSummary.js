import React from 'react';
import Aux from '../../../hoc/Aux';

import Button from '../../Ui/Button/Button';

const orderSummary = (props) => {
    const ingredientsList = Object.keys(props.ingredients)
        .map( ingKey => {
            return (
                <li key={ingKey}>
                    <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]}
                </li>
            );
        })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients!</p>
            <ul>
                {ingredientsList}
            </ul>
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue with checkout?</p>
            <Button click={props.purchaseCancel} btnType="Danger">CANCEL</Button>
            <Button click={props.purchaseProceed} btnType="Success">CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;