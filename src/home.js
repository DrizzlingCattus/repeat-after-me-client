import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import { Solve } from './solve.js';
import { Make } from './make.js';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/repeat-after-me/home" component={HomeInner} />
                        <Route exact path="/repeat-after-me/solve" component={Solve} />
                        <Route exact path="/repeat-after-me/make" component={Make} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

class HomeInner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/repeat-after-me/solve"> Solve </Link>
                    </li>
                    <li>
                        <Link to="/repeat-after-me/make"> Make </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export { Home };
