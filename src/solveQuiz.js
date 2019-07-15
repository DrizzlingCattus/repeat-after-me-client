import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import { ROUTE } from './env.js';
import { Solve } from './solve.js';

import "./style/solveQuiz.css";


class SolveQuiz extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path={`${ROUTE.SOLVE}`} component={Solve} />
                    <Route
                        exact path={`${ROUTE.SOLVE_QUIZ}`}
                        render={
                            (props) => {
                                return <SolveQuizInner quizs={props.location.state.searchResult} />
                            }
                        }
                    />
                </Switch>
            </Router>
        );
    }
}

class SolveQuizInner extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            lastIndex: this.props.quizs.length - 1,
            // -1 is first quiz
            currQuiz: this.getNextQuiz(-1),
            isShowHints: false,
            isShowAnswer: false,
            isSolveEnd: false
        };
        this.handleHints = this.handleHints.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    getNextQuiz(currIndex) {
        const nextIndex = currIndex + 1;
        const next = currIndex < 0 ? this.props.quizs[0] : this.props.quizs[nextIndex];
        return {
            index: nextIndex,
            date: next.date,
            description: next.quiz,
            answer: next.answer,
            hints: next.hints.slice()
        };
    }

    handleHints() {
        this.setState({
            isShowHints: true
        });
    }

    handleAnswer() {
        this.setState({
            isShowAnswer: true
        });
    }

    handleNext() {
        if(this.state.currQuiz.index >= this.state.lastIndex) {
            this.setState({
                isSolveEnd: true
            });
        } else {
            this.setState((prev) => {
                return {
                    currQuiz: this.getNextQuiz(prev.currQuiz.index),
                    isShowAnswer: false,
                    isShowHints: false
                };
            });
        }
    }

    render() {
        if(this.state.isSolveEnd) {
            return <EndSolveQuiz />
        }
        return (
            <div className="container-full-width">
                <table>
                    <tbody>
                        <QuizDescription description={this.state.currQuiz.description} />
                        <QuizHints hints={this.state.currQuiz.hints} isVisable={this.state.isShowHints} />
                        <QuizAnswer answer={this.state.currQuiz.answer} isVisable={this.state.isShowAnswer} />
                    </tbody>
                </table>

                <ShowHints showHintHandler={this.handleHints} isClicked={this.state.isShowHints} />
                <ShowAnswer showAnswerHandler={this.handleAnswer} isClicked={this.state.isShowAnswer} />
                <NextQuiz nextQuizHandler={this.handleNext} />
            </div>
        );
    }
}

class EndSolveQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEndClick: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            isEndClick: true
        });
    }

    render() {
        if(this.state.isEndClick) {
            return (
                <Redirect from={`${ROUTE.SOLVE_QUIZ}`} to={`${ROUTE.SOLVE}`} />
            );
        }
        return (
            <div>
                <p> End solving quiz! </p>
                <button type="button" onClick={this.handleClick}>
                    end
                </button>
            </div>
        );
    }
}

class QuizDescription extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td className="solving-item-title"> Quiz </td>
                <td className="solving-item-content">
                    <textarea
                        row="5"
                        cols="130"
                        value={this.props.description}
                        readOnly={true} />
                </td>
            </tr>
        );
    }
}

class QuizHints extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.isVisable) {
            return (
                <tr>
                    <td className="solving-item-title"> Hints </td>
                    <td> ... </td>
                </tr>
            );
        }
        const hintString = this.props.hints.length === 0 ? 'no hint' : this.props.hints.reduce((result, curr) => {
            return `${result}, ${curr}`;
        });
        return (
            <tr>
                <td className="solving-item-title"> Hints </td>
                <td> {hintString} </td>
            </tr>
        );
    }
}

class QuizAnswer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.isVisable) {
            return (
                <tr>
                    <td className="solving-item-title"> Answer </td>
                    <td> ... </td>
                </tr>
            );
        }
        return (
            <tr>
                <td className="solving-item-title"> Answer </td>
                <td className="solving-item-content">
                    <textarea
                        rows="5"
                        cols="130"
                        value={this.props.answer}
                        readOnly={true} />
                </td>
            </tr>
        );
    }
}

class ShowHints extends React.Component {
    constructor(props) {
        super(props);
        this.handleJKeyDown = this.handleJKeyDown.bind(this);
    }

    handleJKeyDown(e) {
        e.preventDefault();
        e.stopPropagation();
        const JKeycode = 74;
        if(JKeycode === e.keyCode) {
            this.props.showHintHandler();
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleJKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleJKeyDown);
    }

    render() {
        return (
            <div className="solving-item-button-container">
                <button
                    type="button"
                    autoComplete="off"
                    disabled={this.props.isClicked}
                    onClick={this.props.showHintHandler}>
                    Show hints
                </button>
            </div>
        );
    }
}

class ShowAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.handleKKeyDown = this.handleKKeyDown.bind(this);
    }

    handleKKeyDown(e) {
        e.preventDefault();
        e.stopPropagation();
        const KKeycode = 75;
        if(KKeycode === e.keyCode) {
            this.props.showAnswerHandler();
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKKeyDown);
    }

    render() {
        return (
            <div className="solving-item-button-container">
                <button
                    type="button"
                    autoComplete="off"
                    disabled={this.props.isClicked}
                    onClick={this.props.showAnswerHandler}>
                    Show answer
                </button>
            </div>
        );
    }
}

class NextQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.handleLKeyDown = this.handleLKeyDown.bind(this);
    }

    handleLKeyDown(e) {
        e.preventDefault();
        e.stopPropagation();
        const LKeycode = 76;
        if(LKeycode === e.keyCode) {
            this.props.nextQuizHandler();
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleLKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleLKeyDown);
    }

    render() {
        return (
            <div className="solving-item-button-container">
                <button
                    type="button"
                    onClick={this.props.nextQuizHandler}>
                    Next
                </button>
            </div>
        );
    }
}

export { SolveQuiz };
