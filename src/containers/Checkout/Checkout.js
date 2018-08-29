import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null
    }

    proceedCheckoutHandler = () => {
        // we've access to history by react-rout
        this.props.history.replace('/checkout/contact-data');
    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    render() {
        // control if the ingredients are empty, redirect to root page
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            summary = (
                <div>
                    <CheckoutSummary 
                        ingredients={this.props.ings} 
                        cancelCheckout={this.cancelCheckoutHandler}
                        proceedCheckout={this.proceedCheckoutHandler} />
                    {/* this is how we get the current path, and we add more on it,
                    to build nested Routes*/}
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    // ing become a prop here in this component
    // which contains the state stored in Redux
    return {
        ings: state.burgerBuilder.ingredients
    };
}
// we don't need the dispatcher here, there's no action
export default connect(mapStateToProps, null)(Checkout);