import React, { Component } from "react";

import FindThePairs from "../components/FindThePairs";
import ColorCodes from "../components/ColorCodes";
import CountTheObject from "../components/CountTheObject";
import ShapeAndPattern from "../components/ShapeAndPattern";
import PauseMenu from "../components/PauseMenu";
import ExitGameCon from "../components/ExitGameConfirm";
import RestartGameCon from "../components/RestartGameConfirm";
import Score from "../components/Score";
import AppContext from "../context/AppContext";

class GamePlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paused: false,
      exitDialogVisible: false,
      pauseDialogVisible: false,
      restartDialogVisible: false,
      scoreDialogVisible: false,

      // 0 = findThePairs, 1 = CountTheObject, 2 = colorCodes, 3 = shapeAndPattern
      playing: null,

      game: [
        {
          id: 0,
          key: "findThePairs",
          name: "Find The Pairs",
          score: 0,
          totalTime: 30
        },
        {
          id: 1,
          key: "CountTheObject",
          name: "Count The Object",
          score: 0,
          totalTime: 30
        },
        {
          id: 2,
          key: "colorCodes",
          name: "Color Codes",
          score: 0,
          totalTime: 30
        },
        {
          id: 3,
          key: "shapeAndPattern",
          name: "Shape And Pattern",
          score: 0,
          totalTime: 30
        }
      ],

      wrongScore: 0,

      gameComponent: null
    };

    this.gameRef = React.createRef();
  }

  componentDidMount() {
    this.changeGame();
    this.context.setTicked(true);
  }

  onPause = () => {
    this.setState({ paused: true, pauseDialogVisible: true }, () =>
      console.log("state:", this.state)
    );
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
    this.context.setTicked(true);
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
  };

  onFinish = () => {
    this.setState({
      paused: true,
      scoreDialogVisible: true
    });
  };

  getGame = (gameId, game) => {
    console.log("gameid:", gameId);
    console.log("gamea:", game);

    const gameComponent = [
      <FindThePairs
        gameInfo={game[gameId]}
        onTimeOut={this.changeGame}
        paused={this.state.paused}
        onPause={this.onPause}
        addScore={() => this.addScore(gameId)}
        addWrongScore={this.addWrongScore}
        ref={this.gameRef}
      />,
      <CountTheObject
        gameInfo={game[gameId]}
        onTimeOut={this.changeGame}
        paused={this.state.paused}
        onPause={this.onPause}
        addScore={() => this.addScore(gameId)}
        addWrongScore={this.addWrongScore}
        ref={this.gameRef}
      />,
      <ColorCodes
        gameInfo={game[gameId]}
        onTimeOut={this.changeGame}
        paused={this.state.paused}
        onPause={this.onPause}
        addScore={() => this.addScore(gameId)}
        addWrongScore={this.addWrongScore}
        ref={this.gameRef}
      />,
      <ShapeAndPattern
        gameInfo={game[gameId]}
        onTimeOut={this.changeGame}
        paused={this.state.paused}
        onPause={this.onPause}
        addScore={() => this.addScore(gameId)}
        addWrongScore={this.addWrongScore}
        ref={this.gameRef}
      />
    ];
    this.setState({ gameComponent: gameComponent[gameId] });
  };

  changeGame = () => {
    if (this.state.playing == null) {
      this.setState({ playing: 0 }, () =>
        this.getGame(this.state.playing, this.state.game)
      );
    } else {
      if (this.state.playing < 3) {
        // this.headerRef.current.stopTick();
        this.setState({ playing: this.state.playing + 1 }, () =>
          this.getGame(this.state.playing, this.state.game)
        );
      } else {
        this.onFinish();
      }
    }
  };

  addScore = gameId => {
    let game = this.state.game;
    game[gameId].score++;

    this.setState({ game });
  };

  addWrongScore = () => {
    this.setState({ wrongScore: this.state.wrongScore + 1 });
  };

  render() {
    console.log("playing: ", this.state.playing);

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
        <Score show={this.state.scoreDialogVisible} />
        <ExitGameCon
          show={this.state.exitDialogVisible}
          onBack={this.onBack}
          referensi="/Menu"
        />
        <RestartGameCon
          show={this.state.restartDialogVisible}
          onBack={this.onBack2}
        />
        <div
          className={`container-fluid p-0 ${
            this.state.paused ? "aks-blur" : "aks-nonblur"
          }`}
          style={styles.wrapper}
        >
          {this.state.gameComponent}
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

GamePlay.contextType = AppContext;

export default GamePlay;
