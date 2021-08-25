import React from 'react';
import classes from './Box.module.css'

const Box = props => {
    let boxClasses = [classes.Box];

    if (props.checked && props.player === 1) {
        boxClasses = [classes.Checked, classes.BlackChecked];
    }
    else if (props.checked && props.player === 2) {
        boxClasses = [classes.Checked, classes.WhiteChecked];
    }
    
    if (props.isAvailableMove) {
        boxClasses.push(classes.IsAvailable);
    }

    if (props.isSelected) {
        boxClasses.push(classes.IsSelected)
    }

    if (!props.isActive) {
        boxClasses.push(classes.Inactive);
    }

    return (
        <div className={boxClasses.join(' ')} onClick={props.clicked}>
            <div className={boxClasses.join(' ')}></div>
        </div>
    )
}

export default Box;