import React from "react";
import "../css/ImgCard.css";
import zoomInIcon from "../image/zoom-in.png";

class ImgCard extends React.Component {
  //= ({ url, index, setZoomInImg }) => {
  /* componentWillUnmount(){
    const {url} = this.props;
    window.URL.revokeObjectURL(url);
  } */
  state = {
    imgHref: "",
  };

  async componentDidMount() {
    const { url } = this.props;
    const response = await fetch(`/.netlify/functions/fetchImage?site=${url}`);
    const fileBlob = await response.blob();
    const imgHref = window.URL.createObjectURL(fileBlob);
    this.setState({ imgHref });
  }

  componentWillUnmount() {
    const { imgHref } = this.state;
    window.URL.revokeObjectURL(imgHref);
  }

  zoomInHandler = (e) => {
    const { setZoomInImg, url } = this.props;
    e.stopPropagation();
    e.preventDefault();
    setZoomInImg(url);
  };

  render() {
    const { url, index } = this.props;
    const { imgHref } = this.state;
    return (
      <div className="img-card">
        <a href={imgHref} download={`image${index + 1}`}>
          <input type="checkbox" className="img-check" />
          <img
            className="lazy"
            data-src={url}
            alt={index + 1}
            loading="lazy"
            title={`click to download image${index + 1}`}
          />
          <div
            className="zoom-in"
            tabIndex="0"
            role="button"
            onClick={this.zoomInHandler}
            onKeyPress={this.zoomInHandler}
          >
            <img src={zoomInIcon} alt="zoom-in-img" title="zoom in" />
          </div>
        </a>
      </div>
    );
  }
}

export default ImgCard;
