import React from 'react'
import EmptySearch from '../components/dashboard/SearchEmptyState'
import WebsiteItem from '../components/dashboard/WebsiteItem'
import StartScreen from '../components/dashboard/StartScreen'
import DashboardProfil from '../components/dashboard/Profil/ProfilModal'
import DashboardLogout from '../components/dashboard/LogoutModal'
import $ from "jquery"
import Head from 'next/head'
import {isBearerToken, uidFromBearerToken} from "../utils/token";
import {apiBaseUrl} from "../utils/network";
import NotificationWrapper from "../components/dashboard/NotificationWrapper";
import DashboardAddSite from "../components/dashboard/AddNewSite/AddSiteModal";
import WebsiteDelete from "../components/dashboard/WebsiteDelete";
import ScreenshotModal from "../components/dashboard/ScreenshotModal";
import FunctionBar from "../components/dashboard/FunctionBar";



class Dashboard extends React.Component {



    state = {
        notification: {notify: false, message: "", type: undefined},
        sites: undefined,
        siteFilter: "",
        siteSelected: false,
        selectedSite: "",
        userId: undefined
    };

    componentDidMount() {
        const bearerToken = localStorage.getItem("token");
        if (!isBearerToken(bearerToken)) {
            location.pathname = "/login";
        }
        
        this.setState({userId: uidFromBearerToken(bearerToken)});
        this.fetchSites(bearerToken);

        $(window).keydown(function(e){
            if ((e.ctrlKey || e.metaKey) && e.keyCode === 70) {
                e.preventDefault();
                $(".websiteSuche").focus()
            }
        });

        $('html').addClass('blue')

        // document.addEventListener("contextmenu", function(e){
        //    e.preventDefault();
        // }, false)

    }

    fetchSites = (bearerToken) => {
        $.ajax(
            {
                type: "GET",
                url: apiBaseUrl + "/api/sites",
                headers: {authorization: bearerToken}
            }
        )
            .then((response) => {
                    const sortedSites = response.sites.sort((first, second) => {
                        if (first.created > second.created) {
                            return -1;
                        } else {
                            return 1;
                        }
                    });
                    this.setState({sites: undefined});
                    this.setState({sites: sortedSites})
                }
            ).catch((error) => {
            console.log(error);
        });

    };

    filterSites(filterText) {
        const {sites} = this.state;
        if(sites === undefined) {
            return undefined;
        }
        const filtered = sites.filter(site => site.name.toLowerCase().includes(filterText.toLowerCase()));
        return filtered;

    }

    deleteSite(siteId) {
        const bearerToken = localStorage.getItem("token");
        $.ajax({
            type: "DELETE",
            url: `${apiBaseUrl}/api/site/${siteId}`,
            contentType: 'application/json',
            headers: {authorization: bearerToken}
        }).then((response) => {
            this.fetchSites(bearerToken);
            this.setState(this.setState({notification: {notify: true, message: "Site was deleted", type: "success"}}));
            setTimeout(()=>this.setState({notification: {notify: false, message: "", type: undefined}}),6000);
        }).catch(error => console.log(error));
    }

    highlightSite(siteId, isSelected) {
        let changedSites;
        if (!isSelected) {
            changedSites = this.state.sites.map((site) => {
                site["highlighted"] = undefined;
                return site;
            })
        } else {
            changedSites = this.state.sites.map((site) => {
                if (site.siteId === siteId) {
                    site["highlighted"] = true;
                    return site;
                }
                site["highlighted"] = false;
                return site;
            });

        }
        this.setState({sites: changedSites, siteSelected: isSelected, selectedSite: siteId});
    }

    changeSiteName(siteId, newName) {
       const changedSites = this.state.sites.map((site) => {
           if(site.siteId === siteId){
               site["name"] = newName;
               return site;
           }
           return site;
       });
        this.setState({sites: changedSites});
    }

    renderSites() {
        const {sites, siteFilter} = this.state;
        const filtered = this.filterSites(siteFilter);
        if(sites === undefined){
            return (<></>);
        }
        if (sites.length === 0) {
            return (<StartScreen/>);
        }
        if (filtered === undefined || filtered.length === 0) {
            return (<EmptySearch clearSearch={() => this.setState({siteFilter: ""})}/>);
        }
        return (filtered.map((site, index) => <WebsiteItem key={index} index={index} name={site.name} siteId={site.siteId}
                                                           screenshot={site.screenshot} highlighted={site.highlighted}
                                                           onDelete={() => this.deleteSite(site.siteId)}
                                                           onSelect={(selected) => this.highlightSite(site.siteId, selected)}
                                                           onChangeName={(updatedName) => this.changeSiteName(site.siteId, updatedName)}
                                                           onNotification={(notificationObject) => this.setState({notification: notificationObject})}
                                                           selectSite={() => this.setState({selectedSite: site.siteId})}
        />));
    }

    renderNotification() {
        if(this.state.notification.notify){
            return <NotificationWrapper message={this.state.notification.message} type={this.state.notification.type} onClose={() => this.setState({notification: {notify: false, message: "", type: undefined}})}/>
        }
        return <></>
    }

    getUrlFromSelectedSite = () => {
        const {userId, selectedSite} = this.state;
        return `${apiBaseUrl}/${userId}/${selectedSite}/site`;
    };

    render() {
        const {sites, siteFilter, siteSelected} = this.state;

        return (

    <div>
    {this.renderNotification()}

    <Head>
        <title>BASE - Dashboard</title>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
        <meta name="robots" content="noindex" />
    </Head>
    <DashboardProfil onNotification={(notificationObject)=> this.setState({notification: notificationObject})}/>
    <DashboardLogout/>
    <WebsiteDelete/>
    <DashboardAddSite
        onAddSiteSuccess={(site) => {
            const newSites = [site].concat(this.state.sites);
            this.setState({sites: newSites});
        }}

        onScreenshotSuccess={(screenshotSiteId, screenshotAsBase64) => {
            const updatedSitesWithScreenshot = this.state.sites.map(site => {
                if (site.siteId === screenshotSiteId) {
                    let newSite = site;
                    newSite["screenshot"] = screenshotAsBase64;
                    newSite["siteId"] = screenshotSiteId;
                    return newSite;
                }
                return site;
            });
            this.setState({sites: updatedSitesWithScreenshot});
        }}
    />
    <ScreenshotModal selectedSite={this.state.selectedSite} url={this.getUrlFromSelectedSite()}/>

    <div className="preloader">
        <img src="../dashboard/base-cms-logo.svg" className="preload-logo" width="200" height="60"/>
    </div>


    <div id="dashboard">
        <nav className="navbar">
            <img src="../dashboard/base-cms-logo.svg" className="logo" width="100" height="30" />
            <div className={`nav ${siteSelected ? 'not-highlighted' : ''}`}>
                <p id="profil" className="nav-link" >Profil</p>
                <p id="logout-nav" className="nav-link">Logout</p>
            </div>
        </nav>

            <main className="main">
                <div className="sites">
                    <FunctionBar hide={sites === undefined || sites.length === 0} disable={siteSelected} siteFilter={siteFilter} onSiteFilterChange={(changedValue) => this.setState({siteFilter: changedValue})}/>
                    <div className="grid">
                        {this.renderSites()}
                    </div>

                </div>
            </main>

    </div>


















<style jsx global>{`

@font-face {
    font-family: "Inter";
    src: url("/font/Inter-300.woff") format("woff"), weight:300;
    src: url("/font/Inter-400.woff") format("woff"), weight:400;
    src: url("/font/Inter-500.woff") format("woff"), weight:500;
    src: url("/font/Inter-600.woff") format("woff"), weight:600;
    src: url("/font/Inter-700.woff") format("woff"), weight:700;
    src: url("/font/Inter-800.woff") format("woff"), weight:800;
}

`}</style>






<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" crossOrigin="anonymous"></script>

</div>
        )
    };
}

export default Dashboard
