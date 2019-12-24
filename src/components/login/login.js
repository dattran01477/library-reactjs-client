import { Icon } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/brand/argon-react.png";
import * as Action from "../../data/actions/action-type";
import Keycloak from "keycloak-js";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: "",
        password: ""
      }
    };
  }

  onLogin = () => {
    this.props.handleLogin(this.state.form);
  };

  checkLogin=()=> {
    const keycloak = Keycloak("/keycloak.json");
    keycloak
      .init({ onLoad: "login-required", promiseType: "native" })
      .then(authentication => {
        if (authentication) {
          this.props.saveKeycloak(keycloak);
          this.props.exchangeAuthWithServer(keycloak.token);
        }
      });
  }

  onChange = event => {
    let formTmp = { ...this.state.form };
    formTmp[event.target.name] = event.target.value;
    this.setState({ form: formTmp });
  };
  render() {
    return (
      <form className="w-full max-w-sm shadow-2xl p-2 mx-auto my-auto border bg-white rounded ">
        <div>
          <img className="h-16 w-32 mx-auto" alt="logo" src={Logo} />
          <label
            className="block font-bold text-gray-500 md:text-center text-xs  md:mb-0 mb-4"
            htmlFor="inline-full-name"
          >
            Xin Chào, Mời Bạn Đăng Nhập
          </label>
        </div>
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
              name="username"
              defaultValue=""
              value={this.state.form.username}
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-600  md:text-left font-semibold mb-1 md:mb-0 pl-4"
              htmlFor="inline-username"
            >
              Mật Khẩu
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-username"
              type="password"
              name="password"
              placeholder="******************"
              value={this.state.form.password}
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3" />
          <label className="md:w-2/3 block text-gray-500 text-sm">
            <Link to="/login/resetpass">Bạn quên mật khẩu?</Link>
          </label>
        </div>
        <div className="md:flex md:items-center mb-2">
          <div className="md:w-1/3" />
          <label className="md:w-2/3 block text-gray-500 text-sm">
            <Link to="/login/register">Bạn chưa có tài khoản?</Link>
          </label>
        </div>
        <div className="md:flex md:items-center md:justify-center">
          <div className="md:w-3/3">
            <div className="flex justify-center">
              <button
                className="mb-4 shadow bg-blue-400 hover:bg-blue-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={this.onLogin}
              >
                Đăng Nhập
              </button>
            </div>

            <div className="my-2 flex flex-row shadow bg-red-500 hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
              <span className="mx-2">
                <Icon type="google" />
              </span>
              <a href="https://restapilibrary.herokuapp.com/auth/google">
                <p>Đăng Nhập Bằng Google</p>
              </a>
            </div>
            <div className="my-2 flex flex-row shadow bg-blue-700 hover:bg-blue-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
              <span className="mx-2">
                <Icon type="facebook" />
              </span>
              <a href="https://restapilibrary.herokuapp.com/auth/facebook">
                <p>Đăng Nhập Bằng Facebook</p>
              </a>
            </div>
            <div onClick={this.checkLogin} className="my-2 cursor-pointer flex flex-row shadow bg-gray-800 hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
              <span className="mx-2">
                <Icon type="key" />
              </span>
              <p>Đăng Nhập Bằng Keycloak</p>
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
  handleLogin: form => dispatch(Action.login(form))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
