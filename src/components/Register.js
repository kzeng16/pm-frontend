import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";


const passRegex = RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{5,}$/, "i");
const userRegex = RegExp(/^[a-zA-Z0-9]{2,}/);
const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export default class Register extends Component {
constructor(props) {
    super(props);

    this.state={
        firstName:'',
        lastName:'',
        email:'',
        userName:'',
        password:'',
        confirmPassword:'',
        nameError: '',
		userNameError:'',
		emailError:'',
		passwordError:'',
		passwordConfirmError:'',
		isEmailInvalid: false,
		isNameInvalid: false,
		isUsernameInvalid: false,
		isPasswordInvalid: false,
		isconfirmPasswordInvalid: false,
		successfulRegister: false
    }
}

validate = () => {

    const { password, confirmPassword, email,userName, firstName, lastName } = this.state;

        var valid = true;

        if(firstName == '' || lastName == '') {
            this.setState({
                nameError: 'You must enter your first and last name',
                isNameInvalid: true,
            })
            valid = false;
        }

        if(userName == '') {
            this.setState({
                userNameError: 'Username is required',
                isUsernameInvalid: true,
            })
            valid = false;
        }
        else if(!(userRegex.test(userName))) {
            this.setState({
                userNameError: 'Username must be alphanumeric.',
                isUsernameInvalid: true,
            })
            valid = false;
        }

        if(email == '' || !(emailRegex.test(email))) {	
            this.setState({
                emailError: 'Not a valid email.',
                isEmailInvalid: true,
            })
            valid = false;
        }

        if (password.length < 5) {
            this.setState({
                passwordError: 'Password must be 5 characters minumum.',
                isPasswordInvalid: true,
                password: '',
                confirmPassword:''
            })
            valid = false;
        }
        else if(!passRegex.test(password)) {
            this.setState({
                passwordError: 'Password can only have alphanumeric, or @$.!%*#?&, symbols.\
                Must have at least one uppercase, one lowercase, and one symbol.',
                isPasswordInvalid: true,
                password: '',
                confirmPassword:''
            })
            valid = false;
        }

        if (!(password === confirmPassword))
        {
            this.setState({
                isconfirmPasswordInvalid: true,
                passwordConfirmError:'Password does not match'
            })
            valid = false;
        }
        
        return valid;
}

handleSubmit = (event) => {
    var hash = require('object-hash');
    const { firstName, lastName, email, userName, password, confirmPassword } = this.state;
    
    if (this.validate()){
    
        axios.post('/auth/signup', {
            first_name: firstName,
            last_name: lastName,
            email: email,
            username: userName,
            password: hash(password, { algorithm: 'md5', encoding: 'base64' }),
            password_confirmation: hash(confirmPassword, { algorithm: 'md5', encoding: 'base64' })
        })
        .then((response) => {
            this.setState({successfulRegister: true})	// Set to true to redirect
        })
        .catch((error) => {
            console.log("fail");
            
            this.setState({
                password:'',
                confirmationPassword:''
            })
    
        });
    }
}


handleFirstNameChange = (event) => {
    this.setState({ 
        firstName: event.target.value
    })
}

handleLastNameChange = (event) => {
    this.setState({ 
        lastName: event.target.value
    })
}

handleuserNameChange = (event) => {
    this.setState({ 
        userName: event.target.value
    })
}

handleEmailChange = (event) => {
    this.setState({ 
        email: event.target.value
    })
}

handlePasswordChange = (event) => {
    this.setState({ 
        password: event.target.value,
    })
}

handleConfirmPasswordChange = (event) => {
    this.setState({ 
        confirmPassword: event.target.value,
    })
}

render() {

    if (this.state.successfulRegister) {
        return <Redirect to="/login"/> // Maybe send to verify email page
    }

    return (
        <Form>
            <FormGroup>
            <Label>First Name</Label>
                <Input
                    name="firstName"
                    className="text"
                    type="text"
                    placeholder="First Name"
                    value={this.state.firstName}
					onChange={this.handleFirstNameChange}
                    invalid={this.state.isNameInvalid}
                    />
                <FormFeedback>{this.state.nameError}</FormFeedback>
            </FormGroup>
            <FormGroup>
            <Label>Last Name</Label>
                <Input
                    name="lastName"
                    className="text"
                    type="text"
                    placeholder="Last Name"
                    value={this.state.lastName}
					onChange={this.handleLastNameChange}
                    invalid={this.state.isNameInvalid}
                    />
            </FormGroup>
            <FormGroup>
            <Label>Username</Label>
                <Input
                    name="username"
                    className="text"
                    type="text"
                    placeholder="Username must contain only letters or numbers"
                    value={this.state.userName}
					onChange={this.handleuserNameChange}
                    invalid={this.state.isUsernameInvalid}
                    />
                <FormFeedback>{this.state.userNameError}</FormFeedback>
            </FormGroup>
            <FormGroup>
            <Label>Email</Label>
                <Input
                    name="email"
                    className="text"
                    type="text"
                    placeholder="Email address"
                    value={this.state.email}
					onChange={this.handleEmailChange}
                    invalid={this.state.isEmailInvalid}
                    />
                <FormFeedback>{this.state.emailError}</FormFeedback>
            </FormGroup>
            <FormGroup>
            <Label>Password</Label>
                <Input
                    name="password"
                    className="text"
                    type="password"
                    placeholder="Must be 5 characters minimum and only have alphanumeric, or @$.!%*#?&, symbols
                    and have at least one uppercase, one lowercase, and one symbol."
                    value={this.state.password}
					onChange={this.handlePasswordChange}
                    invalid={this.state.isPasswordInvalid}
                    />
                <FormFeedback>{this.state.passwordError}</FormFeedback>
            </FormGroup>
            <FormGroup>
            <Label>Confirm Password</Label>
                <Input
                    name="confirmPassword"
                    className="text"
                    type="password"
                    placeholder="Enter your password again"
                    value={this.state.confirmPassword}
                    onChange={this.handleConfirmPasswordChange}
                    invalid={this.state.isConfirmPasswordInvalid}
                />
                <FormFeedback>{this.state.passwordConfirmError}</FormFeedback>
            </FormGroup>
            <Button onClick={this.handleSubmit}>
                Sign Up
            </Button>
        </Form>
    );
}

}