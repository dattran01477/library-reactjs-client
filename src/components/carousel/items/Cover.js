import React, { Component } from "react";
import "../carouselStyle.css";

class BookCover extends Component {
  render() {
    return (
      <div className="Cover">
        <img src={this.props.img} />
      </div>
    );
  }
}

export default BookCover;
