import React, { Component } from "react";
import * as Action from "../../data/actions/auth/auth.action";
import { connect } from "react-redux";
import queryString from "query-string";
import { withRouter } from "react-router";
import decode from "jwt-decode";

class Auth2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authentication: false
    };
  }

  loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  };

  isTokenExpired = token => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired.
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  };

  setToken = idToken => {
    // Saves user token to localStorage
    localStorage.setItem("jwt", idToken);
  };

  getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem("jwt");
  };

  logout = () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("jwt");
    this.props.history.push("/login");
  };

  getConfirm = () => {
    // Using jwt-decode npm package to decode the token
    let answer = decode(this.getToken());
    console.log("Recieved answer!");
    return answer;
  };

  componentDidMount() {
    var query = queryString.parse(this.props.location.search);
    if (query.token) {
      window.localStorage.setItem("jwt", query.token);
    }

    if (this.loggedIn()) {
      this.props.setIsAuthentication(true);
      this.setState({ authentication: true });
      this.props.history.push("/app/books");
    } else {
      this.props.history.push("/login");
    }
  }

  componentDidUpdate() {
    if (this.props.isLogout === true) {
      this.logout();
      this.props.setIsLogout(false);
    }
    if (this.props.refeshVerifyLogin === true) {
      if (this.loggedIn()) {
        this.props.setIsAuthentication(true);
        this.setState({ authentication: true });
        this.props.history.push("/app/books");
      } else {
        this.props.history.push("/login");
      }
      this.props.setRefeshVerifyLogin(false);
    }
  }

  render() {
    const { children } = this.props;

    return <React.Fragment>{children}</React.Fragment>;
  }
}

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  saveUser: data => dispatch(Action.saveUser(data)),
  setIsAuthentication: isAuthentication =>
    dispatch(Action.setAuthentication(isAuthentication)),
  setRefeshVerifyLogin: isCheck =>
    dispatch(Action.setRefreshVerifyLogin(isCheck)),
  setIsLogout: isLogout => dispatch(Action.setIsLogout(isLogout))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth2));
