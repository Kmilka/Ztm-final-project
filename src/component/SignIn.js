import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { api } from '../utils/API';
import '../index.css'

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: false,
            errorMessage: ''
        }
    }

    onEmailChange(event) {
        this.setState({
            email: event.target.value,
            error: false,
            errorMessage: ''
        })
    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value,
            error: false,
            errorMessage: ''
        })
    }

    isEmpty() {
        if (this.state.password === '' || this.state.email === '') {
            this.setState({
                error: 'true',
                errorMessage: 'Fill all form fields'
            })
            return true;
        }
        else return false;
    }
    
    saveAuthTokenInSession = (token) => {
        window.sessionStorage.setItem('token', token);
    }

    onSubmit() {
        if (this.isEmpty()) {
            return;
        }
        else {
            api.post('signin', { email: this.state.email, password: this.state.password})
            .then(data => {
                const userInfo = data.data;
                if (userInfo.id && userInfo.success) {
                    this.saveAuthTokenInSession(userInfo.token);
                    this.props.LoadUser(userInfo.id);
                    this.props.history.push('./home')
                }
                else {
                    this.setState({
                        error: true,
                        errorMessage: 'unable to signin'
                    });
                    throw new Error(userInfo);      
                }
            })
            .catch(error => {
                this.setState({
                    error: true
                });
                if (error.response) {
                    this.setState({
                        errorMessage: error.response.data
                    }); 
                  console.log(error.response.data);
                } else if (error.request) {
                  console.log(error.request);
                } else {
                  console.log('Error', error.message);
                }
              })
        }
    }

    render() {

        return (
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"
                                onChange={(event) => this.onEmailChange(event)} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"
                                onChange={(event) => this.onPasswordChange(event)} />
                        </div>
                    </fieldset>
                        <div className="">
                            <legend className={this.state.error?'error center':'invisible'}>{this.state.errorMessage}</legend>
                            <input 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in" 
                                onClick={() => this.onSubmit()} />
                            </div>
                            <div className="lh-copy mt3">
                            <Link to="/password-reset" className="f6 link dim black db">Forgot your password?</Link>
                        </div>
                </div>
            </article>
        )
    }
}


export default withRouter(SignIn);