/** Esse eh um component Statefull, ou container, pois gerencia o estado 
 * do hamburguer mais varios componentes filhos*/

import React, { Component } from 'react';
// usamos nosso wrapper para tratar elementos adjacentes
import Aux from '../../hoc/Aux';

class BurgerBuilder extends Component {
    render() {
        return (
            <Aux>
                <div>Burger Result</div>
                <div>Burger Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;