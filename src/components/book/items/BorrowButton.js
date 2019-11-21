import React, { Component } from "react";
import "./bookStyle.css";
import { connect } from "react-redux";
import { AddTempCart, fetchBooksObjectCart, resetBooksObjectCart } from "../../../data/actions/cart";
import { callApiAsPromise } from "../../../api";

class BrrowButton extends Component {
    initBookCartObject() {
        this.props.resetBooksObjectCart();
        console.log("Hello"+ this.props.tempCart);
        this.props.tempCart.map(idBook => {
            this.getBookByCriteria(idBook);
        })
    }
    getBookByCriteria = (id) => {
        let x = "books/" + id;
        callApiAsPromise("GET", x, null, null)
            .then(res => {
                this.setState({ isLoading: false });
                this.props.fetchBooksObjectCart(res.data);
            })
            .catch(err => {
                alert(err);
            });
    };
    onClickBorrow = (e) => {
        e.preventDefault();
        this.props.addTemCart(this.props.idBook);
        this.initBookCartObject();
        
    }
    render() {
        return (
            <div>

                <button onClick={this.onClickBorrow} className="BorrowBtn btn btn-primary" >
                    + Borrow
    </button>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        tempCart: state.tempCart
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addTemCart: (data) => {
            dispatch(AddTempCart(data))
        },
        fetchBooksObjectCart: (data) => {
            dispatch(fetchBooksObjectCart(data))
        },
        resetBooksObjectCart: () => {
            dispatch(resetBooksObjectCart())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BrrowButton)
