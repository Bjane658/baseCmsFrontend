import React from "react";
import Lottie from 'react-lottie';
import * as animationData from './empty.json'

class SearchEmptyState extends React.Component {


    render = () => {

        const defaultOptions = {
            loop: true,
            autoplay: true, 
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
        };

      return (
        
        <div className="emptyState">
            <div id="lottie">
                <Lottie options={defaultOptions} />
            </div>
            <h1>Hm... I cant find<br/> a project with this name</h1>
            <a onClick={() => this.props.clearSearch()} className="button">Clear Search</a>
                
        </div>
    
    )};
    
    } 

export default SearchEmptyState