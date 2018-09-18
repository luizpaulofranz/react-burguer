import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../../components/Order/Order';
import axios from '../../../axios-order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/Ui/Spinner/Spinner';
import * as actions from '../../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
        // using redux to dispatch an action to bring the state (props) to us
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order 
                    key={order.id}
                    price={+order.price}
                    ingredients={order.ingredients} />
            ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // (param) (reducer) (property)
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));