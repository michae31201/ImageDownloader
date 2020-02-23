import React from 'react';
import '../css/ImgCard.css';
import zoomInImg from '../image/zoom-in.png';

class ImgCard extends React.Component{
  
  componentWillUnmount(){
    const {url} = this.props;
    window.URL.revokeObjectURL(url);
  }
  zoomInHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const {url} = this.props;
    const imgNode = document.querySelector(`[src=${CSS.escape(url)}]`);
    const shape = imgNode.naturalWidth - imgNode.naturalHeight >= 0?'shape-width':'shape-height';

    this.props.zoomin({url,shape});
  }

  render(){
    const {url} = this.props;
    return(
      <div className='img-card'>
        <a href={`${url}`} download>
         <img src = {`${url}`} alt = {`${url}`} data-src = {`${url}`}/>
         <div className="zoom-in" onClick={this.zoomInHandler}>
          <img src={zoomInImg} alt="zoom-in-img"/>
         </div>
        </a>
        
      </div>
    )
  }
}

export default ImgCard;