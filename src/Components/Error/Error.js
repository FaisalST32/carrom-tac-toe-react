import React from 'react';
import classes from './Error.module.css'

const Error = (props) => {
    let errorArea = '';
    if (props.showError) {
        errorArea = (
            <div className={classes.ErrorContainer}>
                <small>Invalid Move</small><br/>
                <div className={classes.ErrorMessage}>{props.errorMessage}</div>
            </div>
        )
    }
    return (
        errorArea
    )
}

export default Error
