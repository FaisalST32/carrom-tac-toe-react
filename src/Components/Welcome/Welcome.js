import React from 'react'
import classes from './Welcome.module.css'

const Welcome = props => {
    return (
        <div className={classes.Welcome}>
            <p>Welcome to Carrom-Tac-Toe</p>
            <button onClick={props.newGame} className={['Button', classes.NewGameButton].join(' ')}>New Game</button>
            <button onClick={props.toggleRules} className={['Button', classes.RulesButton].join(' ')}>Rules</button>
        </div>
    )
}

export default Welcome