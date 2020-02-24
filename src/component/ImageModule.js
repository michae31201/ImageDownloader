import React from 'react';
import ImgCard from './ImgCard';
import ZoomIn from './ZoomIn';
import '../css/ImageModule.css';

class ImageModule extends React.Component{
    state = {
        image:null,
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

    render(){
        const {image} = this.state;
        const {files} = this.props;
        return(
            <div className="container img-module">
                <div className="img-head">
                    <p className="img-count">Found {files.length} images</p>
                    {
                        files.length?
                            <button className="clear" onClick={this.clearImg}>clear</button>:null
                    }
                </div>
                <div className="img-body">
                {
                    files.map((file, index) => (
                        <ImgCard key={index} url={file} zoomin={this.zoomin}/>
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