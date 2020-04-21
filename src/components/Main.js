import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import Navbar from './Navbar/Navbar';
import ViolationsPage from './ViolationsPage/ViolationPage'
import Register from './Register'
import { Component } from 'react';
import ResetPassword from './ResetPassword';

class Main extends Component {
    constructor(){
        super();

        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
        }
    }

    render(){
        return(
            <div>
                <Router>
                    <Switch>
                      <Route exact path='/' component={Login}/>
                      <Route exact path='/Dashboard' component={Dashboard}/>
                      <Route exact path='/Violations' component={ViolationsPage}/>
                      <Route exact path='/Register' component={Register}/>
                      <Route exact path='/ResetPassword' component={ResetPassword}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Main;