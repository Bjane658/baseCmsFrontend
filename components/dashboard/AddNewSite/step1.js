import React from 'react'


class Step1 extends React.Component {

    state = {
        name: "",
    };

    componentDidMount() {
        this.setState({name: this.props.name})
    }


    render = () => {
        return (

            <div className="step">
                <h2 className="addsite-headline">Add a new Project</h2>
                <p className="addsite-paragraph">Lets add together a new Project. If you need help please watch this <a href="#" target="_blank">Tutorial</a>.</p>
                <input  onChange={(evt) => this.setState({name: evt.target.value})} value={this.state.name} type="text" className="db-input addinput" name="Email" placeholder="Project Name"/>
                <div className="button" onClick={() => this.props.nextStep(this.state.name)}>Let's start</div>
            </div>
            
        )
    };
}

export default Step1