import React, { Component } from "react";
import { Col, NavItem, NavLink, Row } from "reactstrap";

class Item extends Component {
  render() {
    return (
      <NavItem>
        <Row className="justify-content-center">
          <Col>
            <div style={{ textAlign: "center",marginBottom:"0px" }}>
              <i className={this.props.icon} />
            </div>
            <NavLink className={"py-0"} href={this.props.href}>{this.props.name}</NavLink>
          </Col>
        </Row>
      </NavItem>
    );
  }
}

export default Item;
