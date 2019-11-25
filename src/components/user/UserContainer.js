import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import UserInfo from "./UserInfo";

class UserContainer extends Component {
  render() {
    return (
      <Router>
        <Route path="/app/userinfo" component={UserInfo} key="UserInfo" />
      </Router>
    );
  }
}

export default UserContainer;
