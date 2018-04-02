import * as React from 'react';
import * as _ from 'lodash';
import './App.css';
import {Game} from './Game/Game';
import Constants from './constants/Constants';

export interface BaseProps {
    selectedNumbers: number[];
    randomNumberOfStars?: number;
    usedNumbers?: number[];
}

interface StarProps {
    numberOfStars: number;
}

interface ButtonProps extends BaseProps {
    checkAnswer: () => void;
    answerIsCorrect: boolean | null;
    acceptAnswer: () => void;
    redraw: () => void;
    redraws: number;
}

interface DoneFrameProps {
    doneStatus: string;
    resetGame: () => void;
}

interface AnswerProps extends BaseProps {
    unselectNumber: (nr: number) => void;
}

interface NumbersProps extends BaseProps {
    selectNumber: (nr: number) => void;
}

export const Stars = (props: StarProps) => {
    // const numberOfStars = 1 + Math.floor(Math.random() * 9);
    return (
        <div className="col-5">
            {_.range(props.numberOfStars).map(i => <i key={i} className="fa fa-star"/>)}
        </div>
    );
};

export const Button = (props: ButtonProps) => {
    let button;
    switch (props.answerIsCorrect) {
        case true:
            button =
                (
                    <button className="btn btn-success" onClick={props.acceptAnswer}>
                        <i className="fa fa-check"/>
                    </button>);
            break;
        case false:
            button = (
                <button className="btn btn-danger">
                    <i className="fa fa-times"/>
                </button>);
            break;
        default:
            button = (
                <button
                    className="btn"
                    onClick={props.checkAnswer}
                    disabled={props.selectedNumbers.length === 0}
                >
                    =
                </button>);
            break;
    }
    return (
        <div className="col-2 text-center">
            {button}
            <br/><br/>
            <button
                className="btn btn-warning btn-sm"
                onClick={props.redraw}
                disabled={props.redraws === 0}
            >
                <i className="fa fa-refresh"/> {props.redraws}
            </button>
        </div>
    );
};

export const Answer = (props: AnswerProps) => {
    return (
        <div className="col-5">
            {props.selectedNumbers.map((nr, i) =>
                <span key={i} onClick={() => props.unselectNumber(nr)}>{nr}</span>
            )}
        </div>
    );
};
export const Numbers = (props: NumbersProps): any => {
    const numberClassName = (nr: number) => {
        if (props.usedNumbers && (props.usedNumbers).indexOf(nr) >= 0) {
            return 'used';
        }
        if (props.selectedNumbers.indexOf(nr) >= 0) {
            return 'selected';
        } else {
            return 'not-selected';
        }
    };
    return (
        <div className="card text-center">
            <div>
                {_.map(Constants.DEFAULT.LIST, (nr, i) =>
                    <span key={i} className={numberClassName(nr)} onClick={() => props.selectNumber(nr)}>{nr}</span>
                )}
            </div>
        </div>
    );
};

export const DoneFrame = (props: DoneFrameProps) => {
    return (
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
            <button className="btn btn-secondary" onClick={props.resetGame}>Play Again</button>
        </div>
    );
};

class App extends React.Component {
    render() {
        return (
            <div>
                <Game/>
            </div>
        );
    }
}

export default App;
