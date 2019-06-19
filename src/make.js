import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import { ROUTE } from './env.js';
import { Simple } from './simple.js';
import { Complex } from './complex.js';
import { Home } from './home.js';


class Make extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/repeat-after-me/make" component={MakeInner} />
                    <Route exact path="/repeat-after-me/home" component={Home} />
                </Switch>
            </Router>
        );
    }
}

class MakeInner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            isClicked: true
        });
    }

    render() {
        if(this.state.isClicked) {
            return (
                <Redirect from="/repeat-after-me/make" to="/repeat-after-me/home" />
            );
        }

        return (
            <Router>
                <div>
                    <div id="make-menu">
                        <ul>
                            <li>
                                <Link to="/repeat-after-me/home" onClick={this.handleClick} > Home </Link>
                            </li>
                            <li>
                                <Link to={ROUTE.MAKE.SIMPLE}> Simple </Link>
                            </li>
                            <li>
                                <Link to={ROUTE.MAKE.COMPLEX}> Complex </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <Switch>
                            <Route exact path={ROUTE.MAKE.SIMPLE} component={Simple} />
                            <Route exact path={ROUTE.MAKE.COMPLEX} component={Complex} />
                            <Route component={MakeDefault} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

function MakeDefault(props) {
    return (
        <div>
            <p> Make Home </p>
            <p> TODO:: insert funny things! </p>
        </div>
    );
}

export { Make };
