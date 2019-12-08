import React from 'react';
import classes from './Box.module.css'

const Box = props => {
    let boxContent = '';
    let boxClasses = [classes.Box];
    if (props.checked && props.player === 1) {
        boxContent = <div className={[classes.Checked, classes.BlackChecked].join(' ')}></div>
    }
    else if (props.checked && props.player === 2) {
        boxContent = <div className={[classes.Checked, classes.WhiteChecked].join(' ')}></div>
    }
    
    if (props.isAvailableMove) {
        boxClasses.push(classes.IsAvailable);
    }

    if (props.isSelected) {
        boxClasses.push(classes.IsSelected)
    }

    return (
        <div className={boxClasses.join(' ')} onClick={props.clicked}>
            {boxContent}
        </div>
    )
}

export default Box;