import React from 'react';
import '../css/ZoomIn.css';

const ZoomIn = ({closeZoom, url}) =>{
    return(
        <div className="zoom-contanier" onClick={closeZoom}>            
            <img className="zoom-image" src={url} alt=""/>          
        </div>
    ) 
}

export default ZoomIn;