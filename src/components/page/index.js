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
        <div className="flex flex-col min min-h-screen">
          {this.props.content && this.props.content}
        </div>
      </div>
    );
  }
}
export default Page;
