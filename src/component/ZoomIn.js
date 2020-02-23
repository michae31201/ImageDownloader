import React from 'react';
import '../css/ZoomIn.css';

class ZoomIn extends React.Component{
    
    render(){
        const {closeZoom, image} = this.props;
        return(
            <div className="zoom-contanier" onClick={closeZoom}>            
                <div className={image.shape}>
                    <img className="zoom-image" src={image.url} alt=""/>          
                </div>
            </div>
        ) 
    }
}

export default ZoomIn;