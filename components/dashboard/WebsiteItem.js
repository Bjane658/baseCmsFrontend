import React from "react";
import $ from "jquery";
import {apiBaseUrl} from "../../utils/network";
import DeleteModal from "./DeleteModal";




class WebsiteItem extends React.Component {

    state = {
        readOnly: true,
        name: this.props.name,
        oldName: this.props.name,
        toBeDeleted: false,
    };

    componentDidMount() {

        $('body').keyup( function () {
            if (event.keyCode === 13) {
                event.preventDefault();
                updateSiteName()
              }
        })
    
        const {siteId} = this.props;

        $(function () {
            var setting = anime({
                targets: ` #delete${siteId}, #close-website${siteId}, #save${siteId}`,
                scale: ['0', '1'],
                opacity: [0, 100],
                autoplay: false,
                duration: 100,
                easing: 'easeInOutSine',
                delay: anime.stagger(200)
            });
            document.querySelector(`#item-settings${siteId}`).onclick = setting.play;

            $(`#item-settings${siteId}`).click(function () {
                $(this).hide();
            });
        });

        $(function () {
            var settingOff = anime({
                targets: ` #deleted${siteId}, #close-website${siteId}, #save${siteId}`,
                scale: ['1', '0.9'],
                opacity: 0,
                autoplay: false,
                easing: 'easeInOutSine',
                duration: 100,
                delay: anime.stagger(100)
            });
            document.querySelector(`#close-website${siteId}`).onclick = settingOff.play;

            $(`#close-website${siteId}`).click(function () {
                $(`#item-settings${siteId}`).show();
            });
            $(`#save${siteId}`).click(function () {
                $(`#item-settings${siteId}`).show();
            });
        });
    }


    updateSiteName() {
        const {name, oldName} = this.state;
        const siteId = this.props.siteId;
        const bearerToken = localStorage.getItem("token");
        if (oldName === name) return;
        $.ajax(
            {
                type: "POST",
                url: `${apiBaseUrl}/api/site/${siteId}/name`,
                data: JSON.stringify({
                    name,
                    siteId,
                }),
                contentType: 'application/json',
                headers: {authorization: bearerToken}
            }
        ).then(() => {
            this.props.onChangeName(name);
            this.props.onNotification({notify: true, message: "Website name changed", type: "success"});
            setTimeout(() => this.props.onNotification({notify: false, message: "", type: undefined}), 3000);
            this.setState({oldName: name});
        }).catch(() => {
            this.props.onNotification({notify: true, message: "We can't update the website name", type: "failure"});
            setTimeout(() => this.props.onNotification({notify: false, message: "", type: undefined}), 3000);
        });
    };

    selectedCssClass() {
        if (this.props.highlighted || this.props.highlighted === undefined) {
            return "";
        }
        return "disabled";
    }

    noSelectedSiteCssClass() {
        if (this.props.highlighted === undefined) {
            return "no-site-highlighted";
        }
        return "";
    }

    openScreenshotModal() {
        $("#screenshot-modal").css('opacity', '1');
        $("#screenshot-modal").fadeIn(400);
        $("body").css('overflow', 'hidden');
        $("#dashboard").css('transform', 'scale(0.98)');
        $("#dashboard").css('filter', 'blur(12px)');

        setTimeout(function () {
            $('.screenshot-wrapper').css('transform', 'scale(1)')
            $('.screenshot-wrapper').css('opacity', '1')
        }, 200);
    }

    renderOverlayPage() {
        const {readOnly} = this.state;
        if (!readOnly) {
            return (
                <div className="overlay-page">
                    <div className="screenshot" onClick={() => this.openScreenshotModal()}>Create new Screenshot</div>
                </div>
            );
        }
        return (<></>);
    }




    render() {
        const {readOnly} = this.state;
        const {siteId} = this.props;
        let screenshotSource = this.props.screenshot ? this.props.screenshot : "../dashboard/placeholder-website.svg";

        return (
            <div className={`website ${this.selectedCssClass()}`}>
                <div className="editor-link">
                    {this.renderOverlayPage()}
                    <a href={`/edit?id=${siteId}`} onClick={(event) => {
                        if (this.props.highlighted === false) {
                            event.preventDefault()
                        }
                    }} target="_blank">
                        <img src={screenshotSource} alt="" className="thumbnail" height="100%" width="100%"/>
                        <div className={`website-img-overlay-hover ${this.noSelectedSiteCssClass()}`}><p>OPEN EDITOR</p>
                        </div>
                    </a>
                </div>
                <div className="settings">
                    <input maxLength="40"
                           onChange={(evt) => {
                               this.setState({name: evt.target.value})
                           }}
                           readOnly={readOnly} className="name"
                           value={readOnly ? this.props.name : this.state.name}/>
                    <div className="setting-wrapper">

                        <div className="page-setting-active">
                            <div id={`save${siteId}`} className="setting-button" onClick={() => {
                                this.updateSiteName();
                                this.setState({readOnly: true});
                                this.props.onSelect(false);
                            }}
                                 style={this.state.readOnly ? {display: "none"} : {}}>
                                <img src="../dashboard/save-icon.svg" width="16" className="page-save-image" />
                            </div>
                            <div className="setting-button" id={`close-website${siteId}`} onClick={() => {
                                this.setState({readOnly: true, name: this.state.oldName});
                                this.props.onSelect(false);
                            }} style={this.state.readOnly ? {display: "none"} : {}}>
                                <img src="../dashboard/close-icon.svg" width="12" className="page-discard-image"/>
                            </div>
                            <div onClick={() => this.setState({toBeDeleted: true})} className="setting-button"
                                 id={`delete${siteId}`}
                                 style={this.state.readOnly ? {display: "none"} : {}}>
                                <img src="../dashboard/delete-icon.svg" width="13" height="16" className="page-delete-image"/>
                            </div>
                            <div className="setting-button settingsbutton" id={`item-settings${this.props.siteId}`}
                                 onClick={() => {
                                     if (this.props.highlighted === undefined) {
                                         this.setState({readOnly: false, name: this.props.name});
                                         this.props.onSelect(true);
                                     }
                                 }}
                                 style={this.props.highlighted === false ? {display: "none"} : {}}
                            >
                                <img src="../dashboard/icon-settings.svg" width="12" height="12" className="site-settings"/>
                            </div>
                        </div>
                    </div>

                </div>
                <DeleteModal showDialog={this.state.toBeDeleted}
                             confirmButtonText="Delete Site"
                             onConfirm={() => {
                                 this.setState({toBeDeleted: false});
                                 this.props.onDelete();
                                 this.props.onSelect(false);
                             }}
                             onContinue={() => this.setState({toBeDeleted: false})}
                />


            </div>
        )
    };
}

export default WebsiteItem