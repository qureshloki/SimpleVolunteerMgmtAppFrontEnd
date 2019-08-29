import React from "react";
import PropTypes from "prop-types";
import Joi from "joi-browser";
import Form from "./common/form";
import { Redirect } from "react-router-dom";
import authService from "../services/authService";

class LoginForm extends Form {
  state = {
    data: {},
    errors: {}
  };

  schema = {
    username: Joi.string()
      .min(4)
      .max(40)
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(4)
      .max(40)
      .label("Password")
  };

  doSubmit = async () => {
    const { username, password } = this.state.data;
    try {
      await authService.login(username, password);
      const location = this.props.location;
      const redirectPath = location.state ? location.state.from.pathname : "/";
      window.location = redirectPath;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors["username"] = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (authService.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(null, "username", "Username")}
          {this.renderInput(null, "password", "Password")}
          {this.renderSubmit("loginBtn", "Login")}
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  location: PropTypes.shape({
    state: {
      from: {
        pathname: PropTypes.string
      }
    }
  })
};

export default LoginForm;
