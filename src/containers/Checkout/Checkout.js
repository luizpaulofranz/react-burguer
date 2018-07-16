import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            cheese: 1,
            meat: 1,
            bacon:2
        }
    }

    componentDidMount() {
        // props.location is an object passed by router
        const query = new URLSearchParams(this.props.location.search);
        const newIngredients = {};
        for (let param of query.entries()) {
            newIngredients[param[0]] = +param[1];
        }
        this.setState({ingredients: newIngredients});
    }

    proceedCheckoutHandler = () => {
        // we've access to history by react-rout
        this.props.history.replace('/checkout/contact-data');
    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    cancelCheckout={this.cancelCheckoutHandler}
                    proceedCheckout={this.proceedCheckoutHandler}
                />
            </div>
        );
    }
}

export default Checkout;