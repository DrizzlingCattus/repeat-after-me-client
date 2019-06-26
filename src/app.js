import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { ROUTE } from './env.js';
import { Login } from './login.js';
import './style/main.css';


const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={AppInner} />
                    <Route exact path={`${ROUTE.LOGIN}`} component={Login} />
                </Switch>
            </div>
        </Router>
    );
};

const AppInner = () => {
    return (
        <div id="menu">
            <ul>
                <li>
                    <p> Home </p>
                </li>
                <li>
                    <Link to="/repeat-after-me/login"> Login </Link>
                </li>
            </ul>
        </div>
    );
};

export default App;
