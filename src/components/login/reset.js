import React, { Component } from "react";
import { connect } from "react-redux";
import * as Action from "../../data/actions/action-type";
import { openMessage } from "../message/Message";
import { withRouter } from "react-router";

class ResetPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }
  sendMailVerify = () => {
    this.props.handleLogin(this.state.email);
  };

  componentDidUpdate = () => {
    if (this.props.isSuccess) {
      openMessage("Gửi tin nhắn thành công vui lòng kiểm tra hộp thư");
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <form className="w-full max-w-sm shadow-2xl p-2 mx-auto my-auto border bg-white rounded ">
        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-600  md:text-left font-semibold mb-1 md:mb-0 pl-4"
              htmlFor="inline-full-name"
            >
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              name="Email"
              defaultValue=""
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              placeholder="Email của bạn"
            />
          </div>
        </div>
        <div className="md:flex md:items-center md:justify-center">
          <div className="md:w-3/3">
            <div className="flex justify-center">
              <button
                className="mb-4 shadow bg-blue-400 hover:bg-blue-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={this.sendMailVerify}
              >
                Gửi xác nhận
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  handleLogin: email => dispatch(Action.sendEmailResetPassword(email))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResetPass)
);
