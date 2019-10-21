import React, { Component } from "react";

import GameHeader from "../components/GameHeader";
import FindThePairs from "../components/FindThePairs";
import ColorCodes from "../components/ColorCodes";
import CountTheObject from "../components/CountTheObject"
import ShapeAndPattern from "../components/ShapeAndPattern";
import PauseMenu from "../components/PauseMenu";
import ExitGameCon from "../components/ExitGameConfirm";
import RestartGameCon from "../components/RestartGameConfirm";
import Score from "../components/Score";

export default class GamePlay extends Component {
  state = {
    score: 15,
    paused: false,
    exitDialogVisible: false,
    pauseDialogVisible: false,
    restartDialogVisible: false,
    scoreDialogVisible: false,
    title: "Find the Pairs",
    questionOnPause : "Temukan objek yang berpasangan",

    game: "findThePairs"
  };

  onPause = () => {
    this.setState({ paused: true, pauseDialogVisible: true });
  };

  onExit = () => {
    this.setState({
      paused: true,
      exitDialogVisible: true,
      pauseDialogVisible: false
    });
  };

  onRestart = () => {
    this.setState({
      paused: true,
      restartDialogVisible: true,
      pauseDialogVisible: false
    });
  };

  onPlay = () => {
    this.setState({ paused: false, pauseDialogVisible: false });
  };

  onBack = () => {
    this.setState({
      paused: true,
      exitDialogVisible: false,
      pauseDialogVisible: true
    });
  };

  onBack2 = () => {
    this.setState({
      paused: true,
      restartDialogVisible: false,
      pauseDialogVisible: true
    });
  }

  onFinish = () => {
    this.setState(
      {
        paused: true,
        scoreDialogVisible: true
      }
    )
  }

  getGame = () => {
    let gameComponent;
    switch (this.state.game) {
      case "findThePairs":
        gameComponent = (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "85%" }}
          >
            <FindThePairs />
          </div>
        );
        break;
      case "shapeAndPattern":
        gameComponent = <ShapeAndPattern />;
        break;
      case "colorCodes":
        gameComponent = (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "85%" }}
          >
            <ColorCodes />
          </div>
        );
        break;
        case "countObject":
        gameComponent = (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "85%" }}
          >
            <CountTheObject />
          </div>
        );
        break;

      default:
        gameComponent = null;
        break;
    }
    return gameComponent;
  };

  render() {
    return (
      <div>
        <PauseMenu
          show={this.state.pauseDialogVisible}
          questionOnPause={this.state.questionOnPause}
          title={this.state.title}
          onPlay={this.onPlay}
          onExit={this.onExit}
          onRestart={this.onRestart}
        />
        <Score
          show={this.state.scoreDialogVisible}

        />
        <ExitGameCon show={this.state.exitDialogVisible} onBack={this.onBack} referensi="/Menu"/>
        <RestartGameCon show={this.state.restartDialogVisible} onBack={this.onBack2} />
        <div
          className={`container-fluid p-0 ${
            this.state.paused ? "aks-blur" : "aks-nonblur"
          }`}
          style={styles.wrapper}
        >
          <GameHeader
            score={this.state.score}
            title={this.state.title}
            onTimeOut={() => alert("Time Out")
            // , this.onFinish
          }
            paused={this.state.paused}
            onPause={() => {
              this.onPause();
            }}
          />
          <div className="text-center">
            <button
              className="btn btn-success btn-lg m-1"
              onClick={() => this.setState({ 
                game: "findThePairs", 
                title: "Find the Pairs",
                questionOnPause: "Temukan objek yang berpasangan"  
              })}
            >
              Find The Pairs
            </button>
            <button
              className="btn btn-success btn-lg m-1"
              onClick={() => this.setState({ 
                game: "shapeAndPattern", 
                title: "Shape and Pattern", 
                questionOnPause : "Temukan bentuk, warna, dan pola"
              })}
            >
              Shape And Pattern
            </button>
            <button
              className="btn btn-success btn-lg m-1"
              onClick={() => this.setState({ 
                game: "colorCodes", 
                title: "Color Codes",
                questionOnPause : "Pilih warna yang sesuai dengan tulisannya"
               })}
            >
              Color Codes
            </button>
            <button
              className="btn btn-success btn-lg m-1"
              onClick={() => this.setState({ 
                game: "countObject", 
                title: "Count The Object",
                questionOnPause: "Hitung jumlah burung yang ada pada gambar"
              })}
            >
              Count The Object
            </button>
          </div>

          {this.getGame()}
        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    backgroundColor: "#FFEBD2",
    height: "100vh",
    transition: "filter 0.5s ease"
  }
};
