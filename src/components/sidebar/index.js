import { Avatar } from "antd";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { Link, NavLink as NavLinkRRD } from "react-router-dom";
import * as Action from "../../data/actions/action-type";
import {
  Col,
  Collapse,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Row
} from "reactstrap";

class Sidebar extends Component {
  state = {
    collapseOpen: false,
    topBook: []
  };
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }

  handleClick = e => {};

  componentDidMount() {
    Action.getTopBooks(this.getBooksSucess, this.getBooksFail);
  }

  getBooksSucess = data => {
    this.setState({ ...this.state, topBook: data.content });
  };

  getBooksFail = err => {};
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

  rederTopBooks = data => {
    let lsBook = [];
    for (let i = 0; i < 5; i++) {
      lsBook.push(
        <div className="flex flex-row my-2" key={data[i].id}>
          <div className="w-1/5 mr-2">
            <Avatar shape="square" size="large" src={data[i].thumbnail} />
          </div>
          <div className="w-4/5 ">
            <span className="inline-block align-middle font-normal text-sm">
              <Link to={`/app/book/${data[i].id}`}>{data[i].name}</Link>
            </span>
          </div>
        </div>
      );
    }

    return lsBook;
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
    const { logo } = this.props;
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

            {/* Top tác giả */}
            <div>
              <p className="font-bold">Top Tác Giả</p>
              <div className="text-gray-700 font-light">
                <div className="flex flex-row my-2">
                  <div className="w-1/5 mr-2">
                    <span>
                      <Avatar
                        size="large"
                        src="https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/5290/9781529028485.jpg"
                      />
                    </span>
                  </div>
                  <div className="w-4/5 ">
                    <span className="font-normal text-sm">Nam Cao</span>
                  </div>
                </div>

                <div className="flex flex-row my-2">
                  <div className="w-1/5 mr-2">
                    <Avatar
                      size="large"
                      src="https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/5098/9781509853311.jpg"
                    />
                  </div>
                  <div className="w-4/5 ">
                    <span className="inline-block align-middle font-normal text-sm">
                      Tố Hữu
                    </span>
                  </div>
                </div>

                <div className="flex flex-row my-2">
                  <div className="w-1/5 mr-2">
                    <Avatar
                      size="large"
                      src="https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9780/7181/9780718187767.jpg"
                    />
                  </div>
                  <div className="w-4/5 ">
                    <span className="inline-block align-middle font-normal text-sm">
                      Hồ Xuân Hương
                    </span>
                  </div>
                </div>

                <div className="flex flex-row my-2">
                  <div className="w-1/5 mr-2">
                    <Avatar
                      size="large"
                      src="https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9780/7515/9780751569643.jpg"
                    />
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
            <div>
              <p className="font-bold">Top Sách Mượn Trong Tuần</p>
              {this.state.topBook.length > 0 &&
                this.rederTopBooks(this.state.topBook)}
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
