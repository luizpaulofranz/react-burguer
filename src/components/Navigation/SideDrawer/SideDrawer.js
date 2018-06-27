import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import classes from './SideDrawer.css';

const sideDrawer = ( props ) => {
    return (
        <div className={classes.SideDrawer}>
            {/* adjust to responsivity*/ }
            <div style={{height: '11%', marginBottom: "32px"}}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
}

export default sideDrawer;