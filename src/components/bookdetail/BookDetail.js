import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Row } from "react-bootstrap";

import {  
  useParams
} from "react-router-dom";

export class BookDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let id = this.props.match.params.id
    console.log(id);
    return (
      <div>
      <h3>ID sách: {id}</h3>
    </div>
    );
  }
}



export default BookDetail;
