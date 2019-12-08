import React from 'react'
import classes from './GameInfo.module.css'

const GameInfo = (props) => {
    return (
        <div className={classes.GameInfo}>
            {props.currentPlayer === 1 ? 'Black' : 'White'} plays
        </div>
    )
}

export default GameInfo
