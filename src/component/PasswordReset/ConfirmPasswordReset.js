import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../utils/API.js";
import backArrow from "./back-arrow.png";
import "./PasswordReset.css";

const initialState = {
  password: null,
  id: null,
  error: false,
  errorMessage: "",
  tokenIsValid: true,
  passwordChangeSucceeded: false,
};

function ConfirmPasswordReset() {
  const { token } = useParams();
  return <ConfirmPasswordResetComponent token={token} />;
}

class ConfirmPasswordResetComponent extends Component {
  constructor() {
    super();
    this.state = {
      password: initialState.password,
      id: initialState.id,
      error: initialState.error,
      errorMessage: initialState.errorMessage,
      tokenIsValid: initialState.tokenIsValid,
      passwordChangeSucceeded: initialState.passwordChangeSucceeded,
    };
  }

  componentDidMount() {
    api
      .get(`password/${this.props.token}`)
      .then((data) => {
        this.setState({
          tokenIsValid: true,
          id: data.data,
        });
      })
      .catch((error) => {
        this.setState({
          tokenIsValid: false,
          error: true,
        });
        if (error.response) {
          this.setState({
            errorMessage: error.response.data,
          });
        }
      });
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value,
      error: false,
      errorMessage: "",
    });
  }

  isEmpty() {
    if (this.state.password === "") {
      this.setState({
        error: "true",
        errorMessage: "Type new password",
      });
      return true;
    } else return false;
  }

  onSubmit = () => {
    if (this.isEmpty()) {
      return;
    } else {
      api
        .post("password/new", {
          id: this.state.id,
          password: this.state.password,
        })
        .then(() => {
          this.setState({ passwordChangeSucceeded: true });
        })
        .catch((error) => {
          this.setState({
            error: true,
          });
          if (error.response) {
            this.setState({
              errorMessage: error.response.data,
            });
          }
        });
    }
  };

  render() {
    return (
      <div>
        {this.state.passwordChangeSucceeded ? (
          <p className="white f3 pa3">
            Your password was successfully changed.
          </p>
        ) : this.state.tokenIsValid ? (
          <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
            <div className="measure">
              <fieldset className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Password Reset</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    New password
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    placeholder="type new password here"
                    type="email"
                    name="password"
                    id="password"
                    style={{ marginBottom: "2rem" }}
                    onChange={(event) => this.onPasswordChange(event)}
                  />
                </div>
              </fieldset>
              <div className="">
                <legend
                  className={this.state.error ? "error center" : "invisible"}
                >
                  {this.state.errorMessage}
                </legend>
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Submit"
                  onClick={() => this.onSubmit()}
                  style={{ marginBottom: "2rem" }}
                />
              </div>
            </div>
          </article>
        ) : (
          <p className="white f3 pa3">
            {this.state.errorMessage
              ? this.state.errorMessage
              : "Your link has expired"}
            . Request a new one{" "}
            <Link to="/password-reset" className="underline link dim black">
              here
            </Link>
          </p>
        )}
        <Link to="/signin" className="f5 underline link dim black db">
          {" "}
          <img
            src={backArrow}
            alt="backwards-arrow"
            style={{ padding: "5px" }}
          />
          Go back to SignIn page
        </Link>
      </div>
    );
  }
}

export default ConfirmPasswordReset;
