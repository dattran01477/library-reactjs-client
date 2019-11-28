import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import KeycloakService from "../../app/services/keycloakService/keycloakService";
import "../../assets/scss/argon-dashboard-react.scss";
import "../../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/vendor/nucleo/css/nucleo.css";
import routes from "../../share/route";
import SideMenu from "../sidebar";
import LoginPage from "../hooks/keycloak";
import staus from "../hooks/status";
import {
  Tabs,
  Card,
  Divider,
  Input,
  Button,
  Skeleton,
  List,
  Avatar,
  Layout,
  Icon
} from "antd";
const { TabPane } = Tabs;
const { Header, Footer, Sider, Content } = Layout;

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
        <Layout>
          <Header>Header</Header>
          <Layout>
            <Sider>
       
              <SideMenu
                {...this.props}
                routes={routes}
                logo={{
                  innerLink: "/admin/index",
                  imgSrc: require("../../assets/img/brand/argon-react.png"),
                  imgAlt: "..."
                }}
              />
            </Sider>
            <Content>
         
              <div className="main-content" ref="mainContent">
                <Switch>{this.getRoutes(routes)}</Switch>
              </div>
            </Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      </>
    );
  }
}

export default MainApp;
