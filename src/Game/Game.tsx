import * as React from 'react';
import * as _ from 'lodash';
import {Answer, BaseProps, Button, DoneFrame, Numbers, Stars} from '../App';

var possibleCombinationSum = function (arr: any, n: any): any {
    if (arr.indexOf(n) >= 0) {
        return true;
    }
    if (arr[0] > n) {
        return false;
    }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize);
    for (var i = 1; i < combinationsCount; i++) {
        var combinationSum = 0;
        for (var j = 0; j < listSize; j++) {
            if (i & (1 << j)) {
                combinationSum += arr[j];
            }
        }
        if (n === combinationSum) {
            return true;
        }
    }
    return false;
};

export class Game extends React.Component {
    state = Game.initialState();
    static randomNumber = () => 1 + Math.floor(Math.random() * 9);
    static initialState = () => ({
        selectedNumbers: [],
        randomNumberOfStars: Game.randomNumber(),
        usedNumbers: [],
        answerIsCorrect: null,
        redraws: 5,
        doneStatus: ''
    })
    resetGame = () => this.setState(Game.initialState);
    selectNumber = (clickedNumber: number) => {
        if (!_.includes(this.state.selectedNumbers, clickedNumber)) {
            this.setState((prevState: BaseProps) => ({
                answerIsCorrect: null,
                selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
            }));
        }
    }

    unselectNumber = (clickedNumber: number) => {
        this.setState(() => ({
            answerIsCorrect: null,
            selectedNumbers: _.pull(this.state.selectedNumbers, clickedNumber)
        }));
    }

    checkAnswer = () => {
        this.setState((prevState: BaseProps) => ({
            answerIsCorrect: prevState.randomNumberOfStars === _.sum(prevState.selectedNumbers)
        }));
    }
    acceptAnswer = () => {
        this.setState((prevState: BaseProps) => ({
            usedNumbers: _.concat(this.state.usedNumbers, prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            randomNumberOfStars: Game.randomNumber()
        }), this.updateDoneStatus);
    }
    redraw = () => {
        if (this.state.redraws === 0) {
            return;
        }
        this.setState({
            randomNumberOfStars: Game.randomNumber(),
            answerIsCorrect: null,
            selectedNumbers: [],
            redraws: this.state.redraws - 1
        }, this.updateDoneStatus);
    }
    possibleSolutions = () => {
        const possibleNumbers = _.filter(_.range(1, 10), (nr: number) => _.find(this.state.usedNumbers, nr));
        return possibleCombinationSum(possibleNumbers, this.state.randomNumberOfStars);
    }
    updateDoneStatus = () => {
        this.setState(
            () => {
                if (this.state.usedNumbers.length === 9) {
                    return {doneStatus: 'Done. Nice!'};
                } else if (this.state.redraws === 0 && !this.possibleSolutions()) {
                    return {doneStatus: 'Game Over!'};
                }
                return '';
            });
    }

    render() {
        const {
            selectedNumbers,
            randomNumberOfStars,
            answerIsCorrect,
            usedNumbers,
            redraws,
            doneStatus
        } = this.state;
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">
                    <Stars numberOfStars={randomNumberOfStars}/>
                    <Button
                        selectedNumbers={selectedNumbers}
                        redraws={redraws}
                        checkAnswer={this.checkAnswer}
                        answerIsCorrect={answerIsCorrect}
                        acceptAnswer={this.acceptAnswer}
                        redraw={this.redraw}
                    />
                    <Answer unselectNumber={this.unselectNumber} selectedNumbers={this.state.selectedNumbers}/>
                </div>
                <br/>
                {doneStatus ? <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame}/> :
                    <Numbers
                        selectedNumbers={selectedNumbers}
                        selectNumber={this.selectNumber}
                        usedNumbers={usedNumbers}
                    />}
            </div>
        );
    }
}