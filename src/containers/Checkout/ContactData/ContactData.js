import React, { Component } from 'react';

import Button from '../../../components/Ui/Button/Button';
import Spinner from '../../../components/Ui/Spinner/Spinner';
import axios from '../../../axios-order';

import Input from '../../../components/Ui/Input/Input';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        // this giant object will generate our form
        orderForm: {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: ''
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: ''
        },
        postalCode:{
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP CODE'
            },
            value: ''
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: ''
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Mail'
            },
            value: ''
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fasted', displayValue: 'Fasted'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: ''
        },
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
        // we mount an array with our form object
        const formInputs = [];
        for (let key in this.state.orderForm) {
            formInputs.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form>
                {formInputs.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.value}/>
                ))}
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