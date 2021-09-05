import React from 'react'
import PageList from "./page/PageList"
import Forms from "./forms/form"
import Database from "./database/database"
import Media from "./Media/media";
import Analytics from "./analytics/analytics"
import Settings from "./settings/settings"
import PageDetail from './page/PageDetail'


class Backend extends React.Component {


    renderContent = () => {
        const { renderSettings } = this.props;
        if (renderSettings.setting === "media") {
            return ( <Media/> )
        }
        if(renderSettings.setting === "pages") {
            return (<PageList siteMap={this.props.siteMap}
                              seoSettings={this.props.seoSettings}
                              activePage={this.props.activePage}
                              changeSite={(newActivePage) => this.props.changeSite(newActivePage)}
            />)
        }
        if (renderSettings.setting === "pagedetail") {
            return ( <PageDetail paths = { this.props.paths }/>)
        }
        if (renderSettings.setting === "form") {
            return ( <Forms paths = { this.props.paths }/>)
        }
        if (renderSettings.setting === "database") {
            return ( <Database paths = { this.props.paths }/>)
        }
        if (renderSettings.setting === "analytics") {
            return ( <Analytics paths = { this.props.paths }/>)
        }
        if (renderSettings.setting === "settings") {
            return ( <Settings paths = { this.props.paths }/>)
        } return ( <> </>)
    };

    render = () => {const{renderSettings} = this.props;
            
        return (
            <div className = { `tab ${renderSettings.show ? '' : 'p1-closed'} ${renderSettings.setting === "media" && renderSettings.show ? '' : ''}` }> { this.renderContent() } </div>
        )
    };

}

export default Backend