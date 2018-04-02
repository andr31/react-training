import * as React from 'react';
import * as _ from 'lodash';
import {Answer, BaseProps, Button, Numbers, Stars} from '../App';

export class Game extends React.Component {
    state = {
        selectedNumbers: [],
        randomNumberOfStars: 1 + Math.floor(Math.random() * 9)
    };
    selectNumber = (clickedNumber: number) => {
        if (!_.includes(this.state.selectedNumbers, clickedNumber)) {
            this.setState((prevState: BaseProps) => ({
                selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
            }));
        }
    }

    unselectNumber = (clickedNumber: number) => {
        this.setState(() => ({
            selectedNumbers: _.pull(this.state.selectedNumbers, clickedNumber)
        }));
    }

    render() {
        const {selectedNumbers, randomNumberOfStars} = this.state;
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">
                    <Stars numberOfStars={randomNumberOfStars}/>
                    <Button selectedNumbers={selectedNumbers}/>
                    <Answer unselectNumber={this.unselectNumber} selectedNumbers={this.state.selectedNumbers}/>
                </div>
                <br/>
                <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber}/>
            </div>
        );
    }
}