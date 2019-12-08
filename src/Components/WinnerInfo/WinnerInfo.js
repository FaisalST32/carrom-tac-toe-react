import React from 'react'
import classes from './WinnerInfo.module.css';

const WinnerInfo = props => {
    let winnerInfo_html = null;

    if (props.gameover) {
        const winner = props.winner === 1 ? 'Black' : 'White';
        winnerInfo_html = (

            <div className={classes.WinnerInfo}>
                <div className={classes.Header}>Game Over</div>
                <div className={classes.Body}>
                    {winner} has won!
                    <button className={[classes.NewGameButton, 'Button'].join(' ')} onClick={props.newGame}>New Game</button>
                </div>
            </div>
        )
    }
    return winnerInfo_html;
}

export default WinnerInfo
