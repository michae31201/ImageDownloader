import React from "react";
import "../css/Loading.css";
import circle from "../image/loading-circle.png";

const Loading = ({ status }) => {
  return (
    <div className="loading">
      <img className="loading-circle" src={circle} alt="loagind-circle" />
      <span>{status}</span>
    </div>
  );
};

export default Loading;
