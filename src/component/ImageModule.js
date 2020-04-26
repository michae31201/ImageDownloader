import React from "react";
import ImgCard from "./ImgCard";
import ZoomIn from "./ZoomIn";
import "../css/ImageModule.css";

class ImageModule extends React.Component {
  state = {
    image: null,
    imageCount: 0,
  };

  setZoomInImg = (image) => {
    this.setState({ image });
  };

  closeZoom = (e) => {
    const target = e.target.className;

    if (target === "zoom-contanier") {
      this.setState({ image: null });
    }
  };

  clearImg = () => {
    const { clearImgFiles } = this.props;
    clearImgFiles();
  };

  batchDownlod = async () => {
    const checkedImg = document.querySelectorAll("a input[type='checkbox']:checked");
    if (checkedImg.length) {
      for (let i = 0; i < checkedImg.length; i += 1) {
        await Promise.all([checkedImg[i].closest("a").click(), this.timeOut(i)]);
      }
    }
  };

  timeOut = (s) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, s * 500);
    });
  };

  selectAll = (e) => {
    const images = document.querySelectorAll("a input[type='checkbox']");

    images.forEach((image) => {
      image.checked = e.target.checked;
    });
  };

  countSelectImg = (e) => {
    if (e.target.type === "checkbox") {
      const imageCount = document.querySelectorAll(".img-check:checked").length;
      this.setState({ imageCount });
    }
  };

  render() {
    const { image, imageCount } = this.state;
    const { files } = this.props;
    return (
      <div
        className="container img-module"
        tabIndex="0"
        role="button"
        onClick={this.countSelectImg}
        onKeyPress={this.countSelectImg}
      >
        <div className="img-head">
          <p className="img-count">
            Found &nbsp;
            {files.length}
            &nbsp; images
          </p>
          {files.length ? (
            <>
              <br />
              <label className="selectall" htmlFor="select-all">
                <input type="checkbox" id="select-all" onClick={this.selectAll} />
                Select all images
              </label>
              <br />
              <button type="button" className="download" onClick={this.batchDownlod}>
                download &nbsp;
                {imageCount}
                &nbsp; image
              </button>
              <button type="button" className="clear" onClick={this.clearImg}>
                clear
              </button>
            </>
          ) : null}
        </div>
        <div className="img-body">
          {files.map((file, index) => (
            <ImgCard key={file} url={file} index={index} setZoomInImg={this.setZoomInImg} />
          ))}
        </div>
        {image ? <ZoomIn url={image} closeZoom={this.closeZoom} /> : null}
      </div>
    );
  }
}

export default ImageModule;
