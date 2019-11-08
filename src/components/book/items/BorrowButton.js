import React, { Component } from "react";
import "./bookStyle.css";
import { connect } from "react-redux";
import { AddTempCart } from "../../../data/actions/cart";

class BrrowButton extends Component {
    onClickBorrow = (e)=>{
        this.props.addTemCart("123");
        e.preventDefault();  
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BrrowButton)
