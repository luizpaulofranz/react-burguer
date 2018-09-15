import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/Ui/Button/Button';
import Input from '../../../components/Ui/Input/Input';
import Spinner from '../../../components/Ui/Spinner/Spinner';
import axios from '../../../axios-order';
import errorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

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
            value: 'fasted', // default value
            valid: true
        },
        },
        // global form validation
        formIsValid: false
    }

    isValid(value, rules) {
        let isValid = true;
        // if has no validations
        if (!rules) {
            return isValid;
        }
        
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
        const formData = {};
        for (let elementId in this.state.orderForm) {
            formData[elementId] = this.state.orderForm[elementId].value;
        };
        const order = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            orderData: formData
        };
        this.props.onOrderBurger(order, this.props.token);
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

    // to verify if the fields are valids
    validate(value, rules) {
        let isValid = false;

        if (rules.required) {
            isValid = value.trim() !== ''
        }

        return isValid;
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
        if (this.props.loading) {
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

const mapStateToProps = state => {
    // ing become a prop here in this component
    // which contains the state stored in Redux
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(ContactData, axios));