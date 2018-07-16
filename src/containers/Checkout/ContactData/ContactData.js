import React, { Component } from 'react';

import Button from '../../../components/Ui/Button/Button';
import Spinner from '../../../components/Ui/Spinner/Spinner';
import axios from '../../../axios-order';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        // show spinner
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'My Name',
                address: {
                    street: 'One Street',
                    zipCode: '546516',
                    country: 'Brasil'
                },
                email: 'dummydata@email.com',
            },
            deliveryMethod: 'Cheapest'
        }
        // .json to create the correct collection in firebase.
        axios.post('/orders.json', order).then(res => {
            // hide spinner
            this.setState({loading: false});
            this.props.history.push('/');
        }).catch(err => {
            console.log(err)
            this.setState({loading: false});
        });
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Name" />
                <input className={classes.Input} type="text" name="email" placeholder="Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" click={this.orderHandler} >ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;