import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';


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
