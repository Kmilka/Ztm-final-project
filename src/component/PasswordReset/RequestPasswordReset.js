import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/API.js';
import backArrow from './back-arrow.png';

const initialState = {
    email: '',
    error: false,
    errorMessage: '',
    requestSucceeded: false
}

class RequestPasswordReset extends Component {
    constructor() {
        super();
        this.state = {
            email: initialState.email,
            error: initialState.error,
            errorMessage: initialState.errorMessage,
            requestSucceeded: initialState.requestSucceeded
        }
    }

    componentDidMount() {

    }

    onEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    isEmpty() {
        if (this.state.email === '') {
            this.setState({
                error: 'true',
                errorMessage: 'Fill email-address'
            })
            return true;
        }
        else return false;
    }

    onSubmit = () => {
        if (this.isEmpty()) {
            return
        } else {
            api.post('password' ,{email: this.state.email})
            .then(this.setState({
                requestSucceeded: true
            }))
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
            <div>
                {
                !this.state.requestSucceeded ?
                <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                    <div className="measure">
                        <fieldset className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Password Reset</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" name="email-address"  id="email-address" style={{marginBottom: '2rem'}}
                                    onChange={(event) => this.onEmailChange(event)} />
                            </div>
                        </fieldset>
                            <div className="">
                                <legend className={this.state.error?'error center':'invisible'}>{this.state.errorMessage}</legend>
                                <input 
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                    type="submit" 
                                    value="Submit" 
                                    onClick={() => this.onSubmit()} 
                                    style={{marginBottom: '2rem'}}
                                    />
                            </div>
                    </div>
                </article> :
                <p className="white f3 pa3">
                    A password reset link was sent to this email address: <span className="black f3 underline">{this.state.email}</span>.<br/> The link is active for 1 hour and for 1-time use only. If you can't find the email, please check the spam folder.
                </p>
                }
                <Link to="/signin" className="f5 underline link dim black db"> <img src={backArrow} alt="backwards-arrow" style={{padding: '5px'}} />Go back to SignIn page</Link>
            </div>

        )
    }
}

export default RequestPasswordReset;