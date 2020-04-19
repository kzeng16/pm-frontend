import React, { useState, Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; 
import Navbar from './Navbar/Navbar';
import Sidebar from './NavbarToggleButton/Sidebar';
import Overlay from './Overlay/Overlay';

class Dashboard extends Component {

        // constructor(props){
        //     super(props);
        // }
    state = {
        sideBarOpen: false,
        msg: ""
    };

    navbarToggleHandler = () => {
        this.setState((prevState) => {
            return {
                sideBarOpen: !prevState.sideBarOpen,
                msg: "activated"
            };
        });
    };

    overlayClickHandler = () => {
        this.setState((prevState) => {
            return {
                sideBarOpen: false,
                msg: "deactivated"
            };
        });
    };

    render(){
        let overlay;

        if (this.state.sideBarOpen){
            overlay = <Overlay click={this.overlayClickHandler}/>;
        }

        return(
            <div style={{height: '100vh'}}>
            <Navbar navbarToggleHandler={this.navbarToggleHandler} />
            <Sidebar show={this.state.sideBarOpen}/>
            {overlay}
            <h1>Dashboard</h1>
            </div>

        );
    }
}

export default Dashboard;