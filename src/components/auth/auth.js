import Keycloak from "keycloak-js";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Action from "../../data/actions/auth/auth.action";
import * as Contants from "../../share/constants";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keycloak: null
    };
  }

  componentDidMount() {
    if (this.props.keycloak === null) {
      this.checkLogin();
    }
  }

  errorLogin = statusCode => {
    if (statusCode === 401) {
      this.props.history.push("/login");
    }
  };

  isTokenExpired = exp => {
    try {
      if (exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  };

  saveKeycloakLocalStore = kcToken => {
    localStorage.setItem(Contants.JWT, JSON.stringify(kcToken));
  };

  getKeycloakFromLocalStore = () => {
    return localStorage.getItem(Contants.JWT) !== null
      ? JSON.parse(localStorage.getItem(Contants.JWT))
      : null;
  };

  checkSSO = typeLogin => {
    const keycloak = Keycloak("/keycloak.json");
    keycloak
      .init({ onLoad: typeLogin, promiseType: "native" })
      .then(authentication => {
        if (authentication) {
          this.saveKeycloakLocalStore(keycloak);
          this.props.saveKeycloak(keycloak);
          this.props.exchangeAuthWithServer(this.errorLogin);
          this.props.history.push("/app/books");
        } else {
          this.props.history.push("/login");
        }
      });
  };

  checkLogin = () => {
    let keycloak = this.getKeycloakFromLocalStore();
    if (keycloak !== null) {
      if (
        keycloak.authenticated &&
        this.isTokenExpired(keycloak.idTokenParsed.exp)
      ) {
        this.checkSSO("login-required");
      } else if (
        keycloak.authenticated &&
        !this.isTokenExpired(keycloak.idTokenParsed.exp)
      ) {
        this.saveKeycloakLocalStore(keycloak);
        this.props.saveKeycloak(keycloak);
        this.props.exchangeAuthWithServer(this.errorLogin);
      }
    } else {
      this.checkSSO("check-sso");
    }
  };

  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  saveKeycloak: data => dispatch(Action.saveKeycloak(data)),
  exchangeAuthWithServer: errorfunc =>
    dispatch(Action.exchangeAuthWithServer(errorfunc))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
