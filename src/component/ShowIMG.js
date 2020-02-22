import React from 'react';

class ShowIMG extends React.Component{
  
  componentWillUnmount(){
    const {url} = this.props;
    window.URL.revokeObjectURL(url);
  }

  render(){
    const {url} = this.props;

    return(
      <div className='img-card'>
        <a href={`${url}`} download>
         <img src = {`${url}`} alt = {`${url}`} data-src = {`${url}`} />
        </a>
      </div>
    )
  }
}

export default ShowIMG;