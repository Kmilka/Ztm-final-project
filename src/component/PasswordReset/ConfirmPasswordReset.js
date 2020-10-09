import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/API.js';
import backArrow from './back-arrow.png';

const initialState = {
    password: '',
    error: false,
    errorMessage: '',
    passwordChangeSucceeded: false
}

class ConfirmPasswordReset extends Component {
    constructor() {
        super();
        this.state = {
            password: initialState.password,
            error: initialState.error,
            errorMessage: initialState.errorMessage,
            passwordChangeSucceeded: initialState.passwordChangeSucceeded
        }
    }
    
    onPasswordChange(event) {
        this.setState({
            password: event.target.value,
            error: false,
            errorMessage: ''
        })
    }

    isEmpty() {
        if (this.state.password === '') {
            this.setState({
                error: 'true',
                errorMessage: 'Type new password'
            })
            return true;
        }
        else return false;
    }
    
    onSubmit = () => {
        const { id } = useParams();
        if (this.isEmpty()) {
            return
        } else {
            api.post('password/new', {password: this.state.password, id: id})
            .then()
            .catch(error => {
                if (error.response) {
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
                this.state.passwordChangeSucceeded ?    
                <p className="white f3 pa3">Your password was successfully changed.</p> :
                <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                    <div className="measure">
                        <fieldset className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Password Reset</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" name="password"  id="password" style={{marginBottom: '2rem'}}
                                    onChange={(event) => this.onPasswordChange(event)} />
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
                </article> 
                }
                <Link to="/signin" className="f5 underline link dim black db"> <img src={backArrow} alt="backwards-arrow" style={{padding: '5px'}} />Go back to SignIn page</Link>
            </div>
        )
    }
}

export default ConfirmPasswordReset;