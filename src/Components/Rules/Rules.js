import React from 'react'
import classes from './Rules.module.css';

const Rules = props => {
    let rules_html = null;
    if (props.show) {
        rules_html = (
            <div className={classes.Rules}>
                <h2>Rules of Carrom-Tac-Toe (Patent pending) are simple.</h2>
                <p>
                    It's a game played between two players.
                    Each player has three coins which are either white or black in color.
                    For the first three tries, the players will place these coins on a 3x3 board.
                </p>
                <p>
                    After the players have exhausted their coins, they can move 
                    the coins either horizontally or vertically, one position at a time.
                    A coin cannot be moved into a position that is occupied by other coin. 
                    You cannot jump or skip over another coin.
                </p>
                <p>
                    The objective of the game is similar to one we have in Tic-Tac-Toe.
                    Any player who is able to line up their discs vertically, horizontally or diagonally
                    wins.
                    Also, if you have no available moves left, you lose.
                </p>
                <p>
                    Happy Corrom-Tac-Toeing!
                </p>
                <button onClick={props.toggleRules} className={['Button'].join(' ')}>Close</button>

            </div>
        )
    }
    return rules_html;
}

export default Rules;