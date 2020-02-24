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

  componentDidUpdate(){
      const {files} = this.state;
      if(files.length){
        //使用 IntersectionObserver API，來達成image lazy loading
        //每當觀察的元素有變動就會觸發callback
        let observer = new IntersectionObserver(onEnterView);
        let nodes = document.querySelectorAll("img.lazy");
        for(let node of nodes){
          //將元素加入觀察
          observer.observe(node);
        }
        
        function onEnterView(entries,observer){
          for(let entry of entries){
            //isIntersecting為元素進入畫面就會是true
            if(entry.isIntersecting){
              const img = entry.target;
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        }
      }
  }

  fetchImgFiles = async ({url, tag, attr, type}) =>{
    this.setState({files:[],status:"開始抓取目標網頁..."});
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