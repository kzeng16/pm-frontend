import React, { useState, Component } from 'react';
import { Button, Label, Input, Spinner, Container, Row, Col } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Success extends Component {
    
    render()
    {
        return (
           <Container className="bg-light col-lg-6 bg-light pb-3 pt-3 mt-5 rounded">
               
                    <h1 className="text-center pb-2 pt-2 font-weight-bold border-bottom border-dark">Registration Successful!</h1>
                    <Col className="text-center font-weight-bold">A verification link will be sent to your email account.</Col>
                    <Col className="text-center font-weight-bold">Please click on the verification link to activate your account.</Col>
                
           </Container>
        );
  
    }
}