import React from "react";
import fetchUrl from "../utils/fetchUrl";
import parseResToDom from "../utils/parseResToDom";
import ShowIMG from "./ShowIMG";
import toBlob from "../utils/toBlob";
import "../css/App.css";

class App extends React.Component {
  state = {
    url: "https://www.jkforum.net/thread-10880560-1-1.html",
    tag: "img",
    attribute: "file",
    imgtype: "jpg",
    files: []
  };

  setUrl = e => {
    let url = e.target.value;
    this.setState({ url });
  };
  setSearchTag = e => {
    let tag = e.target.value;
    this.setState({ tag });
  };
  setSearchAttr = e => {
    let attribute = e.target.value;
    this.setState({ attribute });
  };
  setImgType = e => {
    let tag = e.target.value;
    this.setState({ tag });
  };
  useAdvance = e => {
    this.setState(prevState => ({
      advance: !prevState.advance
    }));
  };
  submit = async () => {
    const { url, tag, attribute, imgtype } = this.state;
    if (url) {
      let responseTxt = await fetchUrl(url);
      let nodes = await parseResToDom(responseTxt, tag, attribute, imgtype);
      let files = await toBlob(nodes);

      this.setState({ files });
    }
  };
  clear = () => {
    const { files } = this.state;
    files.forEach(file => {
      window.URL.revokeObjectURL(file);
    });
    this.setState({ url: "", files: [] });
  };
  render() {
    const { url, tag, attribute, imgtype, files } = this.state;
    return (
      <div className="App">
        <div className="input-wrapper">
          <input
            type="text"
            className="url"
            id="input_url"
            value={url}
            onChange={this.setUrl}
          />
          <br />
          <input
            type="text"
            className="setting"
            id="search_tag"
            value={tag}
            onChange={this.setSearchTag}
          />
          <input
            type="text"
            className="setting"
            id="search_attr"
            value={attribute}
            onChange={this.setSearchAttr}
          />
          <input
            type="text"
            className="setting"
            id="img_type"
            value={imgtype}
            onChange={this.setImgType}
          />
          <br />
          <button onClick={this.submit}>submit</button>
          <button onClick={this.clear}>clear</button>
          {/* <div>
            <label>PTT</label>
            <label>JKF</label>
         </div>*/}
        </div>
        <div className="img-wrapper">
          <div className="img-count">Found {files.length} images</div>
          <div className="img-group">
            {files.map((file, index) => (
              <ShowIMG key={index} url={file} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;