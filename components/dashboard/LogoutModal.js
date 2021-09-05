import $ from 'jquery'
import React from "react";


class LogoutModal extends React.Component {

    componentDidMount () {

        $(document).ready(function(){
            $("#logout-modal").css('opacity', '0');
            $("#logout-modal").css('display', 'none');
            $('.logout-wrapper').css('transform', 'scale(0.9)')
            $('.logout-wrapper').css('opacity', '0')
            $("#dashboard").css('transform', 'scale(1)');
        });

        $("#continue-button, .modal-close").click(function(){
            $("#logout-modal").fadeOut();
            $('.logout-wrapper').css('transform', 'scale(0.9)')
            $('.logout-wrapper').css('opacity', '0')
            $("body").css('overflow', 'auto');
            $("#dashboard").css('transform', 'scale(1)');
            $("#dashboard").css('filter', 'blur(0px)');
            setTimeout(function(){ 
                $("#logout-modal").fadeOut();
            }, 200);
        });

        $("#logout-nav").click(function(){
            $("#logout-modal").css('opacity', '1');
            $("#logout-modal").fadeIn(400);
            $("body").css('overflow', 'hidden');
            $("#dashboard").css('transform', 'scale(0.98)');
            $("#dashboard").css('filter', 'blur(12px)');
            setTimeout(function(){ 
                $('.logout-wrapper').css('transform', 'scale(1)')
                $('.logout-wrapper').css('opacity', '1')
            }, 300);
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        $("#logout-nav").click(function(){
            $("#logout-modal").css('opacity', '1');
            $("#logout-modal").fadeIn(400);
            $("body").css('overflow', 'hidden');
        });
    }

    logout = (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        location.pathname = "/login";
    };

    continue = () => {
        event.preventDefault();
        $("#logout-modal").fadeOut();
        $("body").css('overflow', 'auto');
    };

render = () => {
 return (

<div className="modal" id="logout-modal" style={{ opacity: '0', display: 'none'}}>
    <div className="modal-close" />
    <div className="logout-wrapper">
        <img src="../dashboard/loginout.svg" className="logout-img"></img>
        <div className="inner-logout">
            <a onClick={(event) => {this.logout(event)}} href="/login" className="logout-button" id="logout-button" >LOG OUT</a>
            <p className="continue" id="continue-button" >Close Tab</p>
        </div>
    </div>
</div>

)};
}
    
export default LogoutModal