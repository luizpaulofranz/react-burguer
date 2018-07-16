import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link={"/checkout"} >Checkout</NavigationItem>
        <NavigationItem link={"/orders"} >Orders</NavigationItem>
        <NavigationItem link={"/"} exact>Burger Builder</NavigationItem>
    </ul>
);

export default navigationItems;