// precisamos importar React para transpilar o JSX
import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// todo componente deve retornar algum HTML para ser renderizado
class App extends Component {
  // metodo obrigatorio, que sera usado pelo React
  render() {
    // isso retorna JSX
    return (
      <div>
        <Layout>
          <BurgerBuilder/>
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
