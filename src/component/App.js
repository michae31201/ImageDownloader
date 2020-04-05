import React from "react";
import InputModule from "./InputModule";
import ImageModule from "./ImageModule";
import Loading from "./Loading"
import getTargetHtml from '../utils/getTargetHtml';
import getImageUrls from '../utils/getImageUrls';
//import getBlobUrl from '../utils/getBlobUrl';
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

  getImgFiles = async ({url, tag, attr, type}) =>{
    this.setState({files:[],status:"開始抓取目標網頁..."});
    let htmlTXT = await getTargetHtml(url);
    this.setState({status:"網頁已獲取，開始抓取目標圖檔..."});
    let files = await getImageUrls(htmlTXT, tag, attr, type);
    this.setState({status:`${files.length} 個圖檔已獲取，轉換中...`});
    //let files = await getBlobUrl(nodes);
    
    this.setState({ 
      files,
      status:null,
     });      
  }
  clearImgFiles = () => {
    /*const { files } = this.state;
    files.forEach(file => {
      window.URL.revokeObjectURL(file);
    });*/
    this.setState({files: [] });
  }
  
  render() {
    const {files,status} = this.state;
    return (
      <div className="App">
        <InputModule getImgFiles = {this.getImgFiles}/>
        {
          status ? <Loading status = {status}/>:null
        }
        <ImageModule files = {files} clearImgFiles={this.clearImgFiles}/>        
      </div>
    );
  }
}

export default App;