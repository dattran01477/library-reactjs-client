import React, { Component } from "react";
// import Rate from "../../../sharedComponents/Rate";
import BookDescription from "./BookDescription";
import "./bookStyle.css";

class BookInfo extends Component {
  render() {
    return (
      <div className="BookInfo">
        <h1>{this.props.name}</h1>
        <BookDescription description={this.props.description}></BookDescription>
      </div>
    );
  }
}

export default BookInfo;
