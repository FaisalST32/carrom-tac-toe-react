import React from 'react';
import classes from './Box.module.css'

const Box = props => {
    let containerClasses = [classes.Box];
        
    if (props.isAvailableMove) {
        containerClasses.push(classes.IsAvailable);
    }

    if (props.isSelected) {
        containerClasses.push(classes.IsSelected)
    }

    let boxClasses = [];
    if (props.checked && props.player === 1) {
        boxClasses = [classes.Checked, classes.BlackChecked];
    }
    else if (props.checked && props.player === 2) {
        boxClasses = [classes.Checked, classes.WhiteChecked];
    }

    if (!props.isActive) {
        boxClasses.push(classes.Inactive);
    }

    return (
        <div className={containerClasses.join(' ')} onClick={props.clicked}>
            <div className={boxClasses.join(' ')}></div>
        </div>
    )
}

export default Box;