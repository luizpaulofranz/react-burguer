import React, { Component } from 'react';

import Button from '../../components/Ui/Button/Button';
import Input from '../../components/Ui/Input/Input';
import Spinner from '../../components/Ui/Spinner/Spinner';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import classes from './Auth.css';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6 // required by firebase
                },
                valid: false,
                touched: false
            }
        },
        // to switch between sginup and signin
        isSignup: true
    }

    isValid(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangeHandler = ( event, controlName ) => {
        const updatedForm = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.isValid(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedForm});
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup
        )
    }

    swicthAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render() {
        // we mount an array with our form object
        const formInputs = [];
        for (let key in this.state.controls) {
            formInputs.push({
                id: key,
                config: this.state.controls[key]
            });
        };
        let form = formInputs.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                /* we only show validations styles if the field HAS validations and is invalid */ 
                invalid={(!formElement.config.valid) && formElement.config.touched && formElement.config.validation}

                change={(event) => this.inputChangeHandler(event, formElement.id)}/>
        ));
        // to show spinner when is loading
        if (this.props.loading) {
            form = <Spinner />
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (<p className={classes.Error}>{this.props.error.message}</p>);
        }
        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                    <Button btnType="Danger" click={this.swicthAuthModeHandler}>
                        SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
                    </Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pass, isSignup) => dispatch(actions.auth(email, pass, isSignup))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);