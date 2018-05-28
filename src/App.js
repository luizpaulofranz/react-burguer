// precisamos importar React para transpilar o JSX
import React, { Component } from 'react';
import './App.css';

// todo componente deve retornar algum HTML para ser renderizado
class App extends Component {
  // metodo obrigatorio, que sera usado pelo React
  render() {
    // isso retorna JSX
    return (
      <div className="App">
        <h1>Hello World!</h1>
      </div>
    );
    // codigo jsx eh transpilado para esse padrao
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hello World!2'));
  }
}

// por fim exportamos nosso(s) componente(s)
export default App;
