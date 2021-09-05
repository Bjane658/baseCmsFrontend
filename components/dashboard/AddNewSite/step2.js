import React from 'react'


class Step2 extends React.Component {

    state = {
        url: ""
    };

    componentDidMount() {
        this.setState({url: this.props.url})
    }


    render = () => {
        return (

            <div className="step">
                <h2 className="addsite-headline">Webflow URL</h2>
                <p className="addsite-paragraph">Paste your webflow.io Link of your Site</p>
                <select className="select-upload">
                        <option value="volvo">Get Site from URL</option>
                        <option value="saab">Upload Code ZIP</option>
                </select>
                <input  onChange={(evt) => this.setState({url: evt.target.value})} value={this.state.url} type="text" className="db-input addinput" name="Email" placeholder="base.webflow.io"/>
                <div className="button" onClick={() => this.props.nextStep(this.state.url)}>Next Step</div>
            </div>
            
        )
    };
}

export default Step2