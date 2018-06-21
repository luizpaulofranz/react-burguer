import React from 'react';
import Aux from '../../hoc/Aux';
// classes eh um objeto JS que contem classes CSS
// configurados com CSS components
import classes from './Layout.css';

const layout = ( props ) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;