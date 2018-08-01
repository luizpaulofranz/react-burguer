import React from 'react';
import classes from './Input.css';

const Input = ( props ) => {

    let inputEl = null;
    const inputClasses = [classes.InputElement];
    if (props.invalid) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType){
        case ('input'):
            inputEl = <input className={inputClasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.change}/>;
        break;
        case ('textarea'):
            inputEl = <textarea className={inputClasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.change}/>;
        break;
        case ('select'):
            inputEl = (
            <select className={inputClasses.join(' ')} 
            {...props.elementConfig} value={props.value} onChange={props.change}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>);
        break;
        default:
            inputEl = <input className={inputClasses.join(' ')}  
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