import React, { Component } from "react";

import Sphere from "../components/Sphere";
import Cone from "../components/Cone";
import UglyPyramid from "../components/UglyPyramid";
import Pyramid from "../components/Pyramid";
import Cylinder from "../components/Cylinder";
import Prism from "../components/Prism";
import Cuboid from "../components/Cuboid";
import Cube from "../components/Cube";
import HexagonalPrism from "../components/HexagonalPrism";

import GameHeader from "../components/GameHeader";

import colors from "../assets/colors";

export default class FindThePairs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      choices: [],
      pair: [],
      isClicked: false,
      isCorrect: false
    };

    this.objects = [
      <Sphere />,
      <Cone />,
      <UglyPyramid />,
      <Pyramid />,
      <Cylinder />,
      <Prism />,
      <Cube />,
      <Cuboid />,
      <HexagonalPrism />
    ];
  }

  componentDidMount() {
    this.getChoices();
  }

  getRandomId = arr => {
    const id = Math.floor(Math.random() * arr.length);
    return id;
  };

  getObject = (objectId, colorId) => {
    const obj = [
      <Sphere color={colors[colorId].code} />,
      <Cone color={colors[colorId].code} />,
      <UglyPyramid color={colors[colorId].code} />,
      <Pyramid color={colors[colorId].code} />,
      <Cylinder color={colors[colorId].code} />,
      <Prism color={colors[colorId].code} />,
      <Cube color={colors[colorId].code} />,
      <Cuboid color={colors[colorId].code} />,
      <HexagonalPrism color={colors[colorId].code} />
    ];
    return obj[objectId];
  };

  getChoices = () => {
    // generate pilihan jawaban benar
    let rightChoices = [...Array(3)].map(x => {
      return {
        object: this.getRandomId(this.objects),
        color: this.getRandomId(colors),
        click: this.state.isClicked,
        correct: this.state.isCorrect
      };
    });

    // cek pilihan jawaban benar
    let rightChoicesNotPassed = true;
    while (rightChoicesNotPassed) {
      for (let i = 0; i < rightChoices.length; i++) {
        for (let j = 0; j < rightChoices.length; j++) {
          if (i !== j) {
            if (
              rightChoices[i].object === rightChoices[j].object &&
              rightChoices[i].color === rightChoices[j].color
            ) {
              rightChoices = rightChoices.map(x => {
                return {
                  object: this.getRandomId(this.objects),
                  color: this.getRandomId(colors),
                  click: this.state.isClicked,
                  correct: this.state.isCorrect
                };
              });
            } else {
              rightChoicesNotPassed = false;
            }
          }
        }
      }
    }

    // duplikasi pilihan jawaban benar
    const rightChoices2 = rightChoices.map(object => ({ ...object }));
    rightChoices = [...rightChoices, ...rightChoices2];

    // generate pilihan jawaban salah
    let wrongChoices = [...Array(6)].map(x => {
      return {
        object: this.getRandomId(this.objects),
        color: this.getRandomId(colors),
        click: this.state.isClicked,
        correct: this.state.isCorrect
      };
    });

    // cek pilihan jawaban benar
    let wrongChoicesNotPassed1 = true;
    let wrongChoicesNotPassed2 = true;
    while (wrongChoicesNotPassed1 || wrongChoicesNotPassed2) {
      for (let i = 0; i < rightChoices.length; i++) {
        for (let j = 0; j < rightChoices.length; j++) {
          if (i !== j) {
            if (
              rightChoices[i].object === wrongChoices[j].object &&
              rightChoices[i].color === wrongChoices[j].color
            ) {
              wrongChoices = wrongChoices.map(x => {
                return {
                  object: this.getRandomId(this.objects),
                  color: this.getRandomId(colors),
                  click: this.state.isClicked,
                  correct: this.state.isCorrect
                };
              });
            } else {
              wrongChoicesNotPassed1 = false;
            }
          }
        }
      }
      for (let i = 0; i < wrongChoices.length; i++) {
        for (let j = 0; j < wrongChoices.length; j++) {
          if (i !== j) {
            if (
              wrongChoices[i].object === wrongChoices[j].object &&
              wrongChoices[i].color === wrongChoices[j].color
            ) {
              wrongChoices = wrongChoices.map(x => {
                return {
                  object: this.getRandomId(this.objects),
                  color: this.getRandomId(colors),
                  click: this.state.isClicked,
                  correct: this.state.isCorrect
                };
              });
            } else {
              wrongChoicesNotPassed2 = false;
            }
          }
        }
      }
    }

    // penggabungan pilihan jawaban salah & benar
    let hasil = [...rightChoices, ...wrongChoices];

    // acak posisi pilihan jawaban
    // const choices = [...hasil].sort(() => Math.random() - 0.5);
    const choices = hasil;

    this.setState({ choices });
  };

  clicked = index => {
    let choicesUpdate = this.state.choices;
    let pair = this.state.pair;
    if (this.state.choices[index].click === false) {
      choicesUpdate[index].click = true;
      if (pair.length < 2) {
        if (pair.length === 0) {
          pair = [...pair, index];
        } else {
          for (let i = 0; i < pair.length; i++) {
            if (pair[i] !== index) {
              pair = [...pair, index];
            }
          }
          console.log(pair);

          if (
            choicesUpdate[pair[0]].color === choicesUpdate[pair[1]].color &&
            choicesUpdate[pair[0]].object === choicesUpdate[pair[1]].object
          ) {
            console.log("benar");
            choicesUpdate[pair[0]].correct = true;
            choicesUpdate[pair[1]].correct = true;
          } else {
            console.log("salah");
          }
        }
      } else {
        pair = [index];

        //all clik is null
        choicesUpdate = choicesUpdate.map(item => {
          item.click = false;
          return item;
        });

        choicesUpdate[index].click = true;
      }

      this.setState({ pair }); //akhir

      this.setState({ choices: choicesUpdate }, () =>
        console.log(this.state.choices)
      );
    } else if (this.state.choices[index].click === true) {
      choicesUpdate[index].click = false;
      this.setState({ choices: choicesUpdate }, () =>
        console.log(this.state.choices)
      );
    }
  };

  render() {
    // console.log("gameinfo ftp:", this.props.gameInfo);
    // console.log(this.state.choices);

    return (
      <div className="container-fluid p-0">
        {this.props.gameInfo == null ? null : (
          <GameHeader
            gameInfo={this.props.gameInfo}
            onTimeOut={this.props.onTimeOut}
            paused={this.props.paused}
            onPause={this.props.onPause}
            ref={this.headerRef}
          />
        )}
        <div className="container text-center m-0 p-0">
          <h2 style={styles.text}>Temukan objek yang berpasangan</h2>
          <div className="row">
            {this.state.choices.map((item, index) => {
              let component = null;
              if (index < 4) {
                component = (
                  <div className="col-md-3" key={index}>
                    <div className="row">
                      <div className="col"></div>
                      <div
                        className="col-auto aks-btn"
                        style={
                          !item.click
                            ? styles.borderNotClick
                            : this.state.pair.length === 1
                            ? styles.borderDefault
                            : item.correct
                            ? styles.borderTrue
                            : styles.borderFalse
                        }
                        onClick={() => this.clicked(index)}
                      >
                        {this.getObject(item.object, item.color)}
                      </div>
                      <div className="col"></div>
                    </div>
                  </div>
                );
              } else {
                component = null;
              }
              return component;
            })}
          </div>
          <div className="row mt-5">
            {this.state.choices.map((item, index) => {
              let component = null;

              if (index < 8 && index >= 4) {
                component = (
                  <div className="col-md-3" key={index}>
                    <div className="row">
                      <div className="col"></div>
                      <div
                        className="col-auto aks-btn"
                        style={
                          !item.click
                            ? styles.borderNotClick
                            : this.state.pair.length === 1
                            ? styles.borderDefault
                            : item.correct
                            ? styles.borderTrue
                            : styles.borderFalse
                        }
                        onClick={() => this.clicked(index)}
                      >
                        {this.getObject(item.object, item.color)}
                      </div>
                      <div className="col"></div>
                    </div>
                  </div>
                );
              } else {
                component = null;
              }
              return component;
            })}
          </div>
          <div className="row mt-5">
            {this.state.choices.map((item, index) => {
              let component = null;
              if (index < 12 && index >= 8) {
                component = (
                  <div className="col-md-3" key={index}>
                    <div className="row">
                      <div className="col"></div>
                      <div
                        className="col-auto aks-btn"
                        style={
                          !item.click
                            ? styles.borderNotClick
                            : this.state.pair.length === 1
                            ? styles.borderDefault
                            : item.correct
                            ? styles.borderTrue
                            : styles.borderFalse
                        }
                        onClick={() => this.clicked(index)}
                      >
                        {this.getObject(item.object, item.color)}
                      </div>
                      <div className="col"></div>
                    </div>
                  </div>
                );
              } else {
                component = null;
              }
              return component;
            })}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  text: {
    fontWeight: "normal",
    fontFamily: "Carter One",
    color: "#1D1D1D",
    marginBottom: "75px"
  },
  borderTrue: {
    padding: "15px",
    border: "green solid",
    margin: "0px 35px",
    backgroundColor: "#000"
  },
  borderFalse: {
    padding: "15px",
    border: "red solid",
    margin: "0px 35px"
  },
  borderDefault: {
    padding: "15px",
    border: "black solid",
    margin: "0px 35px"
  },
  borderNotClick: {
    padding: "15px",
    border: "none",
    margin: "0px 35px"
  }
};
