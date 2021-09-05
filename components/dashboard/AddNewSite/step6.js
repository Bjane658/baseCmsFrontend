import React from 'react'


class Step6 extends React.Component {

    

    render = () => {
        return (

            <div className="step">
                    <h2 className="addsite-headline">Choose a Plan</h2>
                    <p className="addsite-paragraph">Choose the right Plan for your Site</p>

                    <div style={{diplay: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: '100%'}}>

                        <div style={{diplay: 'inline'}}>
                            <input type="radio" name="plan" /> 
                            <label style={{marginLeft: '10px'}}>Plan 1</label>
                        </div>

                        <div style={{diplay: 'inline'}}>
                            <input type="radio" name="plan" /> 
                            <label style={{marginLeft: '10px'}}>Plan 2</label>
                        </div>

                        <div style={{diplay: 'inline'}}>
                            <input type="radio" name="plan" /> 
                            <label style={{marginLeft: '10px'}}>Plan 3</label>
                        </div>
                    </div>

                    <div className="button" onClick={() => this.props.nextStep()}>Next Step</div>
            </div>
            
        )
    };
}

export default Step6