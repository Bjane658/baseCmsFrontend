import React from 'react'
import {issBaseToken} from "../../../utils/network"

class Step7 extends React.Component {

    

    render = () => {
        return (

            <div className="step">
                    <h2 className="addsite-headline">Screenshot</h2>
                    <p className="addsite-paragraph">Wait until your Site has been loaded and create a Screenshot for your Project</p>
                    <div className="screenshot-container">
                        <div style={{height: '1125px', width: '2000px', transform: 'scale(0.2)', transformOrigin: 'left top', position: 'absolute', top: '0px', left: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <iframe height="100%" width="100%" src={this.props.url} frameBorder="0" ></iframe>
                        </div>
                    </div>
                    <div style={{marginLeft: 'auto', cursor: 'pointer', fontSize: '12px'}}>Scale Website</div>
                    <div className="button" onClick={() => this.props.nextStep()}>Create Screenshot</div>
            </div>
            
        )
    };
}

export default Step7