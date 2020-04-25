import React from "react";
import "../css/InputModule.css";

class InputModule extends React.Component {
  state = {
    url: "",
    tag: "img",
    attr: "src",
    type: "jpg",
  };

  inputHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  submit = () => {
    const { url, tag, attr, type } = this.state;
    const { getImgFiles } = this.props;

    if (url && tag && attr && type) {
      getImgFiles(this.state);
    }
  };

  render() {
    const { url, tag, attr, type } = this.state;
    return (
      <div className="container input-module">
        <input type="search" className="url" id="url" value={url} onChange={this.inputHandler} placeholder="Url" />
        <br />
        <input
          type="search"
          className="setting"
          id="tag"
          value={tag}
          onChange={this.inputHandler}
          placeholder="tag name"
        />
        <input
          type="search"
          className="setting"
          id="attr"
          value={attr}
          onChange={this.inputHandler}
          placeholder="tag attribute"
        />
        <input
          type="search"
          className="setting"
          id="type"
          value={type}
          onChange={this.inputHandler}
          placeholder="image type1,type2,..."
        />
        <br />
        <button type="button" className="submit" tabIndex="0" onClick={this.submit} onKeyPress={this.submit}>
          submit
        </button>
        {/* <button onClick={this.clear}>clear</button> */}
      </div>
    );
  }
}

export default InputModule;
