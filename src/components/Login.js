
import React, { useState, Component } from 'react';
import { Spinner, FormFeedback } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaFacebook, FaGoogle, FaUniversity, FaLock } from 'react-icons/fa';
import '../App.css';


class Login extends Component {
    constructor(props) {
		super(props);

		this.state = {
			userName: "",
			password: "",
			loginErrors: "",
			isUsernameInvalid: false,
			isPasswordInvalid: false,
			loginSuccess: false,
			loading:false,
        };
        // this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    }   

    handleLoginSuccess(data){
        // Update Parent (Main) Component
        // this.props.history.push('./Dashboard');
    }
	handleLogin = (event) => {
		var hash = require('object-hash');

		const { userName, password } = this.state;
		this.setState({loading:true});
		if ((userName === "") || (password === "")) { // if submitted without any input give error
			this.setState({
				isUsernameInvalid: true,
				isPasswordInvalid: true,
				loading: false
			})
		}
    
        // TODO: ONCE DONE TESTING change url to : http://34.73.25.235
		// Retrieve user from backend
		axios.post("http://localhost:3000/auth/login", {
			username: userName,
			password: password	// Hash before sendingweb
		})
		.then(result => {
            // No response was recieved
            if (!result){
				console.log('login failure');
				this.setState({loginSuccess: true});
            }
            // Login response is good
			if (result.status === 200) {
                console.log('login success');
				// this.props.handleLoginSuccess(result.data);
                
				this.setState({loginSuccess: true});
            }
		})
		.catch(function (error){
            if (error.response) {
                // Request made and server responded
                console.log('error.response.data: ',error.response.data);
                console.log('error.response.status: ',error.response.status);
                console.log('error.response.headers: ',error.response.headers);
              } 
            if (error.request) {
                // The request was made but no response was received
                console.log('error.request: ',error.request);
              } 
            if (error.message) {
                // Something happened in setting up the request that triggered an Error
                console.log('Error: ', error.message);
              }
            this.setState({
				loading:false,
				isPasswordInvalid: true,
				password:""
            });
        });
	}   
    
    // Username Entered
	handleUsernameChange = (event) => {
		this.setState({ 
			userName: event.target.value
		})
	}

    // Password Entered
	handlePasswordChange = (event) => {
		this.setState({ 
			password: event.target.value,
			isPasswordInvalid: false
		})
	}

    render() {
        const { isUsernameInvalid, isPasswordInvalid } = this.state;

		if(this.state.loginSuccess) {
			return <Redirect to="./Dashboard"/> // Redirect after login
        }
        
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 col-md-6 form-container">
                        <div className="col-lg-8 col-md-12 col-sm-9 col-xs-12 form-box text-center">
                            <div className="logo mt-0 mb-3">
                                <img src="../images/logo_2.png" alt="logo"/>
                            </div>
                            <div className="heading mb-3">
                                <h4>Login to your account</h4>
                            </div>
                            <form>
                                <div className="form-input mb-2">
                                    <span><FaEnvelope/></span>
                                    <input 
                                    type="text"
                                    value={this.state.userName}
                                    onChange={this.handleUsernameChange}
                                    invalid={this.state.isUsernameInvalid}
                                    required/>
                                    <span className="floating-label">Username</span>
                                </div>
                                <div className="form-input">
                                    <span><FaLock/></span>
                                    <input
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                    invalid={this.state.isPasswordInvalid}                                    
                                    required/>
                                    <span className="floating-label">Password</span>
                                    {isPasswordInvalid && <FormFeedback >Invalid Username/Password</FormFeedback>} {/*Error if login is not successful*/}
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12 d-flex">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="cb1"/>
                                            <label  className="custom-control-label text-black" htmlFor="cb1">Remember me?</label>
                                        </div>

                                        <div className="col-6 text-right">
                                            <a href="forget.js" className="forget-link">Forgot password</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-left mb-3">
                                        <button 
                                        type="submit" 
                                        className="btn"
                                        onClick={this.handleLogin}
                                        // handleLoginSuccess = {this.handleLoginSuccess}
                                        disabled={this.state.loading || this.state.userName === "" || this.state.password === ""} // Disable button if fields are empty or when loading
                                        >
                                        {this.state.loading && <Spinner color="primary"/>} {/*Loading animation*/}
                                        Login</button>
                                </div>
                                <div className="text-black mb-3">Or login with </div>
                                <div className="row mb-3">
                                    <div className="col-4">
                                        <a href="" className="btn btn-block btn-social btn-facebook">
                                        <FaFacebook/>
                                        </a>
                                    </div>
                                    <div className="col-4">
                                        <a href="" className="btn btn-block btn-social btn-google">
                                        <FaGoogle/>
                                        </a>
                                    </div>
                                    <div className="col-4">
                                        <a href="" className="btn btn-block btn-social btn-university">
                                        <FaUniversity/>
                                        </a>
                                    </div>
                                </div>
                                <div>Don't have an account?
                                    <Link to="./Register.js" className="register-link">Register here</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 d-none d-md-block image-container">
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;