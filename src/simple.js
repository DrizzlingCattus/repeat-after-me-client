import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

import { ENV, ROUTE } from './env.js';

import './style/simple.css';


const localM = {};

localM.EMPTY = '';

localM.changedArray = (target, index, value) => {
    if(!Array.isArray(target)) {
        throw TypeError("target param type must be Array :: " + target);
    }
    // directly changing array value is forbidden in react
    // so need to make new array
    const front = target.slice(0, index);
    const back = target.slice(index + 1);
    const middle = value;

    return front.concat(middle).concat(back);
};

class Simple extends React.Component {
    constructor(props) {
        super(props);
        const curr = new Date();
        this.state = {
            date: `${curr.getFullYear()}-${curr.getMonth()+1}-${curr.getDate()}`,
            quiz: '',
            answer: '',
            hints: [],
            hintItems: [],
            hintItemCounter: 0,
            message: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleQuizChange = this.handleQuizChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);

        this.handleToWriteHintItem = this.handleToWriteHintItem.bind(this);
        this.handleToDeleteHintItem = this.handleToDeleteHintItem.bind(this);
        this.handleToAddHintItem = this.handleToAddHintItem.bind(this);
    }
    
    initState(v) {
        const curr = new Date();
        const initedObj = {
            date: `${curr.getFullYear()}-${curr.getMonth()+1}-${curr.getDate()}`,
            quiz: '',
            answer: '',
            hints: [],
            hintItems: [],
            hintItemCounter: 0,
            message: ''
        };
        this.setState({...initedObj, ...v});
    }


    handleSubmit(e) {
        e.preventDefault();

        const hints = this.state.hints.filter((v) => v.trim() != localM.EMPTY);
        const trimmedHint = hints.map((v) => v.trim());

        const options = {
            method: 'POST',
            url: ENV.MAKE_SIMPLE_QUIZ_URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                date: this.state.date,
                quiz: this.state.quiz,
                answer: this.state.answer,
                hints: trimmedHint 
            }
        };
        axios(options).then((res) => {
            if(res.data.status == "success") {
                console.log("success to save simple quiz");
                // refresh simple child view
                this.initState({ 
                    message: "Save complete!"
                });
            }else {
                console.log("fail to save simple quiz");
                this.initState({ 
                    message: "Fail to save ..." 
                });
            }
        });
    }

    handleDateChange(e) {
        this.setState({
            date: e.target.value
        });
    }

    handleQuizChange(e) {
        this.setState({
            quiz: e.target.value
        });
    }

    handleAnswerChange(e) {
        this.setState({
            answer: e.target.value
        });
    }

    handleToWriteHintItem(index, e) {
        // event object will reused by react.
        // so it initiate by null for next handler
        // if you want to access event object aync way,
        // you need to call event.persist()
        e.persist();
        // setState call callback function - async 
        this.setState((state) => {
            const hints = localM.changedArray(state.hints, index, e.target.value);
            return {
                hints
            };
        });  
    }

    handleToDeleteHintItem(index, e) {
        this.setState((state) => {
            const hints = localM.changedArray(state.hints, index, localM.EMPTY);
            const hintItems = localM.changedArray(state.hintItems, index, localM.EMPTY);
            return {
                hints,
                hintItems
            }
        });
    }

    handleToAddHintItem(e) {
        e.persist();
        const keyPrefix = 'hint-';
        this.setState((state) => {
            const index = state.hintItemCounter;
            // directly changing array is forbidden in react
            const list = state.hintItems.concat(
                <HintItem 
                    key={keyPrefix + index}
                    index={index}
                    value={this.state.hints[index]}
                    writeHandler={(e) => this.handleToWriteHintItem(index, e)}
                    deleteHandler={(e) => this.handleToDeleteHintItem(index, e)}
                />
            );
            return {
                hintItems: list,
                hintItemCounter: index + 1
            };
        });
    }

    render() {
        return (
            <Router>
                <div className="container-full-width simple-container">
                    <div>
                        <p> {this.state.message} </p>
                    </div>
                    <form id="simple-form" onSubmit={this.handleSubmit}>
                        <table className="container-full-width">
                            <tbody>
                                <DateView value={this.state.date} handler={this.handleDateChange} />
                                <Quiz value={this.state.quiz} handler={this.handleQuizChange} />
                                <Answer value={this.state.answer} handler={this.handleAnswerChange} />
                                <Hint hintItems={this.state.hintItems} addHandler={this.handleToAddHintItem} />
                            </tbody>
                        </table>
                        <div>
                            <input type="submit" value="save" />
                        </div>
                    </form>
                </div>
            </Router>
        );
    }
}

function DateView(props) {
    return (
        <tr className="form-item-container">
            <td className="form-item-input-title">
                <label> Date </label>
            </td>
            <td className="form-item-input">
                <input type="date" value={props.value} onChange={props.handler} required />
            </td>
        </tr>
    );
}

function Quiz(props) {
    return (
        <tr className="form-item-container">
            <td className="form-item-input-title">
                <label> Quiz </label>
            </td>
            <td className="form-item-input">
                <textarea 
                    rows="5"
                    cols="130"
                    onChange={props.handler}
                    value={props.value}
                    required />
            </td>
        </tr>
    );
}

function Answer(props) {
    return (
        <tr className="form-item-container">
            <td className="form-item-input-title">
                <label> Answer </label>
            </td>
            <td className="form-item-input">
                <textarea
                    rows="5"
                    cols="130"
                    onChange={props.handler}
                    value={props.value}
                    required />
            </td>
        </tr>
    );
}

function Hint(props) {
    return (
        <tr className="form-item-container">
            <td className="form-item-input-title">
                <label> Hint </label>
            </td>
            <td className="form-item-input">
                {props.hintItems}
                <input type="button" value="+" onClick={props.addHandler} />
            </td>
        </tr>
    );
}

function HintItem(props) {
    return (
        <div className="hint-item-container">
            <input 
                className="hint-item-write-box" 
                type="text" 
                maxLength="20"
                value={props.value} 
                onChange={props.writeHandler} required />
            <input type="button" value="x" onClick={props.deleteHandler} />
        </div>
    );
}

const routedSimple = withRouter(Simple); 
export { routedSimple as Simple };
