import React from 'react'


class Step5 extends React.Component {

    state = {
        clientFirstName: "",
        clientLastName: "",
        clientEmail: ""
    };

    componentDidMount() {
        this.setState({
            clientFirstName: this.props.clientFirstName,
            clientLastName: this.props.clientLastName,
            clientEmail: this.props.clientEmail
        });
    }


    render = () => {
        const {clientFirstName, clientLastName, clientEmail} = this.state;
        return (

            <div className="step">
                   <h2 className="addsite-headline">Project Billing</h2>
                    <p className="addsite-paragraph">Set up the Billing for your Project and we will send a Mail with the Payments </p>
                    <form className="form">
                    <select style={{width: '100%', minHeight: '40px'}}>
                        <option value="volvo">Charge a Client</option>
                        <option value="saab">I want to Pay this one</option>
                    </select>
                        <div className="client-name">
                            <input onChange={(evt) => this.setState({clientFirstName: evt.target.value})} value={this.state.clientFirstName} type="text" className="db-input add" placeholder="Client Firstname" />
                            <input onChange={(evt) => this.setState({clientLastName: evt.target.value})} value={this.state.clientLastName} type="text" className="db-input add" placeholder="Client Lastname" />
                        </div>
                        <input onChange={(evt) => this.setState({clientEmail: evt.target.value})} value={this.state.clientEmail} type="email" className="db-input addemail" placeholder="Client Email" />
                    </form>

                    <div className="button" onClick={() => this.props.nextStep(clientFirstName, clientLastName, clientEmail)}>Next Step</div>








<style jsx>{`

.form {
    width: 100%;
}

.client-name {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}

.add {
    width:49%;
    text-align: center;
}

.addemail {
    width: 100%;
    text-align: center;
    margin-top: 0px;
}

`}</style>  




            </div>
            
        )
    };
}

export default Step5