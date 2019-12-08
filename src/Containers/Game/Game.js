import React, { Component } from 'react';
import Box from '../../Components/Box/Box';
import classes from './Game.module.css';
import GameInfo from '../../Components/GameInfo/GameInfo';
import Error from '../../Components/Error/Error';
import WinnerInfo from '../../Components/WinnerInfo/WinnerInfo';
import Welcome from '../../Components/Welcome/Welcome';
import Rules from '../../Components/Rules/Rules';

export default class Game extends Component {
    state = {
        boxes: [
            { boxIndex: 0, coords: '0-0', checked: false, player: 0 },
            { boxIndex: 1, coords: '0-1', checked: false, player: 0 },
            { boxIndex: 2, coords: '0-2', checked: false, player: 0 },
            { boxIndex: 3, coords: '1-0', checked: false, player: 0 },
            { boxIndex: 4, coords: '1-1', checked: false, player: 0 },
            { boxIndex: 5, coords: '1-2', checked: false, player: 0 },
            { boxIndex: 6, coords: '2-0', checked: false, player: 0 },
            { boxIndex: 7, coords: '2-1', checked: false, player: 0 },
            { boxIndex: 8, coords: '2-2', checked: false, player: 0 },
        ],
        availableMoves: [],
        currentPlayer: 1,
        boxSelectedCoords: '',
        remainingDiscs: { player1: 3, player2: 3 },
        showError: false,
        errorMessage: '',
        winner: 0,
        isGameOver: false,
        showRules: false
    }

    onCheckBox = boxCoords => {
        if (this.state.isGameOver) {
            return;
        }
        this.clearErrors();
        const selectedBox = this.state.boxes.find(box => box.coords === boxCoords);
        const boxAlreadyChecked = selectedBox.checked;
        const boxBelongingToCurrentPlayer = selectedBox.player === this.state.currentPlayer;

        const playerHasDiscsAvailable = this.state.remainingDiscs['player' + this.state.currentPlayer] > 0;

        if (!boxAlreadyChecked && playerHasDiscsAvailable) {
            this.placeDisc(selectedBox.coords);
            return;
        }

        if (boxAlreadyChecked && playerHasDiscsAvailable) {
            this.handleIncorrectSelection('Cannot place disc on an already occupied box.')
            return;
        }

        if (boxAlreadyChecked && boxBelongingToCurrentPlayer) {
            this.showAvailableMoves(selectedBox.coords);
            return;
        }

        if (boxAlreadyChecked && !boxBelongingToCurrentPlayer) {
            this.handleIncorrectSelection('You cannot move opposition player\'s disc');
            return;
        }

        const movesAvailable = !!this.state.boxSelectedCoords;

        if (movesAvailable) {
            this.makeMove(this.state.boxSelectedCoords, selectedBox.coords);
            return;
        }

        if (!this.state.boxSelectedCoords && !playerHasDiscsAvailable) {
            this.handleIncorrectSelection('Select a disc to move first');
            return;
        }
    }

    placeDisc = boxCoords => {
        let updatedBoxes = [...this.state.boxes];
        let updatedBox = { ...this.state.boxes.find(box => box.coords === boxCoords) };
        let updatedRemainingDiscs = { ...this.state.remainingDiscs };
        updatedBox.checked = true;
        updatedBox.player = this.state.currentPlayer;
        updatedRemainingDiscs['player' + this.state.currentPlayer] -= 1;
        updatedBoxes = updatedBoxes.filter(b => b.coords !== boxCoords).concat(updatedBox).sort((a, b) => a.boxIndex - b.boxIndex);
        this.setState(prevState => {
            return {
                boxes: updatedBoxes,
                remainingDiscs: updatedRemainingDiscs
            }
        }, this.checkWinner);
        this.switchPlayer();
    }

    switchPlayer = () => {
        this.setState(prevState => {
            return {
                currentPlayer: prevState.currentPlayer === 1 ? 2 : 1,
                availableMoves: [],
                boxSelectedCoords: ''
            }
        })
    }

    showAvailableMoves = boxCoords => {

        this.setState({
            availableMoves: [],
            boxSelectedCoords: boxCoords
        })
        let availableCoords = [];
        const x = +boxCoords.split('-')[0];
        const y = +boxCoords.split('-')[1];

        const moveLeft = x.toString() + '-' + (y - 1);
        if (!this.isOccupied(moveLeft) && y - 1 >= 0) {
            availableCoords.push(moveLeft);
        }
        const moveRight = x.toString() + '-' + (y + 1);
        if (!this.isOccupied(moveRight) && y + 1 < 3) {
            availableCoords.push(moveRight);
        }
        const moveUp = (x - 1).toString() + '-' + (y);
        if (!this.isOccupied(moveUp) && x - 1 >= 0) {
            availableCoords.push(moveUp);
        }
        const moveDown = (x + 1).toString() + '-' + y;
        if (!this.isOccupied(moveDown) && x + 1 < 3) {
            availableCoords.push(moveDown);
        }

        this.setState({
            availableMoves: availableCoords
        })
    }

    isOccupied = coords => {
        if (this.state.boxes.find(box => box.coords === coords && box.checked)) {
            return true;
        } else {
            return false;
        }

    }

    handleIncorrectSelection = message => {
        this.setState({
            showError: true,
            errorMessage: message
        })
    }

    clearErrors = () => {
        this.setState({
            showError: false,
            errorMessage: ''
        })
    }

    makeMove = (fromCoords, toCoords) => {
        console.log('sliding from ' + fromCoords + ' to ' + toCoords);
        const isMoveAvailable = this.state.availableMoves.some(m => m === toCoords);
        if (!isMoveAvailable) {
            this.handleIncorrectSelection('You can only move one space at a time horizontally or vertically.');
            return;
        }
        const fromIndex = this.state.boxes.findIndex(box => box.coords === fromCoords);
        const toIndex = this.state.boxes.findIndex(box => box.coords === toCoords);
        let updatedBoxes = [...this.state.boxes];
        let updatedFromBox = { ...updatedBoxes.find(box => box.boxIndex === fromIndex) };
        updatedFromBox.checked = false;
        updatedFromBox.player = 0;
        let updatedToBox = { ...updatedBoxes.find(box => box.boxIndex === toIndex) };
        updatedToBox.checked = true;
        updatedToBox.player = this.state.currentPlayer;
        updatedBoxes = updatedBoxes
            .filter(box => box.boxIndex !== fromIndex && box.boxIndex !== toIndex)
            .concat(updatedFromBox, updatedToBox)
            .sort((a, b) => a.boxIndex - b.boxIndex);
        this.setState({
            boxes: updatedBoxes
        }, this.checkWinner);
        this.switchPlayer();
    }

    checkWinner = () => {
        const player1Boxes = this.state.boxes.filter(box => box.player === 1).map(box => box.coords);
        const isPlayer1Winner = this.hasWinningPattern(player1Boxes);
        if (isPlayer1Winner) {
            this.declareWinner(1);
            return;
        }

        const player2Boxes = this.state.boxes.filter(box => box.player === 2).map(box => box.coords);
        const isPlayer2Winner = this.hasWinningPattern(player2Boxes);
        if (isPlayer2Winner) {
            this.declareWinner(2);
            return;
        }
    }

    hasWinningPattern = coords => {
        if (coords.length < 3) {
            return false;
        }

        const distributedCoords = coords.map(coord => ({ x: coord.split('-')[0], y: coord.split('-')[1] }));
        const isStraightMatch = distributedCoords.every(dc => dc.x === distributedCoords[0].x) || distributedCoords.every(dc => dc.y === distributedCoords[0].y);
        if (isStraightMatch) {
            return true;
        }

        const isDiagonalMatch = distributedCoords.every(dc => dc.x === dc.y) || distributedCoords.every(dc => +dc.x + +dc.y === 2);
        if (isDiagonalMatch) {
            return true;
        }



        return false;
    }

    declareWinner = winner => {
        this.setState({
            winner: winner,
            isGameOver: true
        })
    }

    onNewGame = () => {
        this.setState({
            boxes: [
                { boxIndex: 0, coords: '0-0', checked: false, player: 0 },
                { boxIndex: 1, coords: '0-1', checked: false, player: 0 },
                { boxIndex: 2, coords: '0-2', checked: false, player: 0 },
                { boxIndex: 3, coords: '1-0', checked: false, player: 0 },
                { boxIndex: 4, coords: '1-1', checked: false, player: 0 },
                { boxIndex: 5, coords: '1-2', checked: false, player: 0 },
                { boxIndex: 6, coords: '2-0', checked: false, player: 0 },
                { boxIndex: 7, coords: '2-1', checked: false, player: 0 },
                { boxIndex: 8, coords: '2-2', checked: false, player: 0 },
            ],
            availableMoves: [],
            currentPlayer: 1,
            boxSelectedCoords: '',
            remainingDiscs: { player1: 3, player2: 3 },
            showError: false,
            errorMessage: '',
            winner: 0,
            isGameOver: false
        })
    }

    onToggleRules = () => {
        this.setState(prevState => ({
            showRules: !prevState.showRules
        }))
    }

    

    render() {
        const boxes = this.state.boxes.map(box => {
            const boxAvailable = this.state.availableMoves.some(availableCoord => availableCoord === box.coords);
            const boxSelected = this.state.boxSelectedCoords === box.coords;
            return (
                <Box {...box}
                    key={box.coords}
                    clicked={this.onCheckBox.bind(this, box.coords)}
                    isAvailableMove={boxAvailable}
                    isSelected={boxSelected}></Box>
            )
        });

        return (
            <div className={classes.Game}>
                <div className={classes.GameArea}>
                    <Welcome newGame={this.onNewGame} toggleRules={this.onToggleRules} />
                    <GameInfo currentPlayer={this.state.currentPlayer} />

                    <div className={classes.Board}>
                        {boxes}
                    </div>
                    <Error showError={this.state.showError} errorMessage={this.state.errorMessage} />
                    <WinnerInfo
                        gameover={this.state.isGameOver}
                        newGame={this.onNewGame}
                        winner={this.state.winner} />
                    <Rules show={this.state.showRules} toggleRules={this.onToggleRules}  />
                </div>
            </div>
        )
    }
}
