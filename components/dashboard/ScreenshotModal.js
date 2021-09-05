import $ from 'jquery'
import React from "react";


class ScreenshotModal extends React.Component {

componentDidMount () {
    $(document).ready(function () {
        $(`#screenshot-modal`).css('opacity', '0');
        $(`#screenshot-modal`).css('display', 'none');
        $('.screenshot-wrapper').css('transform', 'scale(0.94)');
        $('.screenshot-wrapper').css('opacity', '0');
    });

    $("#continue-button, .close-screenshot").click(function(){
        $("#screenshot-modal").fadeOut();
        $('.screenshot-wrapper').css('transform', 'scale(0.9)')
        $('.screenshot-wrapper').css('opacity', '0')
        $("body").css('overflow', 'auto');
        $("#dashboard").css('transform', 'scale(1)');
        $("#dashboard").css('filter', 'blur(0px)');
        setTimeout(function(){ 
            $("#screenshot-modal").fadeOut();
        }, 200);
    });
}


render = () => {
 return (

<div className="modal" id="screenshot-modal" >
    <div className="close-screenshot" />
    <div className="screenshot-wrapper">
        <div className="inner-screenshot">
            <h2>Create a new Screenshot</h2>
            <div className="screenshot-container">
                <div style={{height: '1125px', width: '2000px', transform: 'scale(0.2)', transformOrigin: 'left top', position: 'absolute', top: '0px', left: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <iframe height="100%" width="100%" src={this.props.url} frameBorder="0" ></iframe>
                </div>
            </div>
            <p className="continue" id="continue-button" >Create new Screenshot</p>
        </div>
    </div>



 
</div>

)};
}
    
export default ScreenshotModal