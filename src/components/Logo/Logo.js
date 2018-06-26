import React from 'react';
// this is the react and webpack way to load an image
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = ( props ) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="My Logo" />
    </div>
);

export default logo;