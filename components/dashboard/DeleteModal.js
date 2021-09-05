import $ from 'jquery'
import React from "react";

class DeleteModal extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.showDialog === true){
            setTimeout(function(){ 
                $("html").css('overflow', 'hidden');
            }, 100);
        } else {
            $("html").css('overflow', 'visible');
        }
    };
    

render = () => {
 return (

    <div className={`modal ${this.props.showDialog ? "dialog-show" : "dialog-hidden"}`} id="dialog-wrapper">
        <div className="modal-close" />
        <div className="delete-wrapper">
            <img src="/dashboard/delete-icon.svg" className="logout-img" width="100" height="114"></img>
            <div className="inner-delete">
                <a onClick={(event) => {this.props.onConfirm(event)}} href="#" className="logout-button" id="logout-button" >Remove Project</a>
                <a onClick={(event) => this.props.onContinue(event)} href="#" className="continue" id="continue-button" >Close Tab</a>
            </div>
        </div>



    <style jsx >{`
    
    .dialog-hidden {
        opacity: 0;
        transition: opacity 0.5s;
        pointer-events:none;
    }
    
    .dialog-show {
        opacity: 1;
        transition: opacity 0.5s;
    }


`}</style>
</div>

)};
}
    
export default DeleteModal