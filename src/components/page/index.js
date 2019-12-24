import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";

export class Page extends Component {
  render() {
    return (
      <div class="ml-4 rounded  shadow-md">
        <div class="">
          {(this.props.header && this.props.header) || ""}
          {this.props.description && this.props.description}
        </div>
        <div className="flex flex-col p-4">
          {this.props.content && this.props.content}
        </div>
      </div>
    );
  }
}
export default Page;
