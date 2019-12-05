import React, { Component } from "react";
import Background from "../../assets/img/background/login.png";
import { Button } from "antd";
import * as Action from "../../data/actions/auth/auth.action";
import { connect } from "react-redux";
import queryString from "query-string";
import { withRouter } from "react-router";
import { openMessage } from "../message/Message";
import decode from "jwt-decode";
const sectionStyle = {
  width: "100%",
  backgroundImage: `url(${Background})`
};

class ResetPassForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: null,
      password: "",
      confirmPassword: ""
    };
  }

  isSubmit = () => {
    return this.state.password === this.state.confirmPassword;
  };

  onSubmit = () => {
    this.props.handleChangePassWord(this.state.idUser, this.state.password);
  };

  getIdToken = token => {
    try {
      const decoded = decode(token);
      return decoded.id;
    } catch (err) {
      return null;
    }
  };

  componentDidMount() {
    let query = queryString.parse(this.props.location.search);
    let idUserReset = this.getIdToken(query.token);
    if (idUserReset == null) {
      openMessage("Token trả về bị sai!");
      this.props.push.history("/login");
    } else {
      console.log(idUserReset);
      this.setState({ ...this.state, idUser: idUserReset });
    }
  }
  render() {
    return (
      <div className="w-full h-screen p-16 object-cover" style={sectionStyle}>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            name="Email"
            defaultValue=""
            value={this.state.password}
            onChange={e =>
              this.setState({ ...this.state, password: e.target.value })
            }
            placeholder="Mật khẩu của bạn"
          />
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            name="Email"
            defaultValue=""
            value={this.state.confirmPassword}
            onChange={e =>
              this.setState({ ...this.state, confirmPassword: e.target.value })
            }
            placeholder="Nhập lại mật khẩu"
          />
        </div>
        <Button
          type="danger"
          disabled={!this.isSubmit()}
          onClick={this.onSubmit}
        >
          Thay đổi mật khẩu
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  handleChangePassWord: (id, password) =>
    dispatch(Action.ChangePassword(id, password))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResetPassForm)
);
