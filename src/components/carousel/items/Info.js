import React, { Component } from "react";
import "../carouselStyle.css";
import Description from "./Description";
import SeeBook from "./SeeBook";

class BookInfo extends Component {
  render() {
    const textColor = "#FFFFFF";
    return (
      <div className="Info">
        <h1>{this.props.titel}</h1>
        <p className="Author">by {this.props.author.name}</p>
        <Description></Description>
        <SeeBook color={this.props.color}></SeeBook>
      </div>
    );
  }
}

export default BookInfo;
