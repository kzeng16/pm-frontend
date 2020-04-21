import React, { Component } from 'react';
import './Overlay.css';

const Overlay = props => (
     console.log(props),
    <div className="backdrop" onClick={props.click}/>
);

export default Overlay;