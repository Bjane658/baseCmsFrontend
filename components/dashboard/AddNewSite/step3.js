import React from 'react'
import $ from 'jquery'


class Step3 extends React.Component {

    componentDidMount () {
        $('.CopyCodeButton').click( function () {
            var copyText = document.getElementById("code");
            copyText.select(); 
            copyText.setSelectionRange(0, 99999);
            document.execCommand("copy");
        })
    }

    render = () => {
        return (

            <div className="step">
                    <h2 className="addsite-headline">Verification</h2>
                    <p className="addsite-paragraph">Copy this Code in your Website, for example in the bevor &lt;/head> part </p>
                    <div className="CopyCodeWraper">
                        <input disabled id="code" style={{color: 'var(--white)'}} type="text" className="db-input addinput" name="Code" value='<meta verification="23asd746287263dfg84ftz656" />'/>
                        <div className="CopyCodeButton">Copy Code</div>
                    </div>
                    <div className="button" onClick={() => this.props.nextStep()}>Check Code</div>
                    


    <style jsx>{`

    .CopyCodeWraper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
    }

    .CopyCodeButton {
        height: 48px;
        background: var(--midgrey);
        padding: 10px;
        margin-left: 10px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        min-width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: ease 400ms;
    }

    .CopyCodeButton:hover {
        background: var(--lightgrey);
        color: var(--white);
    }

    `}</style>  
            </div>
            
        )
    };
}

export default Step3