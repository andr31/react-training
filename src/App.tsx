import * as React from 'react';
import * as _ from 'lodash';
import './App.css';
import {Game} from './Game/Game';
import Constants from './constants/Constants';

export interface BaseProps {
    selectedNumbers: number[];
}

interface StarProps {
    numberOfStars: number;
}

interface ButtonProps extends BaseProps{

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
    return (
        <div className="col-2">
            <button className="btn" disabled={props.selectedNumbers.length === 0}>=</button>
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
