import React, { Component } from "react";
import { Icon } from "antd";

class Login extends Component {
  render() {
    return (
      <form className="w-full max-w-sm shadow-xl p-2">
        <label
          className="block font-bold text-blue-500 md:text-center text-3xl  md:mb-0 mb-4"
          htmlFor="inline-full-name"
        >
          Login
        </label>
        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Full Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              defaultValue="Jane Doe"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-username"
            >
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-username"
              type="password"
              placeholder="******************"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/3" />
          <label className="md:w-2/3 block text-gray-500 font-bold">
            <input className="mr-2 leading-tight" type="checkbox" />
            <span className="text-sm">Send me your newsletter!</span>
          </label>
        </div>
        <div className="md:flex md:items-center md:justify-center">
          <div className="md:w-3/3">
            <div className="flex justify-center"> 
              <button
                className="mb-4 shadow bg-blue-400 hover:bg-blue-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                Sign Up
              </button>
            </div>

            <div className="my-2 flex flex-row shadow bg-red-500 hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
              <span className="mx-2">
                <Icon type="google" />
              </span>
              <a href="https://restapilibrary.herokuapp.com/auth/google">
                <p>Login with google</p>
              </a>
            </div>
            <div className="my-2 flex flex-row shadow bg-blue-700 hover:bg-blue-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
              <span className="mx-2">
                <Icon type="facebook" />
              </span>
              <a>
                <p>Login with facebook</p>
              </a>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Login;
