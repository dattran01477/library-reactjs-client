import React, { Component } from "react";
import * as Action from "../../data/actions/auth/auth.action";
import { connect } from "react-redux";
import queryString from "query-string";
import { withRouter } from "react-router";

class Auth2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    var query = queryString.parse(this.props.location.search);
    if (query.token) {
      window.localStorage.setItem("jwt", query.token);
      this.props.history.push("/");
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
  saveUser: data => dispatch(Action.saveUser(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth2));
