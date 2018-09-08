// precisamos importar React para transpilar o JSX
import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { Route, Switch } from 'react-router-dom';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './containers/Auth/Auth';

// todo componente deve retornar algum HTML para ser renderizado
class App extends Component {
  // metodo obrigatorio, que sera usado pelo React
  render() {
    // isso retorna JSX
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
    // codigo jsx eh transpilado para esse padrao
    // por isso importar React eh necessario
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hello World!2'));
  }
}

// por fim exportamos nosso(s) componente(s)
export default App;
