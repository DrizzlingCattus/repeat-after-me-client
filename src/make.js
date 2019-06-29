import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import { ROUTE } from './env.js';
import { Simple } from './simple.js';
import { Complex } from './complex.js';
import { Home } from './home.js';

import './style/make.css';


class Make extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={`${ROUTE.MAKE}`} component={MakeInner} />
                    <Route exact path={`${ROUTE.HOME}`} component={Home} />
                </Switch>
            </Router>
        );
    }
}

class MakeInner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGotoHome: false
        };
        this.goToHome = this.goToHome.bind(this);
    }

    goToHome() {
        this.setState({
            isGotoHome: true
        });
    }

    render() {
        if(this.state.isGotoHome) {
            return (
                <Redirect from={`${ROUTE.MAKE}`} to={`${ROUTE.HOME}`} />
            );
        }

        return (
            <Router>
                <div>
                    <div id="make-menu">
                        <div className="tab-menu">
                            <div className="tab-menu-item">
                                <Link to={`${ROUTE.HOME}`} onClick={this.goToHome} > Home </Link>
                            </div>
                            <MenuItem 
                                to={`${ROUTE.MAKE.SIMPLE}`}
                                name="Simple"
                            />
                            <MenuItem 
                                to={`${ROUTE.MAKE.COMPLEX}`} 
                                name="Complex"
                            />
                        </div>
                    </div>
                    <div>
                        <Switch>
                            <Route exact path={`${ROUTE.MAKE.SIMPLE}`} component={Simple} />
                            <Route exact path={`${ROUTE.MAKE.COMPLEX}`} component={Complex} />
                            <Route component={MakeDefault} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

function MenuItem(props) {
    return (
        <div className="tab-menu-item">
            <Link 
                to={props.to}>
                {props.name}
            </Link>
        </div>
    );
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
