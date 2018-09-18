// precisamos importar React para transpilar o JSX
import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

// todo componente deve retornar algum HTML para ser renderizado
class App extends Component {

  componentDidMount() {
    // verifica se temos um token salvo localmente
    this.props.onTryAutoLogin();
  }

  // metodo obrigatorio, que sera usado pelo React
  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    // isso retorna JSX
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
    // codigo jsx eh transpilado para esse padrao
    // por isso importar React eh necessario
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hello World!2'));
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.authLocalStorage())
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
}

// por fim exportamos nosso(s) componente(s)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

