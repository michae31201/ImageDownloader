import React from "react";
import "../css/ZoomIn.css";

const ZoomIn = ({ closeZoom, url }) => {
  return (
    <div className="zoom-contanier" tabIndex="0" role="button" onClick={closeZoom} onKeyPress={closeZoom}>
      <img className="zoom-image" src={url} alt="" />
    </div>
  );
};

export default ZoomIn;
