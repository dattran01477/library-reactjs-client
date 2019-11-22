import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { Link, NavLink as NavLinkRRD } from "react-router-dom";
import {
  Col,
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Media,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown
} from "reactstrap";

import { Menu, Icon, Avatar } from "antd";

const { SubMenu } = Menu;

var ps;

class Sidebar extends Component {
  state = {
    collapseOpen: false
  };
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }

  handleClick = e => {
    console.log("click ", e);
  };
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  // creates the links that appear in the left menu / Sidebar
  createLinks = routes => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };
  render() {
    const { bgColor, routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}

          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Form */}
            <Form className="mt-4 mb-3 d-md-none">
              <InputGroup className="input-group-rounded input-group-merge">
                <Input
                  aria-label="Search"
                  className="form-control-rounded form-control-prepended"
                  placeholder="Search"
                  type="search"
                />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <span className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
            {/* Navigation */}
            <Nav navbar>{this.createLinks(routes)}</Nav>
            {/* Divider */}
            <hr className="my-3" />

            {/* Top tác giả */}
            <div className="text-center ">
              <p className="font-bold">Top Tác Giả</p>
              <div className="text-gray-700 font-light">
                <div className="flex flex-row my-2">
                  <div className="w-1/5">
                    <Avatar size="large" src="https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/5290/9781529028485.jpg" />
                  </div>
                  <div className="w-4/5 ">
                    <span className="inline-block align-middle font-normal text-sm">
                      Nam Cao
                    </span>
                  </div>
                </div>

                <div className="flex flex-row my-2">
                  <div className="w-1/5">
                    <Avatar size="large" src="https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/5098/9781509853311.jpg" />
                  </div>
                  <div className="w-4/5 ">
                    <span className="inline-block align-middle font-normal text-sm">
                      Tố Hữu
                    </span>
                  </div>
                </div>

                <div className="flex flex-row my-2">
                  <div className="w-1/5">
                    <Avatar size="large" src="https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9780/7181/9780718187767.jpg"/>
                  </div>
                  <div className="w-4/5 ">
                    <span className="inline-block align-middle font-normal text-sm">
                      Hồ Xuân Hương
                    </span>
                  </div>
                </div>

                <div className="flex flex-row my-2">
                  <div className="w-1/5">
                    <Avatar size="large" src="https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9780/7515/9780751569643.jpg"/>
                  </div>
                  <div className="w-4/5 ">
                    <span className="inline-block align-middle font-normal text-sm">
                      Bà Huyện Thanh Quan
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* divide */}
            <hr className="my-3" />

            {/* Top sách mượn */}
            <div className="text-center">
              <p className="font-bold">Top Sách Mượn Trong Tuần</p>
              <div className="flex flex-row my-2">
                <div className="w-1/5">
                  <Avatar shape="square" size="large" src="https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/7876/9781787632196.jpg" />
                </div>
                <div className="w-4/5 ">
                  <span className="inline-block align-middle font-normal text-sm">
                    Tôi đi code dạo
                  </span>
                </div>
              </div>

              <div className="flex flex-row my-2">
                <div className="w-1/5">
                  <Avatar shape="square" size="large" icon="user" src="https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9780/5713/9780571356829.jpg"/>
                </div>
                <div className="w-4/5 ">
                  <span className="inline-block align-middle font-normal text-sm">
                    Ngủ rồi mới biết thế nào là sướng
                  </span>
                </div>
              </div>

              <div className="flex flex-row my-2">
                <div className="w-1/5">
                  <Avatar shape="square" size="large" src="https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/9126/9781912626076.jpg"/>
                </div>
                <div className="w-4/5 ">
                  <span className="inline-block align-middle font-normal text-sm">
                    Anh nhớ cành cây nhỏ
                  </span>
                </div>
              </div>

              <div className="flex flex-row my-2">
                <div className="w-1/5">
                  <Avatar shape="square" size="large" src="https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4063/9781406358094.jpg" />
                </div>
                <div className="w-4/5 ">
                  <span className="inline-block align-middle font-normal text-sm">
                    Tình là giấc mộng say
                  </span>
                </div>
              </div>
            </div>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
