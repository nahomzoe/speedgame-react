import React from "react";

const Circle = (props) => {
  return (
    <div
      style={{ PointerEvents: props.disabled ? "none" : "auto" }}
      className={`circle ${props.active ? "active" : ""}`}
      onClick={props.click}
    ></div>
  );
};

export default Circle;
