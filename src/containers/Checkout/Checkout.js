import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        // props.location is an object passed by router
        const query = new URLSearchParams(this.props.location.search);
        const newIngredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                newIngredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: newIngredients, totalPrice: price});
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
                    proceedCheckout={this.proceedCheckoutHandler} />
                {/* this is how we get the current path, and we add more on it*/}
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
            </div>
        );
    }
}

export default Checkout;