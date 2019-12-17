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

  saveKeycloak = kcToken => {
    localStorage.setItem(Contants.JWT, JSON.stringify(kcToken));
  };

  getKeycloakFromLocalStore = () => {
    return localStorage.getItem(Contants.JWT) !== null
      ? JSON.parse(localStorage.getItem(Contants.JWT))
      : null;
  };

  checkSSO = () => {
    const keycloak = Keycloak("/keycloak.json");
    keycloak
      .init({ onLoad: "check-sso", promiseType: "native" })
      .then(authentication => {
        if (authentication) {
          this.saveKeycloak(keycloak);
          this.props.saveKeycloak(keycloak);
          this.props.exchangeAuthWithServer(keycloak.token);
          this.props.history.push("/app/books");
        } else {
          this.props.history.push("/login");
        }
      });
  };

  checkLogin = () => {
    let keycloak = this.getKeycloakFromLocalStore();
    if (keycloak !== null) {
      if (!keycloak.authenticated) {
        this.checkSSO();
      } else {
        this.props.saveKeycloak(keycloak);
        this.props.exchangeAuthWithServer(keycloak.token);
        this.props.history.push("/app/books");
      }
    } else {
      this.checkSSO();
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
  exchangeAuthWithServer: () => dispatch(Action.exchangeAuthWithServer())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
