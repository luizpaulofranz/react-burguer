import React, { Component } from 'react';

import Modal from '../../components/Ui/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    // returns a anonimous class
    return class extends Component {

        state = {
            erro: null
        }

        // here we assign interceptors to axios to handle errors
        componentWillMount () {
            // we store the interceptors to remove them in componentWillUnmount
            this.reqInterceptors = axios.interceptors.request.use(req => {
                // always clean possible previous errors
                this.setState({error: null});
                return req;
            });
            // we are interested in intercept only the errors here 
            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        // and here we remove interceptors to avoid duplications of interceptors
        // because of multiple instances fos this module
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        // to close the modal with error
        errorCloseHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClose={this.errorCloseHandler}>
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;