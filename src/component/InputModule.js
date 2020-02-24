import React from 'react';
import '../css/InputModule.css';

class InputModule extends React.Component{
    state = {
        url:"https://www.jkforum.net/thread-10880560-1-1.html",//
        tag:"img",
        attr:"file",
        type:"jpg",
    }

    inputHandler = (e) => {
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    submit = () => {
        const {url,tag,attr,type} = this.state;

        if(url && tag && attr && type){
            this.props.getImgFiles(this.state);
        }
    };
    
    render(){
        const {url,tag,attr,type} = this.state;
        return(
            <div className='container input-module'>
                <input type="search" className="url" id="url" value={url} onChange={this.inputHandler} placeholder="Url"/>
                <br />
                <input type="search" className="setting" id="tag" value={tag} onChange={this.inputHandler} placeholder="tag name"/>
                <input type="search" className="setting" id="attr"value={attr} onChange={this.inputHandler} placeholder="tag attribute"/>
                <input type="search" className="setting" id="type" value={type} onChange={this.inputHandler} placeholder="image type"/>
                <br />
                <button className="submit" onClick={this.submit}>submit</button>
                {/*<button onClick={this.clear}>clear</button>*/}
            </div>
        )
    }
}

export  default InputModule;
