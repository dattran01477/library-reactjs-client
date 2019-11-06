import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { callApiAsPromise } from "../../api";

export class BookCardContainer extends Component {
  render() {
    return (
      <div className="container">
        <div class=" rounded overflow-hidden shadow-lg">
          <div class="px-6 py-4">
            {(this.props.header && this.props.header) || "Header"}
            {this.props.description && this.props.description}
          </div>
          <div className="flex flex-col ">
            {this.props.content && this.props.content}
          </div>
        </div>
      </div>
    );
  }
}
export default BookCardContainer;
