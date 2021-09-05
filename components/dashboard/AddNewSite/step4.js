import React from 'react'


class Step4 extends React.Component {

    

    render = () => {
        return (

            <div className="step">
                    <h2 className="addsite-headline">Sitemap</h2>
                    <p className="addsite-paragraph">Check if you activate your Sitemap in the Webflow Pagesettings</p>
                    <div className="button" onClick={() => this.props.nextStep()}>Next Step</div>
            </div>
            
        )
    };
}

export default Step4