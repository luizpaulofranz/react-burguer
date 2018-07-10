import React, { Component } from 'react';

import Modal from '../../components/Ui/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    // returns a anonimous class
    return class extends Component {

        state = {
            erro: null
        }

        componentWillMount () {
            axios.interceptors.request.use(req => {
                // always clean possible previous errors
                this.setState({error: null});
                return req;
            });
            // we are interested in intercept only the errors here 
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
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