import React, { Component } from "react";
import { Route } from "react-router-dom";
import Background from "../../assets/img/background/login.png";
import LoginComponent from "./login";
import ResetComponent from "./reset";
import Register from "./register"

const sectionStyle = {
  width: "100%",
  backgroundImage: `url(${Background})`
};

class Login extends Component {
  render() {
    return (
      <div className="w-full h-screen p-16 object-cover" style={sectionStyle}>
        <Route
          path={"/login"}
          exact={true}
          component={LoginComponent}
          key="login"
        />
        <Route
          exact={true}
          path={"/login/resetpass"}
          component={ResetComponent}
          key="reset"
        />
        <Route
          exact={true}
          path={"/login/register"}
          component={Register}
          key="register"
        />

      </div>
    );
  }
}

export default Login;
