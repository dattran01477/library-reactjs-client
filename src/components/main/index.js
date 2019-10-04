import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "../../assets/scss/argon-dashboard-react.scss";
import "../../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/vendor/nucleo/css/nucleo.css";

import routes from "../../share/route";
import SideMenu from "../sidebar";
import Header from "../header";
import { Button } from "reactstrap";
import KeycloakService from "../../app/services/keycloakService/keycloakService";

class MainApp extends Component {
  getRoutes = routes => {
    return routes.map((prop, key) => {
      return (
        <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      );
    });
  };

  processLogin = () => {
    console.log("click");
    KeycloakService.init();
  };
  render() {
    return (
      <>
        <SideMenu
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("../../assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <Header />
          <Switch>{this.getRoutes(routes)}</Switch>
          <Button onClick={this.processLogin}>login</Button>
        </div>
      </>
    );
  }
}

export default MainApp;
