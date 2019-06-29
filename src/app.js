import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import { ROUTE } from './env.js';
import { Login } from './login.js';
import './style/main.css';

import { Make } from './make.js';
import { Solve } from './solve.js';
const test = {
    isTest: true,
    path: `${ROUTE.SOLVE}`, 
    component: Solve 
};

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={AppInner} />
                    <Route exact path={`${ROUTE.LOGIN}`} component={Login} />
                    <TestRoute />
                </Switch>
            </div>
        </Router>
    );
};

const AppInner = () => {
    if(test.isTest) {
        return <Redirect to={test.path} />
    }
    return (
        <div id="menu">
            <ul>
                <li>
                    <p> Home </p>
                </li>
                <li>
                    <Link to={`${ROUTE.LOGIN}`}> Login </Link>
                </li>
            </ul>
        </div>
    );
};


function TestRoute() {
    return (
        <Route
            path={test.path}
            component={test.component}
        />
    );
}

export default App;
