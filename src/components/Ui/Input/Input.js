import React from 'react';
import classes from './Input.css';

const Input = ( props ) => {

    let inputEl = null;

    switch (props.elementType){
        case ('input'):
            inputEl = <input className={classes.InputElement} 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.change}/>;
        break;
        case ('textarea'):
            inputEl = <textarea className={classes.InputElement} 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.change}/>;
        break;
        case ('select'):
            inputEl = (
            <select className={classes.InputElement} 
            {...props.elementConfig} value={props.value} onChange={props.change}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>);
        break;
        default:
            inputEl = <input className={classes.InputElement}  
            {...props.elementConfig} 
            value={props.value}
            onChange={props.change}/>;
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