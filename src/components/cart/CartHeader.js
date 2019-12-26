import React, { Component } from "react";
import { Badge, Icon } from "antd";
import { connect } from "react-redux";
import * as Action from "../../data/actions/action-type";

class CartHeader extends Component {
  render() {
    const { cartItem } = this.props;
    return (
      <div className="flex content-center">
        {(cartItem.length > 0 && (
          <Badge count={6} status="success">
            <Icon className="text-2xl" type="shopping-cart" />
          </Badge>
        )) || (
          <Badge count={6} status="Default">
            <Icon className="text-2xl" type="shopping-cart" />
          </Badge>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.books
});

const mapDispatchToProps = dispatch => ({
  addCart: item => dispatch(Action.addToCart(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartHeader);
