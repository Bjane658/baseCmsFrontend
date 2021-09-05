import React from 'react'
import PageItem from "./PageItem";
import $ from "jquery";
import {apiBaseUrl} from "../../../utils/network";
import {isBearerToken} from "../../../utils/token";
import {getSiteIdFromQueryParameter} from "../../../utils/editUtils";


class PageList extends React.Component {

    state = {
        renderPageItems: true,
        siteFilter: "",
        seoSettingsSite: undefined,
        seoContentEditable: false,
        seoTitle: undefined,
        seo_og_title: undefined,
        seo_og_description: undefined,
        seoSettings: undefined,
        search_active: false
    };

    componentDidMount() {
        this.setState({seoSettings: this.props.seoSettings});
    }

    getSeoSettings = () => {
        const siteId = getSiteIdFromQueryParameter();
        const bearerToken = localStorage.getItem("token");
        if (!isBearerToken(bearerToken)) {
            location.pathname = "/login";
        }

        return $.ajax(
            {
                type: "GET",
                url: apiBaseUrl + `/api/editor/${siteId}/seo`,
                headers: {authorization: bearerToken},
            }
        )
            .then((response) => {
                    this.setState({seoSettings: response});
                }
            ).catch((error) => {
            console.log("Could not get seo Settings");
        });
    };

    seoSettingsForSite = (filename) => {
        if(this.state.seoSettings){
            const result = this.state.seoSettings.find((entry) => {
                return entry.site.toLowerCase().includes(filename.toLowerCase());
            });
            if(result){
                this.setState({renderPageItems: false, seoSettingsSite: filename, seoTitle: result.seoTitle, seo_og_title: result.seo_og_title, seo_og_description: result.seo_og_description});
            }
        }
    };

    sanitizeSiteMap = (siteMap) => {
        const result = siteMap.map((site) => {
            const filename = site.filename.split(".").slice(0, -1).join(".");
            const url = site.url.split("/").slice(3).join("/");
            return {filename, url};
        });
        return result;
    };

    saveSeoSettings = () => {
        const siteId = getSiteIdFromQueryParameter();
        const bearerToken = localStorage.getItem("token");
        if (!isBearerToken(bearerToken)) {
            location.pathname = "/login";
        }

        const { seoSettingsSite, seoTitle, seo_og_title, seo_og_description} = this.state;
        const data = {seoSettings: [{ site: seoSettingsSite + ".html", seoTitle, seo_og_title, seo_og_description}]};
        console.log(data);
        $.ajax(
            {
                type: "POST",
                url: apiBaseUrl + `/api/editor/${siteId}/seo`,
                headers: {authorization: bearerToken},
                contentType: "application/json",
                data: JSON.stringify(data)
            }
        )
            .then((response) => {
                console.log("Saved seo settings");
                this.getSeoSettings()
                }
            ).catch((error) => {
            console.log("Could not save seo Settings");
        });

    };

    mergeSiteMapWithSeoSettings = () => {
        const {seoSettings} = this.state;
        return this.props.siteMap.map((site) => {
            site["seoSettings"] = seoSettings ? seoSettings.filter((seoSetting) => site.filename === seoSetting.site).shift() : {"site": "", "seoTitle" : "", "seo_og_description": "", "seo_og_title": ""};
            return site;
        });
    };

    filterSiteMapAndSeoSettings = () => {
        return this.mergeSiteMapWithSeoSettings().filter(site => {
           if(site.filename.toLowerCase().includes(this.state.siteFilter.toLowerCase()) ||
               site.seoSettings["seoTitle"].toLowerCase().includes(this.state.siteFilter.toLowerCase()) ||
               site.seoSettings["seo_og_description"].toLowerCase().includes(this.state.siteFilter.toLowerCase()) ||
               site.seoSettings["seo_og_title"].toLowerCase().includes(this.state.siteFilter.toLowerCase())
           ){
               return true;
           }
           return false;
        })
    };

    filterSiteMap = () => {
       return this.props.siteMap.filter((site) => site.filename.toLowerCase().includes(this.state.siteFilter.toLowerCase()));
    };

    filterSeoSettings = () => {
        const {seoSettings} = this.state;
        const filteredSeoSettings = seoSettings ? seoSettings.filter((site) =>{
           if(site["seoTitle"].toLowerCase().includes(this.state.siteFilter.toLowerCase()) ||
               site["seo_og_description"].toLowerCase().includes(this.state.siteFilter.toLowerCase()) ||
                   site["seo_og_title"].toLowerCase().includes(this.state.siteFilter.toLowerCase())
           ){
               return true;
           }
           return false;
       }) : [];
        return filteredSeoSettings;
    };

    renderPageItems = () => {
        const { siteMap } = this.props;

        return (
            <div className="list">
                {siteMap ? this.sanitizeSiteMap(this.filterSiteMapAndSeoSettings()).map((site, index) =>
                        <PageItem key={`pageE1${index}`}
                                  onClick={() => {
                                      this.props.changeSite(site.url);
                                  }}
                                  name={site.filename}
                                  path={site.url}
                                  onClickSeo={() => {
                                      this.seoSettingsForSite(site.filename);
                                  }}
                                  isActive={this.props.activePage === site.url}
                        />)
                    : <></>
                }
            </div>
        );
    };

    renderSEO = () => {
        const { seoContentEditable, seoTitle, seo_og_title, seo_og_description } = this.state;
        return (
            <>
                <button onClick={() => this.setState({renderPageItems: true})}>zurück</button>
                <button onClick={() => {
                    if(seoContentEditable) {
                        this.saveSeoSettings();
                    }
                    this.setState({ seoContentEditable: !seoContentEditable});
                    }
                }>{seoContentEditable ? "save" : "edit"}</button>
                <div>
                    <div>title:</div>
                    <input readOnly={!seoContentEditable} value={seoTitle} onChange={(event) => this.setState({ seoTitle: event.target.value })}/>
                </div>
                <div>
                    <div>og_title:</div>
                    <input readOnly={!seoContentEditable} value={seo_og_title} onChange={(event) => this.setState({ seo_og_title: event.target.value })}/>
                </div>
                <div>
                    <div>og_description:</div>
                    <input readOnly={!seoContentEditable} value={seo_og_description} onChange={(event) => this.setState({ seo_og_description: event.target.value })}/>
                </div>
            </>
        );
    };

    renderContent = () => {
        return this.state.renderPageItems ? this.renderPageItems() : this.renderSEO();
    };


    render = () => {
        return (

            <div className="sidebar-tab-inner" id="p1">
                <div className="header">
                    <div className="header-inner">
                        <h2 className="header-h">Pages</h2>
                        <div className="header-functions">
                            <div className="tab-header-button">
                                <img src="../editor/language-icon.svg" width="20" />
                            </div>
                            <div className="tab-header-button">
                                <img src="../close-icon.svg" className={`search ${this.state.search_active ? "" : "off"}`} id="p1-close-search"
                                    onClick={() => this.setState({search_active: false})}/>
                                <img src="../dashboard/search-icon-small.svg"
                                    className={`search ${this.state.search_active ? "off" : ""}`} id="p1-search"
                                    onClick={() => this.setState({search_active: true})}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={` ${this.state.search_active ? "header-search" : "off"}`}>
                    <img src="../dashboard/search-icon-small.svg" className="search-icon" />
                    <input type="text"
                            className="searchfield"
                            width="100%"
                            value={this.state.siteFilter}
                            onChange={(event) => {
                                this.setState({siteFilter: event.target.value});
                                this.filterSeoSettings();
                            }
                            } />
                </div>

                {this.renderContent()}

            </div>
        )
    };
}

export default PageList
