import React from "react";

const GameOver = (props) => {
  return (
    <div className="overlay">
      <div className="gameover_box">
        <h2>Your score is:{props.score}</h2>
        <p>{props.message}</p>
        <button onClick={props.click}>X</button>
      </div>
    </div>
  );
};

export default GameOver;
