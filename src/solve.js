import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import { ENV, ROUTE } from './env.js';
import { Home } from './home.js';
import { SolveQuiz } from './solveQuiz.js';

import './style/solve.css';


const QUIZ_TYPE = {
    SIMPLE: "simple",
    COMPLEX: "complex",
    ALL: "all"
};

class Solve extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={`${ROUTE.HOME}`} component={Home} />
                    <Route exact path={`${ROUTE.SOLVE}`} component={SolveInner} />
                    <Route exact path={`${ROUTE.SOLVE_QUIZ}`} component={SolveQuiz} />
                </Switch>
            </Router>
        );
    }
}

class SolveInner extends React.Component {
    constructor(props) {
        super(props);
        const curr = new Date();
        const today = `${curr.getFullYear()}-${curr.getMonth()+1}-${curr.getDate()}`;
        this.state = {
            quizType: '',
            startDate: today,
            endDate: today,
            isSubmitted: false,
            searchResult: [],
            isGotoHome: false
        };

        this.handleFilterQuizType = this.handleFilterQuizType.bind(this);
        this.handleFilterDate = this.handleFilterDate.bind(this);
        this.handleFilterKeyword = this.handleFilterKeyword.bind(this);
        this.handleFilterSubmit = this.handleFilterSubmit.bind(this);

        this.gotoHome = this.gotoHome.bind(this);
    }

    requestSimpleQuiz() {
        let startDate = this.state.startDate;
        let endDate = this.state.endDate;
        const options = {
            method: 'GET',
            url: `${ENV.SIMPLE.QUIZS.DATE}/${startDate}/${endDate}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //TODO: add date for keyword searching
        };
        axios(options).then((res) => {
            if(res.status == 200) {
                const quizs = res.data.slice();
                if(quizs.length === 0) {
                    alert("search result empty");
                } else {
                    this.setState({
                        isSubmitted: true,
                        searchResult: quizs
                    });
                }
            }
        });
    }

    requestComplexQuiz() {
        console.log("TODO: complex quiz request");
    }

    requestAllQuiz() {
        console.log("TODO: all quiz request");
    }

    handleFilterQuizType(e) {
        const type = e.target.value;
        console.log("filter quiz type : " + type);
        this.setState({
            quizType: type
        });
    }

    handleFilterDate(e) {
        const next = {};
        if(e.target.id == 'start-date') {
            next.startDate = e.target.value;
        } else if(e.target.id == 'end-date') {
            next.endDate = e.target.value;
        } else {
            throw Error('date type is not either start or end');
        }
        this.setState(next);
    }

    handleFilterKeyword(e) {

    }

    handleFilterSubmit(e) {
        e.preventDefault();
        let type = this.state.quizType;
        if(type == QUIZ_TYPE.SIMPLE) {
            this.requestSimpleQuiz();
        } else if(type == QUIZ_TYPE.COMPLEX) {
            this.requestComplexQuiz();
        } else if(type == QUIZ_TYPE.ALL) {
            this.requestAllQuiz();
        } else {
            alert("Need to select quiz type. (simple, complex, all)");
        }
    }

    gotoHome() {
        this.setState({
            isGotoHome: true
        });
    }

    render() {
        if(this.state.isGotoHome) {
            return (
                <Redirect
                    from={`${ROUTE.SOLVE}`}
                    to={`${ROUTE.HOME}`}
                />
            );
        }
        if(this.state.isSubmitted) {
            return (
                <Redirect
                    from={`${ROUTE.SOLVE}`}
                    to={{
                        pathname: `${ROUTE.SOLVE_QUIZ}`,
                        state: {
                            searchResult: this.state.searchResult.slice()
                        }
                    }}
                />
            );
        }

        return(
            <div className="container-full-width">
                <div>
                    <Link to={`${ROUTE.HOME}`} onClick={this.gotoHome} > Home </Link>
                </div>
                <SolveStatus />
                <QuizFilter
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    quizTypeHandler={this.handleFilterQuizType}
                    dateHandler={this.handleFilterDate}
                    keywordHandler={this.handleFilterKeyword}
                    submitHandler={this.handleFilterSubmit}
                />
            </div>
        );
    }
}

class SolveStatus extends React.Component {
    render() {
        return (
            <div>
                <p> solve status is calling! </p>
            </div>
        );
    }
}

class QuizFilter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <form id="quiz-filter-form" onSubmit={this.props.submitHandler}>
                    <div>
                        <input type="radio" name="quiz" value="simple" onChange={this.props.quizTypeHandler} /> Simple
                        <input type="radio" name="quiz" value="complex" onChange={this.props.quizTypeHandler} /> Complex
                        <input type="radio" name="quiz" value="all" onChange={this.props.quizTypeHandler} /> All
                    </div>
                    <div>
                        <label> Start Date </label>
                        <input id="start-date" type="date" value={this.props.startDate} onChange={this.props.dateHandler} required />
                    </div>
                    <div>
                        <label> End Date </label>
                        <input id="end-date" type="date" value={this.props.endDate} onChange={this.props.dateHandler} required />
                    </div>
                    <div>
                        <label> TODO: input Keywords </label>
                    </div>
                    <div>
                        <input type="submit" value="search" />
                    </div>
                </form>
            </div>
        );
    }
}

export { Solve };
