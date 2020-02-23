import React from "react";
import InputModule from "./InputModule";
import ImageModule from "./ImageModule";
import Loading from "./Loading"
import fetchUrl from '../utils/fetchUrl';
import parseResToDom from '../utils/parseResToDom';
import toBlob from '../utils/toBlob';
import "../css/App.css";

class App extends React.Component {
  state = {
    files: [],
    status:null,
  };
  
  fetchImgFiles = async ({url, tag, attr, type}) =>{
    this.setState({status:"開始抓取目標網頁..."});
    let responseTxt = await fetchUrl(url);
    this.setState({status:"網頁已獲取，開始抓取目標圖檔..."});
    let nodes = await parseResToDom(responseTxt, tag, attr, type);
    this.setState({status:`${nodes.length} 個圖檔已獲取，轉換中...`});
    let files = await toBlob(nodes);
    
    this.setState({ 
      files,
      status:null,
     });
        
  }

  render() {
    const {files,status} = this.state;
    return (
      <div className="App">
        <InputModule fetchImgFiles = {this.fetchImgFiles}/>
        {
          status ? <Loading status = {status}/>:null
        }
        <ImageModule files = {files}/>        
      </div>
    );
  }
}

export default App;