import React, { Component } from "react";
import Keycloak from "keycloak-js";
import * as Action from "../../data/actions/auth/auth.action"
import { connect } from "react-redux";


class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keycloak: null
    };
  }

  componentDidMount() {
    const keycloak = Keycloak("/keycloak.json");
    keycloak
      .init({ onLoad: "login-required", promiseType: "native" })
      .then(authentication => {
        if (authentication) {
          this.props.saveKeycloak(keycloak);
          this.props.exchangeAuthWithServer(keycloak.token);
        }
      });
     
  }

  render() {
    const {children} = this.props;

        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
  }
}

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  saveKeycloak: data => dispatch(Action.saveKeycloak(data)),
  exchangeAuthWithServer: () => dispatch(Action.exchangeAuthWithServer())
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
