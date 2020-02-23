import React from 'react';
import ImgCard from './ImgCard';
import '../css/ImageModule.css';

class ImageModule extends React.Component{
    render(){
        const {files} = this.props;
        return(
            <div className="container img-module">
                <div className="img-count">Found {files.length} images</div>
                <div className="img-group">
                    {files.map((file, index) => (
                    <ImgCard key={index} url={file} />
                    ))}
                </div>
            </div>
        )
    }
}

export default ImageModule;