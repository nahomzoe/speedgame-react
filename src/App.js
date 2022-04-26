import React, { Component } from "react";

import Button from "./components/Button";
import Circle from "./components/Circle";
import GameOver from "./components/GameOver";
import startMusic from "./assets/sounds/gameon.wav";
import stopMusic from "./assets/sounds/gameover.mp3";
import click from "./assets/sounds/click.wav";

import { circles } from "./circles";

let clickSound = new Audio(click);
let startSound = new Audio(startMusic);
let stopSound = new Audio(stopMusic);

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    current: -1,
    showGameOver: false,
    pace: 1500,
    rounds: 0,
    gameOn: false,
  };

  timer = undefined;

  clickPlay = () => {
    if (clickSound.paused) {
      clickSound.play();
    } else {
      clickSound.currentTime = 0;
    }
  };

  clickHandler = (i) => {
    this.clickPlay();
    if (this.state.current !== i) {
      this.stopHandler();
      return;
    }

    console.log("clickHandler, circle number:", i);
    this.setState({
      score: this.state.score + 10,
      rounds: this.state.rounds - 1,
    });
  };

  nextCircle = () => {
    if (this.state.rounds >= 3) {
      this.stopHandler();
      return;
    }
    let nextActive;

    do {
      nextActive = getRndInteger(0, 3);
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1,
    });
    //console.log("rounds", this.state.rounds);
    //console.log("active circle:", this.state.current);

    this.timer = setTimeout(this.nextCircle, this.state.pace);
  };

  startHandler = () => {
    startSound.play();
    startSound.loop = true;
    this.nextCircle();
    this.setState({ gameOn: true });
  };
  stopHandler = () => {
    stopSound.play();
    startSound.play();
    clearTimeout(this.timer);
    this.setState({ showGameOver: true, gmaeOn: false });
  };

  closeHandler = () => {
    window.location.reload();
    this.setState({
      showGameOver: false,
      score: 0,
      current: -1,
    });
  };

  render() {
    let message = "";
    if (this.props.score <= 50) {
      message = "You can do better";
    } else if (this.props.score >= 51 && this.props.score <= 100) {
      message = "Pretty good";
    } else {
      message = "WOW";
    }

    return (
      <div>
        <h1>Speedgame</h1>
        <h2>Your score: {this.state.score}</h2>
        <div className="circles">
          {circles.map((_, i) => (
            <Circle
              key={i}
              id={i}
              click={() => this.clickHandler(i)}
              active={this.state.current === i}
              disabled={this.state.gameOn}
            />
          ))}
        </div>
        <div>
          {!this.state.gameOn && (
            <Button click={this.startHandler}>START</Button>
          )}
          {this.state.gameOn && <Button click={this.stopHandler}>STOP</Button>}
        </div>
        {this.state.showGameOver && (
          <GameOver
            click={this.closeHandler}
            score={this.state.score}
            message={this.state.message}
          />
        )}
      </div>
    );
  }
}

export default App;
