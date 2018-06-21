/** Esse eh um component Statefull, ou container, pois gerencia o estado 
 * do hamburguer mais varios componentes filhos*/

import React, { Component } from 'react';
// usamos nosso wrapper para tratar elementos adjacentes
import Aux from '../../hoc/Aux';

import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    state = {
        // the ingredients and its quantities
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        }
    }

    render() {
        return (
            <Aux>
                <div>
                    <Burger ingredients={this.state.ingredients}/> 
                </div>
                <div>Burger Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;