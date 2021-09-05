import React from 'react'
import Backend from "./Backend";



class Sidebar extends React.Component {

    state = {
        editMode: false,
        settings: {show: false, setting: ""},
    };

    toggleSettings = (settingsPage) => {
        this.setState({
            settings: {
                show: !(this.state.settings.setting === settingsPage && this.state.settings.show),
                setting: settingsPage}
            });
    };

    closeSettings = () => {
        this.setState({settings: {show: false, settings: this.state.settings.setting}});
    };

    render = () => {

        return (

        <div className="sidebar">
            <div className="sidebarInner" >
            <div id="edit" data-tip data-for="EditorTooltip" className={`nav-wrapper edit ${this.state.editMode ? 'editmodeOn' : ''}`} onClick={() => {
                    const { editMode } = this.state;
                    this.setState({editMode: !this.state.editMode});
                    if(!editMode){
                        this.closeSettings();
                        this.props.onEdit();
                    } else {
                        this.props.onSave();
                    }
                }
            }>
                <img src="../editor/edit-icon.svg" className="img" />
            </div>
            <div className={`${this.state.editMode ? "hideIcons" : "navbuttons" }`}>
                <div className="nav-wrapper" id="pages" onClick={() => this.toggleSettings("pages")}>
                    <img src={this.state.settings.setting === "pages" && this.state.settings.show ? "../editor/close-red.svg" : "../editor/page-icon.svg"} className="img" />
                </div>
                <div className="nav-wrapper" id="media" onClick={() => this.toggleSettings("media")}>
                    <img src={this.state.settings.setting === "media" && this.state.settings.show ? "../editor/close-red.svg" : "../editor/media-icon.svg"} className="img" />
                </div>
                <div className="nav-wrapper" onClick={() => this.toggleSettings("database")}>
                    <img src={this.state.settings.setting === "database" && this.state.settings.show ? "../editor/close-red.svg" : "../editor/database-icon.svg"} className="img" />
                </div>
                <div className="nav-wrapper" onClick={() => this.toggleSettings("analytics")}>
                    <img src={this.state.settings.setting === "analytics" && this.state.settings.show ? "../editor/close-red.svg" : "../editor/analytics-icon.svg"} className="img" />
                </div>
                <div className="nav-wrapper" onClick={() => this.toggleSettings("form")}>
                    <img src={this.state.settings.setting === "form" && this.state.settings.show ? "../editor/close-red.svg" : "../editor/form-icon.svg"} className="img" />
                </div>
                <div className="nav-wrapper" onClick={() => this.toggleSettings("settings")}>
                    <img src={this.state.settings.setting === "settings" && this.state.settings.show ? "../editor/close-red.svg" : "../editor/settings-icon.svg"} className="img" />
                </div>
            </div>

            <div className={`${this.state.editMode ? "navbuttons" : "hideIcons" }`}>
                <div className="nav-wrapper">
                    <img src="./editor/undo.svg" className="img" />
                </div>
                <div className="nav-wrapper" >
                    <img src="./editor/redo.svg" className="img" />
                </div>
                <div className="nav-wrapper" >
                    <div style={{color: 'var(--white)', fontWeight: '700'}}>JS</div>
                </div>
            </div>

            <div className="nav-wrapper profil" onClick={() => this.props.onPublish()}>
                <img src="../editor/upload-icon.svg" className="img" />
                <div style={{backgroundColor: 'limegreen', marginBottom: '-10px'}} className="indicator" />
            </div>
        </div>
            <Backend renderSettings={this.state.settings}
                     changeSite={(newActivePage) => this.props.changeSite(newActivePage)}
                     siteMap={this.props.siteMap}
                     seoSettings={this.props.seoSettings}
                     activePage={this.props.activePage}
            />

        </div>


        )
    }
}

export default Sidebar
