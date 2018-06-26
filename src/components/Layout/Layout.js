import React from 'react';
import Aux from '../../hoc/Aux';
// classes eh um objeto JS que contem classes CSS
// configurados com CSS components
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = ( props ) => (
    <Aux>
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;