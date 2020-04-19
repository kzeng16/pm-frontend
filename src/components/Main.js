import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import Navbar from './Navbar/Navbar';
import { Component } from 'react';

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
                      <Route exact path='#' component={Navbar}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Main;