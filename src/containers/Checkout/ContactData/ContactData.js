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
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        postalCode:{
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP CODE'
            },
            value: '',
            validation: {
                required: true,
                minLength: 8,
                maxLength: 9
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Mail'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fasted', displayValue: 'Fasted'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: '',
            valid: true
        },
        },
        // global form validation
        formIsValid: false,
        loading: false
    }

    isValid(value, rules) {
        let isValid = true;
        
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.maxLength && isValid;
        }

        return isValid;
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        // show spinner
        this.setState({loading: true});
        const formData = {};
        for (let elementId in this.state.orderForm) {
            formData[elementId] = this.state.orderForm[elementId].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    inputChangeHandler = ( event, elementId ) => {
        // that's how we update state values in nested objects, the ... operator
        // just goes one level down
        const updatedForm = {
            ...this.state.orderForm
        };
        const updatedElement = {
            ...this.state.orderForm[elementId]
        }
        // here we update our 2 levels
        updatedElement.value = event.target.value;
        // here we check validity
        updatedElement.valid = this.isValid(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;
        updatedForm[elementId] = updatedElement;
        
        // here we check if the overall form is valid, all fields
        let formIsValid = true;
        for (let fieldId in updatedForm) {
            formIsValid = updatedForm[fieldId].valid && formIsValid;
        }
        this.setState({orderForm:updatedForm, formIsValid: formIsValid});
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
            <form onSubmit={this.orderHandler}>
                {formInputs.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        /* we only show validations styles if the field HAS validations and is invalid */ 
                        invalid={(!formElement.config.valid) && formElement.config.touched && formElement.config.validation}

                        change={(event) => this.inputChangeHandler(event, formElement.id)}/>
                ))}
                <Button disabled={!this.state.formIsValid} btnType="Success" >ORDER</Button>
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