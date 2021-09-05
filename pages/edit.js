import React from 'react'
import Head from 'next/head'
import Sidebar from '../components/editor/Sidebar'
import $ from "jquery";
import {getTokenFromBearer, isBearerToken, uidFromToken} from "../utils/token";
import {apiBaseUrl} from "../utils/network";
import NotificationWrapper from "../components/dashboard/NotificationWrapper";
import * as path from "path";



class Edit extends React.Component {
    state = {
        siteLoaded: false,
        content: undefined,
        siteId: undefined,
        siteMap: undefined,
        seoSettings: undefined,
        imagePaths: undefined,
        activePage: "",
        notification: {notify: false, message: "", type: undefined}
    };

    componentDidMount() {

        $( "#p1-search" ).click(function() {
            $( "#p1-header" ).addClass( "header-search-off" );
            $( "#p1-close-search" ).addClass( "on" );
            $( "#p1-search" ).addClass( "off" );
        });

        $( "#p1-close-search" ).click(function() {
            $( "#p1-header" ).removeClass( "header-search-off" );

            $( this ).toggleClass( "off" );
            $( this ).toggleClass( "on" );

            $( "#p1-search" ).removeClass( "off" );
            $( "#p1-search" ).addClass( "on" );
        });

        $('.page-item').mouseover( function () {
            $('.page-item').children('page-seo-wrapper').css('opacity', '1')
        })

        $('body').css('overflow', 'hidden')

        $('html').addClass('blue')

        $(document).on('mouseover mousedown', 'img', function() {
            return false;
        });




        const bearerToken = localStorage.getItem("token");
        if (!isBearerToken(bearerToken)) {
            location.pathname = "/login";
        }
        const jwtToken = getTokenFromBearer(bearerToken);
        const uid = uidFromToken(jwtToken);
        const siteId = location.search.split("=")[1];
        this.setState({siteId, uid});
        $.ajax(
            {
                type: "POST",
                url: `${apiBaseUrl}/api/editor/${siteId}/download`,
                headers: {authorization: bearerToken},
                contentType: "application/json",
            }).then((response) => {
            this.setState({siteLoaded: true});
        }).catch(console.error);

        $.ajax(
            {
                type: "GET",
                url: apiBaseUrl + `/api/site/${siteId}/sitemap`,
                headers: {authorization: bearerToken},
            }
        )
            .then((response) => {
                this.setState({ siteMap: response})
                }
            ).catch((error) => {
            console.log("Could not get sitemap");
        });

        this.getSeoSettings(bearerToken, siteId);

    }


    getSeoSettings = (bearerToken, siteId) => {
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

    addEditStyleClass = () => {
        const myIframe = document.getElementById("myIframe");
        const styleTag = document.createElement("style");
        const styleClass = document.createTextNode(".base__currentobj { outline-offset: 4px; outline: 2px var(--darkgrey) solid; }");
        styleTag.type = "text/css";
        styleTag.appendChild(styleClass);
        myIframe.contentDocument.head.appendChild(styleTag);
    };

    removeStyleClass = () => {
        const myIframe = document.getElementById("myIframe");
        const styleTagsInHead = myIframe.contentDocument.head.querySelectorAll("style");
        styleTagsInHead.item(styleTagsInHead.length - 1).remove();

    };

    handleMouseenter = (evt) => {
        evt.target.contentEditable = "true";
        evt.target.classList.add("base__currentobj");
    };

    handleMouseleave = (evt) => {
        evt.target.removeAttribute("conentEditable");
        evt.target.classList.remove("base__currentobj");
    };

    makeContentEditable = () => {
        const myIframe = document.getElementById("myIframe");
        const tags = myIframe.contentDocument.body.querySelectorAll('h1,h2,h3,h4,h5,h6,a,p,span,label,li,[edit="true"]');
        this.addEditStyleClass();
        tags.forEach(element => {
            element.addEventListener("mouseenter", this.handleMouseenter)
            element.addEventListener("mouseleave", this.handleMouseleave)
        });
    };

    makeContentNotEditable = () => {
        const myIframe = document.getElementById("myIframe");
        const tags = myIframe.contentDocument.body.querySelectorAll('h1,h2,h3,h4,h5,h6,a,p,span,label,li,[edit="true"]');
        tags.forEach(element => {
            element.removeAttribute("contentEditable");
            element.removeEventListener("mouseenter", this.handleMouseenter);
            element.removeEventListener("mouseleave", this.handleMouseleave);
        });
    };

    edit() {
        $("#myIframe").contents().find("a").each((index, element) => {
            element.setAttribute("bref", element.attributes.href.value);
            element.removeAttribute("href");
        });
        const myIframe = document.getElementById("myIframe");
        this.makeContentEditable();
        this.setState({notification: {notify: true, message: "You can now edit", type: "success",}});
        setTimeout(()=> this.setState({notification: {notify: false, message: "", type: undefined}}),3000);
    }

    save() {
        const { siteId } = this.state;
        const bearerToken = localStorage.getItem("token");
        if (!isBearerToken(bearerToken)) {
            location.pathname = "/login";
        }
        $("#myIframe").contents().find("a").each((index, element) => {
            element.setAttribute("href", element.attributes.bref.value);
            element.removeAttribute("bref");
        });
        const myIframe = document.getElementById("myIframe");
        this.makeContentNotEditable();
        this.removeStyleClass();
        const bodyContent = myIframe.contentDocument.body.innerHTML;
        const headContent = myIframe.contentDocument.head.innerHTML;
        const htmlFile = myIframe.contentDocument.URL.split("/").slice(3).join("/");
        $.ajax(
            {
                type: "POST",
                url: `${apiBaseUrl}/api/editor/${siteId}/save`,
                headers: {authorization: bearerToken},
                data: JSON.stringify({siteId: this.state.siteId, content: bodyContent, head: headContent, fileName: htmlFile}),
                contentType: "application/json",
            }).then((response) => {
            this.setState({notification: {notify: true, message: "The site has been saved", type: "success",}})
            setTimeout(()=>this.setState({notification: {notify: false, message: "", type: undefined}}),3000);
        }).catch(console.error);
    }

    publish() {
        const { siteId } = this.state;
        const bearerToken = localStorage.getItem("token");
        if (!isBearerToken(bearerToken)) {
            location.pathname = "/login";
        }
        $.ajax(
            {
                type: "POST",
                url:`${apiBaseUrl}/api/editor/${siteId}/publish`,
                headers: {authorization: bearerToken},
                contentType: "application/json",
            }).then((response) => {
            this.setState({notification: {notify: true, message: "Site was published", type: "success",}})
            setTimeout(()=>this.setState({notification: {notify: false, message: "", type: undefined}}),6000);
        }).catch((response) => {
            this.setState({notification: {notify: true, message: "Site could not be published", type: "failure",}})
            setTimeout(()=>this.setState({notification: {notify: false, message: "", type: undefined}}),6000);
        });

    }

    renderEditIframe() {
        const {uid, siteId, siteLoaded, activePage} = this.state;
        if (uid && siteId && siteLoaded) {
            return (
                <iframe id="myIframe" src={path.join(uid, siteId, "site/", activePage)}
                        width={"100%"} height={"100%"}/>
            )
        }
        return (<div className="editor-loading">Site is loading</div>);

    }

    renderNotification() {
        if (this.state.notification.notify) {
            return <NotificationWrapper message={this.state.notification.message} type={this.state.notification.type}
                                        onClose={() => this.setState({
                                            notification: {
                                                notify: false,
                                                message: "",
                                                type: undefined
                                            }
                                        })}/>
        }
        return <></>
    }


    render() {
        return (
            <div className="editor">
                <Head>
                    <title>Base Cms - Editor</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width heigth=device-heigth"/>
                </Head>
                {this.renderEditIframe()}
                {this.renderNotification()}

                <div className="sidebarbg"></div>
                <Sidebar
                    onEdit={() => this.edit()}
                    onSave={() => this.save()}
                    onPublish={() => this.publish()}
                    changeSite={(newActivePage) => {
                        console.log(newActivePage);
                        this.setState({activePage: newActivePage});
                    }}
                    siteMap={this.state.siteMap}
                    seoSettings={this.state.seoSettings}
                    activePage={this.state.activePage}
                />



               

                
    <style jsx >{`

    @font-face {
        font-family: "Inter";
        src: url("/font/Inter-300.woff") format("woff"), weight:300;
        src: url("/font/Inter-400.woff") format("woff"), weight:400;
        src: url("/font/Inter-500.woff") format("woff"), weight:500;
        src: url("/font/Inter-600.woff") format("woff"), weight:600;
        src: url("/font/Inter-700.woff") format("woff"), weight:700;
        src: url("/font/Inter-800.woff") format("woff"), weight:800;
    }

    body {
        font-family: Inter, sans-serif;
    }


    .on {opacity: 0}

    .base__currentobj {
        background: rgba(255,255,255,0.02) !important;
        outline: 1px dotted #666 !important;
    }

    .seoInput > input {
        width: 100%;
    }
        
    `}</style>  


<script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.4/lottie.min.js" crossOrigin="anonymous"></script>

</div>

        );
    }

}

export default Edit
