import React, { useState, Component } from 'react';
import './NavbarToggleButton.css';
import { IoIosList } from 'react-icons/io'

const NavbarToggleButton = props => (

    // <button className="btn btn-info toggle-button" onClick={props.click}>
    <ul className="navbar-nav mr-auto">
        <li className="nav-item">
            <button className="btn toggle-button ml-2" onClick={props.click}>
                <IoIosList/>
            </button>
        </li>
        {/* <div className="toggle-button-line"/>
        <div className="toggle-button-line"/>
        <div className="toggle-button-line"/> */}
    </ul>
    // {/* // </button> */}
);

export default NavbarToggleButton;