import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../Ui/Button/Button';

import classes from './CheckoutSummary.css';

const checkoutSummary = ( props ) => {

    return (
        <div className={classes.CheckoutSummary}>
            <h1>I hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" click={props.cancelCheckout}>CANCEL</Button>
            <Button btnType="Success" click={props.proceedCheckout}>CONTINUE</Button>
        </div>
    )

}

export default checkoutSummary;