import React, { Component } from 'react';

import Order from '../../../components/Order/Order';
import axios from '../../../axios-order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('orders.json')
        .then(res => {
            const serverOrders = [];
            for (let key in res.data) {
                serverOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({orders: serverOrders, loading: false});
        }).catch(err => {
            console.log(err);
            this.setState({loading: false});
        });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        price={+order.price}
                        ingredients={order.ingredients} />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);