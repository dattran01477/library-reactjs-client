import React, { Component } from "react";
import "./bookStyle.css";

class BookCover extends Component {
  render() {
    return (
      <div className="BookCover">
        <img src={this.props.img} alt="abc"/>
      </div>
    );
  }
}

export default BookCover;
