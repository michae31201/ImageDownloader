import React from 'react';
import '../css/ImgCard.css';
import zoomInIcon from '../image/zoom-in.png';

const ImgCard = ({url, index, setZoomInImg}) =>{
  /*componentWillUnmount(){
    const {url} = this.props;
    window.URL.revokeObjectURL(url);
  }*/
 const  zoomInHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();

    setZoomInImg(url);
  }

  return(
    <div className='img-card'>
      <a href={`/.netlify/functions/fetchImage?site=${url}`} download={`image${index + 1}`}>
       <input type="checkbox" className="img-check"/>
       <img className="lazy" data-src={url} alt={index + 1} loading="lazy" title={`click to download image${index + 1}`}/>
       <div className="zoom-in" onClick={zoomInHandler}>
        <img src={zoomInIcon} alt="zoom-in-img" title="zoom in"/>
       </div>
      </a>        
     </div>
  )
  
}

export default ImgCard;