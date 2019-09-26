import React, { Component } from "react";
import "./carouselStyle.css";
import Cover from "./items/Cover";
import Info from "./items/Info";

class BookCardCarousel extends Component {
  render() {
    return (
      <div className="BookCard" style={this.props.style}>
        <Cover img={this.props.bookInfo.bigImageLink}></Cover>
        <Info
          titel={this.props.bookInfo.name}
          author={this.props.bookInfo.author}
          rate={this.props.bookInfo.starTotal}
          color={this.props.dark}
          voters={[]}
        ></Info>
      </div>
    );
  }
}

export default BookCardCarousel;
