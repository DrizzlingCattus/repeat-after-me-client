import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';


class Solve extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <p> hello Solve! </p>
                </div>
            </Router>
        );
    }
}

export { Solve };
