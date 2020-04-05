import React from 'react';
import '../css/ImgCard.css';
import zoomInImg from '../image/zoom-in.png';

class ImgCard extends React.Component{
  
  /*componentWillUnmount(){
    const {url} = this.props;
    window.URL.revokeObjectURL(url);
  }*/
  zoomInHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const {url} = this.props;
    this.props.zoomin(url);
  }

  render(){
    const {url, index} = this.props;
    return(
      <div className='img-card'>
        <a href={`/.netlify/functions/fetchImage?site=${url}`} download={`image${index+1}`}>
         <input type="checkbox" className="img-check"/>
         <img className="lazy" data-src={`${url}`} alt={index} loading="lazy" title="click to download"/>
         <div className="zoom-in" onClick={this.zoomInHandler}>
          <img src={zoomInImg} alt="zoom-in-img" title="zoom in"/>
         </div>
        </a>        
      </div>
    )
  }
}

export default ImgCard;