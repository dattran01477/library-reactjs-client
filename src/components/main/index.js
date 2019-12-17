import { Avatar, Button, Icon, Layout, Menu } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import Cookies from "universal-cookie";
import KeycloakService from "../../app/services/keycloakService/keycloakService";
import "../../assets/scss/argon-dashboard-react.scss";
import "../../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/vendor/nucleo/css/nucleo.css";
import * as Action from "../../data/actions/action-type";
import { categories } from "../../data/fake-data/categories";
import * as Constant from "../../share/constants";
import routes from "../../share/route";
import CartHeader from "../cart/CartHeader";
import SideMenu from "../sidebar";

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const cookies = new Cookies();
class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "mail",
      isAuthentication: false,
      categoriesData: JSON.parse(categories)
    };
  }

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
          exact
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
        {this.props.auth && (
          <Layout>
            <Sider className="px-0">
              <SideMenu
                {...this.props}
                routes={routes}
                logo={{
                  innerLink: "/app/books",
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
                        <span>Liên lạc</span>
                      </Menu.Item>
                      <Menu.Item key="introteam">
                        <Link to="/app/contribute">Giới thiệu team</Link>
                      </Menu.Item>

                      <SubMenu
                        title={
                          <span className="submenu-title-wrapper">
                            <Avatar
                              className="text-center"
                              size="large"
                              src={
                                this.props.auth &&
                                "https://experience.sap.com/fiori-design-web/wp-content/uploads/sites/5/2017/02/Avatar-Sizes-Custom-1.png"
                              }
                            />
                            <span>{this.props.auth.username}</span>
                          </span>
                        }
                      >
                        <Menu.ItemGroup>
                          <Menu.Item key="setting:1">
                            <Link to="/app/userinfo">Quản lý thông tin</Link>
                          </Menu.Item>
                          <Menu.Item key="setting:2">
                            Trạng thái phiếu mượn
                          </Menu.Item>
                          <Menu.Item key="setting:2">Logout</Menu.Item>
                        </Menu.ItemGroup>
                      </SubMenu>

                      <SubMenu title={<CartHeader className="p-2" />}>
                        {/* <CartContent /> */}
                        <Menu.Item key="gotoBorrowingCart">
                          <Link to="/app/book-cart" exact />
                          Tiến hành đặt sách
                          <Icon type="right" />
                        </Menu.Item>
                      </SubMenu>
                      {(this.props.keycloak.authenticated && (
                        <Menu.Item key="logout">
                          <Button
                            onClick={this.props.keycloak.logout}
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
              <Content className="bg-white h-full">
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
                        <span>
                          Youtube <Icon type="youtube" />
                        </span>
                      </div>
                      <div>
                        <span>
                          FaceBook <Icon type="facebook" />
                        </span>
                      </div>
                      <div>
                        <span>
                          Porn Hub <Icon type="google-plus" />
                        </span>
                      </div>
                      <div>
                        <span>
                          Git Hub <Icon type="github" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-2/12 text-left flex flex-col">
                    <div className="font-bold mb-2">Suport</div>
                    <div className="text-gray-400">
                      <div>
                        <span>Documents</span>
                      </div>
                      <div>
                        <span>Forum</span>
                      </div>
                      <div>
                        <span>Language</span>
                      </div>
                      <div>
                        <span>Release</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-2/12 text-left flex flex-col">
                    <div className="font-bold mb-2">Recommend</div>
                    <div className="text-gray-400">
                      <div>
                        <span>Wordpress</span>
                      </div>
                      <div>
                        <span>Woocomerce</span>
                      </div>
                      <div>
                        <span>google</span>
                      </div>
                      <div>
                        <span>FAQS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Footer>
            </Layout>
          </Layout>
        )}
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
  setCart: cartItem => dispatch(Action.addToCart(cartItem)),
  setIsLogout: isLogout => dispatch(Action.setIsLogout(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
