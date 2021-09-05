import React from 'react'


class Discard extends React.Component {

    

    render = () => {
        return (

            <div className="step">
                
                <h2 className="addsite-headline">Discard Changes</h2>
                <p className="addsite-paragraph">Do you want to remove this project?</p>
                <div>
                    <div className="button">Keep going</div>
                    <div className="button">Discard</div>
                </div>
                
            </div>
            
        )
    };
}

export default Discard