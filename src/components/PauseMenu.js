import React, { Component } from "react";
import Play from "../assets/play.svg";
import Restart from "../assets/restart.svg";
import X from "../assets/x.svg";

export default class PauseMenu extends Component {
  render() {
    return (
      <div>
        <div style={style.shape}>
          <div className="mt-4 ml-4" style={style.tulisanSatu}>
            Mencocokkan objek
          </div>
          <div className="ml-5" style={style.tulisanDua}>
            Temukan objek yang berpasangan
          </div>
          <div className="mt-4 mr-5">
            <div className="container">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-4">
                    <image src={Play}></image>
                  </div>
                  <div className="col-md-4">
                    <image src={Restart}></image>
                  </div>
                  <div className="col-md-4">
                    <image src={X}></image>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const style = {
  shape: {
    width: "511px",
    height: "283px",

    background: "#EFFFF0",
    borderRadius: "40px",

    padding: "5px",
    paddingLeft: "60px"
  },

  tulisanSatu: {
    fontFamily: "Carter One",
    fontSize: "35px",

    color: "#000000"
  },

  tulisanDua: {
    fontFamily: "Roboto",
    fontSize: "18px"
  }
};
