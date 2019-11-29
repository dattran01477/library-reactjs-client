import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import KeycloakService from "../../app/services/keycloakService/keycloakService";
import "../../assets/scss/argon-dashboard-react.scss";
import "../../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/vendor/nucleo/css/nucleo.css";
import routes from "../../share/route";
import SideMenu from "../sidebar";
import { Layout, Menu, Icon, Button, Avatar, Badge } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as Action from "../../data/actions/action-type";
import CartHeader from "../cart/CartHeader";
import CartContent from "../cart/CartContentMenu";
import Cookies from "universal-cookie";
import * as Constant from "../../share/constants";
import { stat } from "fs";

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const cookies = new Cookies();
class MainApp extends Component {
  state = {
    current: "mail",
    isAuthentication: false
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  componentDidMount() {
    let cartItem = cookies.get(Constant.CART_NAME);
    if (cartItem != null) {
      this.props.setCart(cartItem);
    }
  }

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
    KeycloakService.init();
  };
  render() {
    return (
      <>
        <Layout>
          <Sider className="px-0">
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

          <Layout className="ml-4">
            <Header className="bg-white shadow-2xl px-0 p-2">
              <div className="bg-white h-full w-full border-b shadow-2xl ">
                <div className="flex flex-row justify-end">
                  <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                  >
                    <Menu.Item key="mail">
                      <Icon type="mail" />
                      Nội quy thư viện
                    </Menu.Item>
                    <Menu.Item key="app">
                      <Icon type="appstore" />
                      Danh mục sách
                    </Menu.Item>
                    <SubMenu
                      title={
                        <span className="submenu-title-wrapper">
                          <Icon type="setting" />
                          Bài đăng
                        </span>
                      }
                    >
                      <Menu.ItemGroup title="Item 1">
                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                      </Menu.ItemGroup>
                      <Menu.ItemGroup title="Item 2">
                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                      </Menu.ItemGroup>
                    </SubMenu>
                    <Menu.Item key="alipay">
                      <a
                        href="https://ant.design"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Liên lạc
                      </a>
                    </Menu.Item>

                    <SubMenu
                      title={
                        <span className="submenu-title-wrapper">
                          <Avatar
                            className="text-center"
                            size="large"
                            icon="user"
                          />
                          <span>Thanh Dat</span>
                        </span>
                      }
                    >
                      <Menu.ItemGroup>
                        <Menu.Item key="setting:1">
                          <Link to="/userinfo">Quản lý thông tin</Link>
                        </Menu.Item>
                        <Menu.Item key="setting:2">
                          Trạng thái phiếu mượn
                        </Menu.Item>
                        <Menu.Item key="setting:2">Logout</Menu.Item>
                      </Menu.ItemGroup>
                    </SubMenu>

                    <SubMenu title={<CartHeader className="p-2" />}>
                      <CartContent />
                      <Menu.Item key="gotoBorrowingCart">
                        <Button type="primary">
                          Tiến hành đặt sách
                          <Icon type="right" />
                        </Button>
                      </Menu.Item>
                    </SubMenu>

                    {(this.props.authentication && (
                      <Menu.Item key="register">
                        <Button
                          onClick={event =>
                            this.props.setIsAuthentication(false)
                          }
                        >
                          Logout
                        </Button>
                      </Menu.Item>
                    )) || (
                      <Menu.Item key="login">
                        <Button>
                          <Link to="/login">Login</Link>
                        </Button>
                        <Button>Register</Button>
                      </Menu.Item>
                    )}
                  </Menu>
                </div>
              </div>
            </Header>
            <Content className="bg-white">
              <div className="main-content mx-2" ref="mainContent">
                <Switch>{this.getRoutes(routes)}</Switch>
              </div>
            </Content>
            <Footer className="bg-gray-900 ont-mono">
              <div className="flex flex-row text-gray-200">
                <div className="w-4/12 text-center">
                  <div className="font-bold mb-2">Contact</div>
                  <div className="text-gray-400">
                    <div></div>
                  </div>
                </div>
                <div className="w-2/12 text-left flex flex-col">
                  <div className="font-bold mb-2">Company </div>
                  <div className="text-gray-400">
                    <p>Đại Học Sư Phạm</p>
                    <p>Đại Học Kinh Tế</p>
                    <p>Đại Học KHTN</p>
                    <p>Đại Học SPKT</p>
                  </div>
                </div>
                <div className="w-2/12 text-left flex flex-col">
                  <div className="font-bold mb-2">Link </div>
                  <div className="text-gray-400">
                    <div>
                      <a>
                        Youtube <Icon type="youtube" />
                      </a>
                    </div>
                    <div>
                      <a>
                        FaceBook <Icon type="facebook" />
                      </a>
                    </div>
                    <div>
                      <a>
                        Porn Hub <Icon type="google-plus" />
                      </a>
                    </div>
                    <div>
                      <a>
                        Git Hub <Icon type="github" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="w-2/12 text-left flex flex-col">
                  <div className="font-bold mb-2">Suport</div>
                  <div className="text-gray-400">
                    <div>
                      <a>Documents</a>
                    </div>
                    <div>
                      <a>Forum</a>
                    </div>
                    <div>
                      <a>Language</a>
                    </div>
                    <div>
                      <a>Release</a>
                    </div>
                  </div>
                </div>
                <div className="w-2/12 text-left flex flex-col">
                  <div className="font-bold mb-2">Recommend</div>
                  <div className="text-gray-400">
                    <div>
                      <a>Wordpress</a>
                    </div>
                    <div>
                      <a>Woocomerce</a>
                    </div>
                    <div>
                      <a>google</a>
                    </div>
                    <div>
                      <a>FAQS</a>
                    </div>
                  </div>
                </div>
              </div>
            </Footer>
          </Layout>
        </Layout>
      </>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  setIsAuthentication: isAuthentication =>
    dispatch(Action.setAuthentication(isAuthentication)),
  setCart: cartItem => dispatch(Action.addToCart(cartItem))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
