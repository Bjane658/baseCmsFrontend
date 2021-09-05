import React from 'react'
import $ from 'jquery'
import {apiBaseUrl} from "../../../utils/network"
import {isBearerToken} from "../../../utils/token";
import Step1 from "./step1"
import Step2 from "./step2"
import Step3 from "./step3"
import Step4 from "./step4"
import Step5 from "./step5"
import Step6 from "./step6"
import Step7 from "./step7"
import Step8 from "./step8"



class AddSiteModal extends React.Component {

    state = {
        link: "",
        projectName: "",
        language: "",
        edition: "",
        clientFirstName: "",
        clientLastName: "",
        paymentMail: "",
        activeStep: 1,
    };

    setDefaultState() {
        this.setState({
            link: "",
            projectName: "",
            language: "",
            edition: "",
            clientFirstName: "",
            clientLastName: "",
            paymentMail: ""
        })
    }

    componentDidMount() {

        $(document).ready(function () {
            $("#addsite-modal").css('opacity', '0');
            $("#addsite-modal").css('display', 'none');
            $('.add-site-wrapper').css('transform', 'scale(0.94)')
            $('.add-site-wrapper').css('opacity', '0')
            $("#dashboard").css('filter', 'blur(0px) saturate(100%)');
        });

        // $("#close-add-site, #addsite-close").click(function () {
        //     $("#addsite-modal").fadeOut(400);
        //     $("body").css('overflow', 'auto');
        //});

        this.addOpenAddSiteClickHandler();
    };

    resetForm() {
        this.setDefaultState();
        document.getElementById("addSite").reset();
    }

    closeAddSite() {
        $('.add-site-wrapper').css('transform', 'scale(0.96)')
        $('.add-site-wrapper').css('opacity', '0')
        $("body").css('overflow', 'auto');
        $("#dashboard").css('transform', 'scale(1)');
        $("#dashboard").css('filter', 'blur(0px)');

        setTimeout(function(){ 
            $("#addsite-modal").fadeOut();
        }, 200);
    }

    addOpenAddSiteClickHandler() {
        $("#addsite, #empty-image").click(function () {
            $("#addsite-modal").css('opacity', '1');
            $("#addsite-modal").fadeIn(400);
            $("body").css('overflow', 'hidden');
            $("#dashboard").css('transform', 'scale(0.98)');
            $("#dashboard").css('filter', 'blur(12px)');

            setTimeout(function(){ 
                $('.add-site-wrapper').css('transform', 'scale(1)')
                $('.add-site-wrapper').css('opacity', '1')
            }, 200);
    
        });

        // Firefox Blur Effekt
        $(document).ready(function () {
            if (navigator.userAgent.search("Firefox") >= 0) {
                $("#addsite, #empty-image, #logout-nav, #profil ").click(function () {
                    $("#dashboard").css('filter', 'blur(10px)');
                });

                $("#close-add-site, #addsite-close, #addSite, #close-popup, .modal-close").click(function () {
                    $("#dashboard").css('filter', 'blur(0px)');
                });
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.addOpenAddSiteClickHandler();
    }

    attemptSiteCreation() {
        const {link, projectName, language, clientFirstName, clientLastName, edition, paymentMail} = this.state;
        const bearerToken = localStorage.getItem("token");
        $.ajax(
            {
                type: "POST",
                url: apiBaseUrl + "/api/sites",
                data: JSON.stringify({
                    link,
                    projectName,
                    language,
                    edition,
                    clientFirstName,
                    clientLastName,
                    paymentMail
                }),
                contentType: 'application/json',
                headers: {authorization: bearerToken}
            }
        ).then((addSiteResponse) => {
                    console.log("great Success");
                    console.log(addSiteResponse);
                    this.props.onAddSiteSuccess(addSiteResponse);
                    this.resetForm();
                    $.ajax(
                        {
                            type: "POST",
                            url: apiBaseUrl + "/api/sites/screenshot",
                            data: JSON.stringify({
                                link,
                                siteId: addSiteResponse.siteId
                            }),
                            contentType: 'application/json',
                            headers: {authorization: bearerToken}
                        }
                    ).then((createScreenshotResponse) => {
                        const {siteId, screenshot} = createScreenshotResponse;
                        this.props.onScreenshotSuccess(siteId, screenshot);
                    })
                }
            ).catch((error) => {
            console.log(error);
        });
    }

    noEmptyFields = () => {
        const {link, projectName, language, clientFirstName, clientLastName, edition, paymentMail} = this.state;
        return link && projectName && language && clientLastName && clientFirstName && projectName && paymentMail && edition;
    };

    nextStep = () => {
        const {activeStep} = this.state;
        if(activeStep < 8){
            this.setState({activeStep: activeStep + 1})
        }
    };
    
    lastStep = () => {
        const {activeStep} = this.state;
        if(activeStep > 1){
            this.setState({activeStep: activeStep - 1})
        }
    };

    addSite = () => {
        const {projectName, link, clientFirstName, clientLastName, paymentMail } = this.state;
        /*
    name: body.projectName,
    url: body.link,
    clientFirstName: body.clientFirstName,
    clientLastName: body.clientLastName,
    paymentMail: body.paymentMail,
    created: Date.now(),
         */
        const bearerToken = localStorage.getItem("token");
        if (!isBearerToken(bearerToken)) {
            location.pathname = "/login";
        }
        $.ajax(
            {
                type: "POST",
                url: `${apiBaseUrl}/api/sites`,
                data: JSON.stringify({
                    projectName,
                    link,
                    clientFirstName,
                    clientLastName,
                    paymentMail
                }),
                contentType: 'application/json',
                headers: {authorization: bearerToken}
            }
        ).then(console.log).catch(console.error)
    };

    renderStep = () => {
       const {activeStep} = this.state;

        switch(activeStep) {
            case 1:
                return <Step1
                    name={this.state.projectName}
                    nextStep={(name) => {
                    this.setState({projectName: name});
                    this.nextStep();
                }}/>;
                break;
            case 2:
                return <Step2
                    url={this.state.link}
                    nextStep={(url) => {
                    this.setState({link: url});
                    this.nextStep();
                }}/>;
                break;
            case 3:
                return <Step3 nextStep={() => this.nextStep()}/>;
                break;
            case 4:
                return <Step4 nextStep={() => this.nextStep()}/>;
                break;
            case 5:
                return <Step5
                clientFirstName={this.state.clientFirstName}
                clientLastName={this.state.clientLastName}
                clientEmail={this.state.paymentMail}
                nextStep={(firstName, lastName, email) => {
                this.setState({clientFirstName: firstName, clientLastName: lastName, paymentMail: email});
                this.nextStep();
            }}/>;
                break;
            case 6:
                return <Step6 nextStep={() => this.nextStep()}/>;
                break;
            case 7:
                return <Step7 nextStep={() => {
                    this.addSite();
                    this.nextStep();
                }}/>;
                break;
            case 8:
                return <Step8/>;
                break;
            default:
                return <Step1 nextStep={() => this.nextStep()}/>;
        }
    };

    render = () => {
        const {link, projectName, language, clientFirstName, clientLastName, edition, paymentMail} = this.state;
        return (
            <div className="modal" id="addsite-modal" style={{opacity: '0', display: 'none'}}>
                <div className="modal-close" onClick={() => this.closeAddSite()}/>
                <div className="add-site-wrapper" id="addsite-popup">
                    <div className="AddSiteClose" onClick={() => this.closeAddSite()}>
                        <img src="./dashboard/close-icon.svg" width="16"/>
                    </div>

                    {this.renderStep()}

                    <div className="StepSwitch">
                        <div className="StepBack" onClick={() => this.lastStep()}>
                            <img src="./dashboard/back-icon.svg" width="10"/>
                        </div>
                        <div className="StepForward" onClick={() => this.nextStep()}>
                            <img src="./dashboard/next-icon.svg" width="10"/>
                        </div>
                    </div>
                </div>
        </div> 
        )
    };
}

export default AddSiteModal