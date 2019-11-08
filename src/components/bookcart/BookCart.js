// import "bootstrap/dist/css/bootstrap.min.css";
// import React, { Component } from "react";
// import { Row } from "react-bootstrap";
// import { connect } from "react-redux";
// import { callApiAsPromise } from "../../api";
// import { actFetchBooks } from "../../data/actions/book";
// import { actFetchBooksCarousel } from "../../data/actions/book";
// import { ClapSpinner } from "react-spinners-kit";
// import {
//   Link,
//   useParams
// } from "react-router-dom";
// import { validate } from "@babel/types";
// import { AddTempCart, GetTempCart } from "../../data/actions/cart";
// export class BookCart extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: true,
//       bookCartLocal:[]
//     };
//   }
  
//   distinct = (value,index,self)=>{
//     return self.indexOf(value) ===index;
//   }
//   componentWillMount() {
//       let bookCartDistinct=this.props.bookCart.filter(this.distinct)
//       //console.log(bookCartDistinct);
//   }
  
//   render() {
//     const { isLoading } = this.state;
//     let bookCart=this.props.bookCart;
//     let bookItems=[];
//     bookCart.map(item=>{
//         bookItems.push(

//         )
//     })
//     return (
//       <h1>hihi</h1>
//     );
//   }
// }

// // const mapStateToProps = state => ({
// //   bookResults: state.bookResults
// // });
// const mapStateToProps = (state, ownProps) => {
//     return {
//         bookCard: state.tempCard
//     }
// }

// export default connect(
//   mapStateToProps
// )(BookCart);
