import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import { ENV, ROUTE } from './env.js';


class Complex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <p> hello complex! </p>
                </div>
            </Router>
        );
    }
}

export { Complex };
