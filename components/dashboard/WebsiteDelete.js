import $ from 'jquery'
import React from "react";

class WebsiteDelete extends React.Component {

    componentDidMount () {

        $(document).ready(function(){
            $("#delete-popup").css('opacity', '0');
            $("#delete-popup").css('display', 'none');
            $('.delete-popup').css('transform', 'scale(0.94)')
            $('.delete-popup').css('opacity', '0')
        });

        $("#continue-button").click(function(){
            $('.delete-popup').css('transform', 'scale(0.94)')
            $('.delete-popup').css('opacity', '0')
            $("body").css('overflow', 'auto');
            $("#dashboard").css('transform', 'scale(0.98)');

            setTimeout(function(){ 
                $("#delete-popup").fadeOut();
            }, 200);
        });

        $("#delete").click(function(){
            $("#delete-popup").css('opacity', '1');
            $("#delete-popup").fadeIn();
            $("body").css('overflow', 'hidden');
            $("#dashboard").css('transform', 'scale(1)');

            setTimeout(function(){ 
                $('.delete-popup').css('transform', 'scale(1)')
                $('.delete-popup').css('opacity', '1')
            }, 200);
        });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        $("#delete").click(function(){
            $("#delete-popup").css('opacity', '1');
            $("#delete-popup").fadeIn();
            $("body").css('overflow', 'hidden');
            $("#dashboard").css('transform', 'scale(1)');

            setTimeout(function(){ 
                $('.delete-popup').css('transform', 'scale(1)')
                $('.delete-popup').css('opacity', '1')
            }, 200);
        });
        
    }

    logout = (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        location.pathname = "/login";
    };

render = () => {
 return (

    <div className="modal" id="delete-popup" style={{ opacity: '0', display: 'none'}}>
        <div className="modal-close" />
        <div className="delete-popup">
            <img src="../dashboard/loginout.svg" className="logout-img"></img>
            <div className="inner-delete">
                <a href="/login" className="delete-button" id="delete-button" >Delete Project</a>
                <input type="text" className="db-input" name="Lastname" placeholder="Jobs"/>

                <p className="continue" id="continue-button" >CLOSE</p>
            </div>
        </div>
    </div>

)};
}
    
export default WebsiteDelete