import React from 'react';
import '../css/ZoomIn.css';

class ZoomIn extends React.Component{
    
    render(){
        const {closeZoom, image} = this.props;
        return(
            <div className="zoom-contanier" onClick={closeZoom}>            
                <img className="zoom-image" src={image} alt=""/>          
            </div>
        ) 
    }
}

export default ZoomIn;