import React, { Component } from "react";
import { Icon, Menu, Button, Avatar } from "antd";
import { connect } from "react-redux";
import * as Action from "../../data/actions/action-type";

class CartContent extends Component {
  // BookCartItem = ({ cartItem, handleDelete }) => {
  //   return results;
  // };

  handleDeleteCart(id, cartItemProps) {
    let cartItem = [...cartItemProps];
    cartItem = cartItem.filter(item => {
      if (item.id !== id) {
        return item;
      }
    });
    console.log(cartItem);
    this.props.addCart(cartItem);
  }

  render() {
    let { cartItem } = this.props;
    let results = [];

    cartItem &&
      cartItem.map(item =>
        results.push(
          <Menu.Item key={item.id} className="p-2">
            <div className="flex flex-row">
              <div className="w-8/12 flex flex-row">
                <span className="mx-2">
                  <Avatar shape="square" size="large" src={item.thumnail} />
                </span>

                <p className=" font-light">{item.title}</p>
              </div>
              <div className="w-4/12">
                <Button
                  className="float-right rounded-full"
                  onClick={event => this.handleDeleteCart(item.id, cartItem)}
                >
                  <Icon type="delete" />
                </Button>
              </div>
            </div>
          </Menu.Item>
        )
      );

    return <div>{results}</div>;
  }
}

const mapStateToProps = state => ({
  ...state.books
});

const mapDispatchToProps = dispatch => ({
  addCart: item => dispatch(Action.addToCart(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartContent);
