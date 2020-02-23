import React from "react";
import InputModule from "./InputModule";
import ImageModule from "./ImageModule";
import fetchUrl from '../utils/fetchUrl';
import parseResToDom from '../utils/parseResToDom';
import toBlob from '../utils/toBlob';
import "../css/App.css";

class App extends React.Component {
  state = {
    files: []
  };
  
  fetchImgFiles = async ({url, tag, attr, type}) =>{
    let responseTxt = await fetchUrl(url);
    let nodes = await parseResToDom(responseTxt, tag, attr, type);
    let files = await toBlob(nodes);
    
    this.setState({ files });
        
  }
  

  render() {
    const {files} = this.state;
    return (
      <div className="App">
        <InputModule fetchImgFiles = {this.fetchImgFiles}/>        
        <ImageModule files = {files}/>        
      </div>
    );
  }
}

export default App;