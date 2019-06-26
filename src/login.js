import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { ENV, ROUTE } from './env.js';
import { Home } from './home.js';


const auth = ( () => {
    let status = false;

    return {
        verify: (token) => {
            console.log("calling auth.verity");
            const options = {
                method: 'GET',
                url: ENV.VERIFY_LOGIN_URL,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${token}`
                }
            };
            //return promise that always executed
            return axios(options).then((res) => {
                if(res.data.status == "success") {
                    console.log('success verify!');
                } else {
                    console.log('fail to verify');
                }
                status = !!res.data.status; 
            });
        },

        isAuthorized: () => {
            return status;
        }
    };
})();



class Login extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={`${ROUTE.LOGIN}`} component={LoginInner} />
                    <Route exact path={`${ROUTE.HOME}`} component={Home} />
                </Switch>
            </Router>
        );
    }
}

class LoginInner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginMessage: 'Login',
            userId: '',
            userPassword: '',
            token: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const options = {
            method: 'POST',
            url: ENV.GET_TOKEN_URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                userId: this.state.userId,
                userPassword: this.state.userPassword
            }
        };
        axios(options).then((res) => {
            if(res.data.status == "success") {
                auth.verify(res.data.token).then(() => {
                    this.setState({
                        token: res.data.token
                    });
                });
            }else {
                this.setState({
                    loginMessage: res.data.message
                });
                console.log('fail to get token');
            }
        });
    }

    handleIdChange(e) {
        this.setState({
            userId: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            userPassword: e.target.value
        });
    }

    render() {
        if(auth.isAuthorized()) {
            return <Redirect from={`${ROUTE.LOGIN}`} to={`${ROUTE.HOME}`} />
        }

        return (
            <div>
                <div>
                    <p> {this.state.loginMessage} </p>
                </div>

                <form id="login-form" onSubmit={this.handleSubmit}>
                    <div>
                        <label> Enter the id: </label>
                        <input type="text" value={this.state.userId} onChange={this.handleIdChange} required />
                    </div>
                    <div>
                        <label> Enter the password: </label>
                        <input type="text" value={this.state.userPassword} onChange={this.handlePasswordChange} required />
                    </div>
                    <div>
                        <input type="submit" value="login" />
                    </div>
                </form>
            </div>
        );
    }
}

export { Login };
