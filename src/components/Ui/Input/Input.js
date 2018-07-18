import React from 'react';
import classes from './Input.css';

const Input = ( props ) => {

    let inputEl = null;

    switch (props.inputtype){
        case ('input'):
            inputEl = <input className={classes.InputElement} {...props} />;
        break;
        case ('textarea'):
            inputEl = <textarea className={classes.InputElement} {...props} />;
        break;
        default:
            inputEl = <input className={classes.InputElement}  {...props} />;
        break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}></label>
            {inputEl}
        </div>
    );
}

export default Input;