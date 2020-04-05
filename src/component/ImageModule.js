import React from 'react';
import ImgCard from './ImgCard';
import ZoomIn from './ZoomIn';
import '../css/ImageModule.css';

class ImageModule extends React.Component{
    state = {
        image:null,
        imageCount:0,
    }
   
    zoomin = (image) => {
        this.setState({image});
    }
    closeZoom = (e) => {
        const target = e.target.className;

        if(target === "zoom-contanier"){
            this.setState({image:null});
        }
    }
    clearImg = () =>{
        this.props.clearImgFiles();
    }
    batchDownlod = async () => {
        let checkedImg = document.querySelectorAll("a input[type='checkbox']:checked");
        if(checkedImg.length){
            for(let i = 0; i< checkedImg.length; i++){
                checkedImg[i].closest("a").click();
                if(i%10 === 0){
                    await new Promise(resolve => {                    
                        setTimeout(() => {resolve();},1000);
                    })
                }
            }
        }
    }
    selectAll = (e) => {
        let images = document.querySelectorAll("a input[type='checkbox']");

        images.forEach(image => {
            image.checked = e.target.checked;
        })
    }
    countSelectImg = (e) => {
        if(e.target.type === 'checkbox'){
            const imageCount = document.querySelectorAll(".img-check:checked").length;
            this.setState({imageCount});
        }
    }
    render(){
        const {image,imageCount} = this.state;
        const {files} = this.props;
        return(
            <div className="container img-module" onClick={this.countSelectImg}>
                <div className="img-head">
                    <p className="img-count">Found {files.length} images</p>
                    {
                        files.length?
                            <>  
                                <br/>
                                <label className="selectall">
                                    <input type="checkbox" onClick={this.selectAll}/>
                                    Select all images
                                </label>
                                <br/>
                                <button className="download" onClick={this.batchDownlod}>download {imageCount} image</button>
                                <button className="clear" onClick={this.clearImg}>clear</button>
                            </>:null
                    }
                </div>
                <div className="img-body">
                {
                    files.map((file, index) => (
                        <ImgCard key={index} url={file} index={index} zoomin={this.zoomin}/>
                    ))
                }
                </div>
                {
                    image ? <ZoomIn image={image} closeZoom={this.closeZoom}/> : null
                }
            </div>
        )
    }
}

export default ImageModule;