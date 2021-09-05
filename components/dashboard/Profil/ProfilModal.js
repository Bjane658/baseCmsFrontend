import React from 'react'
import $ from 'jquery'
import ProfilTab from "./profilTab";
import MailTab from "./mailTab";
import PaymentTab from "./paymentTab";
import SettingsTab from "./settingsTab"



class ProfilModal extends React.Component {

    state = {
        profilTab: "profil",
    };

    componentDidMount() {

        $(document).ready(function () {
            $("#profil-modal").css('opacity', '0');
            $("#profil-modal").css('display', 'none');
            $('.profil-wrapper').css('transform', 'scale(0.94)')
            $('.profil-wrapper').css('opacity', '0')
        });

        $("#close-popup, #close-profil-link").click(function () {
            $('.profil-wrapper').css('transform', 'scale(0.94)')
            $('.profil-wrapper').css('opacity', '0')
            $("body").css('overflow', 'auto');
            $("#dashboard").css('transform', 'scale(1)');
            $("#dashboard").css('filter', 'blur(0px)');

            setTimeout(function(){ 
                $("#profil-modal").fadeOut();
            }, 200);

        });

        $("#profil").click(function () {
            $("#profil-modal").css('opacity', '1');
            $("#profil-modal").fadeIn(400);
            $("body").css('overflow', 'hidden');
            $("#dashboard").css('transform', 'scale(0.98)');
            $("#dashboard").css('filter', 'blur(12px)');
            
            setTimeout(function(){ 
                $('.profil-wrapper').css('transform', 'scale(1)')
                $('.profil-wrapper').css('opacity', '1')
            }, 200);

        });
        
        
        // Toggle Profil Headline
        $('.profilswitch-inner:nth-of-type(1)').click( function () {
            $('.profil-headline').html('Profil')
        })

        $('.profilswitch-inner:nth-of-type(2)').click( function () {
            $('.profil-headline').html('Email')
        })

        $('.profilswitch-inner:nth-of-type(3)').click( function () {
            $('.profil-headline').html('Payment')
        })

        $('.profilswitch-inner:nth-of-type(4)').click( function () {
            $('.profil-headline').html('Settings')
        })
}


componentDidUpdate(prevProps, prevState, snapshot) {
    $("#profil").click(function () {
        $("#profil-modal").css('opacity', '1');
        $("#profil-modal").fadeIn(400);
        $("body").css('overflow', 'hidden');
    });
}


profilTab = () => {

    if (this.state.profilTab === "profil"){
        return (
            <ProfilTab />
        )
    }
    if (this.state.profilTab === "changeEmail"){
        return (
            <MailTab />
        )
    }
    if (this.state.profilTab === "settings"){
        return (
            <SettingsTab />
        )
    }
    if (this.state.profilTab === "payment"){
        return (
            <PaymentTab />
        )
    }

};




render = () => {
    
const {profilTab} = this.state;
    
return (

<div className="modal" id="profil-modal" style={{opacity: '0', display: 'none'}}>
        <div className="modal-close" id="close-profil-link"/>
        <div className="profil-wrapper">
            <div className="profil-header">
                <h1 className="profil-headline">Profil</h1>
                <div className="profilswitch">
                    <div className={` profilswitch-inner ${profilTab === "profil" ? "profilswitch-active" : ""}`} onClick={() => this.setState({profilTab: "profil"})}>
                        <img src="../editor/profil-icon.svg" width="15" />
                    </div>
                    <div className={` profilswitch-inner ${profilTab === "changeEmail" ? "profilswitch-active" : ""}`} onClick={() => this.setState({profilTab: "changeEmail"})}>
                        <img src="../editor/form-icon.svg" width="15" />
                    </div>
                    <div className={` profilswitch-inner ${profilTab === "payment" ? "profilswitch-active" : ""}`} onClick={() => this.setState({profilTab: "payment"})}>
                        <img src="../dashboard/payment.svg" width="20" />
                    </div>
                    <div className={` profilswitch-inner ${profilTab === "settings" ? "profilswitch-active" : ""}`} onClick={() => this.setState({profilTab: "settings"})}>
                        <img src="../editor/settings-icon.svg" width="15" />
                    </div>
                </div>
            <div className="AddSiteClose" id="close-popup">
                <img src="./dashboard/close-icon.svg" alt="" className="close-profil" />
            </div>
        </div>
        <div className="profil-form-wrapper">
            {this.profilTab()}
        </div>
    </div>
</div>


        )
    };
}

export default ProfilModal