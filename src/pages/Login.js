import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Background from "../assets/Background.svg";
import Logo from "../assets/logoAkson.svg";
import Boy from "../assets/loginBoy.svg";

import LoginBox from "../components/LoginBox";

export default class Login extends Component {
  render() {
    return (
      <div style={style.bgStyle}>
        <div className="container-fluid h-100">
          <div className="row align-items-center h-100">
            <img src={Logo} alt="logoAkson" style={style.logoStyle}></img>
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12" style={style.boyStyle}>
                  <img src={Boy} alt="loginBoy"></img>
                </div>

                <div className="col-md-12" style={{ position: "absolute" }}>
                  <div className="row">
                    <div className="col"></div>
                    <LoginBox />
                    <div className="col"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const style = {
  bgStyle: {
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${Background})`,
    height: "100vh",
    fontFamily: "Carter One",
    backgroundSize: "100% auto"
  },
  boyStyle: {
    textAlign: "center"
  },
  logoStyle: {
    right: 30,
    top: 30,
    position: "absolute"
  }
};
