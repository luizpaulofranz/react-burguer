import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link={"/checkout"} >Checkout</NavigationItem>
        {props.isAuth ? <NavigationItem link={"/orders"} >Orders</NavigationItem> : null}
        {props.isAuth ? <NavigationItem link={"/logout"} exact>Logout</NavigationItem>
                      : <NavigationItem link={"/auth"} >Authentication</NavigationItem> }
        <NavigationItem link={"/"} exact>Burger Builder</NavigationItem>
    </ul>
);

export default navigationItems;