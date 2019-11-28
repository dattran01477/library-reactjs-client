import React, { Component } from "react";
import { Icon, Menu, Button } from "antd";
import { connect } from "react-redux";
import * as Action from "../../data/actions/action-type";

class CartContent extends Component {
  BookCartItem = ({ cartItem, handleDelete }) => {
    return results;
  };

  handleDeleteCart(id, cartItemProps) {
    let cartItem = [...cartItemProps];
    cartItem = cartItem.map(item => item.id != id);
  }

  render() {
    let { cartItem } = this.props;
    let results = [];

    cartItem &&
      cartItem.map(item =>
        results.push(
          <Menu.Item key="cart" className="p-2">
            <div className="flex flex-row">
              <div className="w-8/12">
                <p>{item.title}</p>
              </div>
              <div className="w-4/12">
                <Button
                  className="float-right"
                  onClick={event => this.handleDelete(item.id, cartItem)}
                >
                  <Icon type="delete" />
                </Button>
              </div>
            </div>
          </Menu.Item>
        )
      );

    return  results ;
  }
}

const mapStateToProps = state => ({
  ...state.books
});

const mapDispatchToProps = dispatch => ({
  addCart: item => dispatch(Action.addToCart(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartContent);
