import React, { Component } from "react";
import Logo from "../../assets/img/brand/argon-react.png";
import { Button } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as Action from "../../data/actions/action-type";
import { openMessage } from "../message/Message";

class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: "",
        password: "",
        confirmPassword: ""
      },
      isSuccess: false
    };
  }

  isSubmit = () => {
    return (
      this.state.form.password === this.state.form.confirmPassword &&
      this.state.form.username.length > 0 &&
      this.state.form.password.length > 0
    );
  };

  onSubmit = () => {
    this.props.handleRegister(this.state.form);
  };

  onChange = e => {
    let form = { ...this.state.form };
    form[e.target.name] = e.target.value;
    this.setState({ ...this.state, form: form });
  };

  componentDidUpdate = () => {
    if (this.props.isSuccess) {
      this.props.setIsSuccess(false);
      openMessage("Đăng ký thành công tài khoản, bạn hãy đăng nhập nào");
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <form className="w-full max-w-sm shadow-2xl p-2 mx-auto my-auto border bg-white rounded ">
        <div>
          <div className="flex flex-row">
            <img className="h-16 w-32 mx-auto" alt="logo" src={Logo} />
          </div>

          <label
            className="block font-bold text-gray-500 md:text-center text-xs  md:mb-0 mb-4"
            htmlFor="inline-full-name"
          >
            Hãy hoàn tất đăng ký, để trở thành thành viên của thư viện hcmute.
          </label>
        </div>

        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-600  md:text-left font-semibold mb-1 md:mb-0 pl-4"
              htmlFor="inline-full-name"
            >
              Tài khoản
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              name="username"
              value={this.state.form.username}
              onChange={this.onChange}
              defaultValue=""
              placeholder="Tên tài khoản"
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-600  md:text-left font-semibold mb-1 md:mb-0 pl-4"
              htmlFor="inline-full-name"
            >
              Mật khẩu
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              name="password"
              value={this.state.form.password}
              onChange={this.onChange}
              defaultValue=""
              placeholder="Mật khẩu"
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-600  md:text-left font-semibold mb-1 md:mb-0 pl-4"
              htmlFor="inline-full-name"
            >
              Xác nhận
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              name="confirmPassword"
              value={this.state.form.confirmPassword}
              onChange={this.onChange}
              defaultValue=""
              placeholder="xác nhận mật khẩu"
            />
          </div>
        </div>

        <div className="md:flex md:items-center md:justify-center">
          <div className="md:w-3/3">
            <div className="flex flex-row">
              <Button
                disabled={!this.isSubmit()}
                type="primary"
                onClick={this.onSubmit}
              >
                Đăng ký
              </Button>
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
  handleRegister: form =>
    dispatch(Action.register(form.username, form.password)),
  setIsSuccess: isSuccess => dispatch(Action.setIsSuccess(isSuccess))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(register)
);
