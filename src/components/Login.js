
import React, { Component } from 'react';
import { FaEnvelope, FaFacebook, FaGoogle, FaUniversity, FaLock } from 'react-icons/fa';
import '../App.css';
const parking_2 =  require('../images/parking_2.jpg');
const parking_3 =  require('../images/parking_3.jpg');
const parking_4 =  require('../images/parking_4.jpg');

class Login extends Component {
    render() {
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
                                    <input type="email" required/>
                                    <span className="floating-label">Email Address</span>
                                </div>
                                <div className="form-input">
                                    <span><FaLock/></span>
                                    <input type="password" required/>
                                    <span className="floating-label">Password</span>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12 d-flex">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="cb1"/>
                                            <label  className="custom-control-label text-black" for="cb1">Remember me?</label>
                                        </div>

                                        <div className="col-6 text-right">
                                            <a href="forget.js" className="forget-link">Forgot password</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-left mb-3">
                                        <button type="submit" class="btn">Login</button>
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
                                    <a href="./Register.js" className="register-link">Register here</a>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* <div id="login-carousel" className="col-lg-6 col-md-6 d-block d-md-block carousel slide border border-primary" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner h-100 border border-success">
                            <div class="carousel-item h-100 text-center active border border-warning">
                                <img class="d-block h-100 w-100 border border-danger" src={parking_2} alt="First slide"/>
                            </div>
                            <div class="carousel-item h-100 text-center border border-warning">
                                <img class="d-block h-100 w-100 border border-danger" src={parking_3} alt="Second slide"/>
                            </div>
                            <div class="carousel-item h-100 text-center border border-warning">
                                <img class="d-block h-100 w-100 border border-danger" src={parking_4} alt="Third slide"/>
                            </div>
                            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                    </div> */}
                    <div className="col-lg-6 col-md-6 d-none d-md-block image-container">
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;