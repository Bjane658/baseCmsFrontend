import React from "react";


class StartScreen extends React.Component {

    componentDidMount() {

        lottie.loadAnimation({
            container: document.getElementById('newSite'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '../dashboard/newSite.json'
        });

    }


render = () => {
  return (
    
    <div className="startViewWrapper">
        <div className="startViewInner">
            <h1>Let's add your<br/> first Project together</h1>
            <a className="button" id="empty-image">ADD WEBSITE</a>
            <a href="#" className="tutorial-link">Watch tutorial</a>
        </div>
        <div id="newSite"></div>



<style jsx >{`

    #newSite {
        width: 600px; 
        height: 550px; 
        margin: -60px 0 0 0;
        max-width: 100%;
        z-index: 1;
    }

    .empty-image {
        width: 80vw;
        max-width: 450px;
        margin-bottom: 40px;
    }

    .tutorial-link {
        margin-top: 20px;
        margin-left: 0px;
        color: #fff;
        text-decoration: none;
        font-size: 14px;
        opacity: 0.8;
        transition: 0.2s all;
    }
    
    .tutorial-link:hover {
        font-weight: 400;
        text-decoration: underline;
        opacity: 1;
    }

    .startViewInner {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        position: relative;
        z-index: 10;
        margin: -40px 0;
    }

    .startViewWrapper {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        min-height: 50vh;
        padding-top: 20px;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        color: #fff;
        width: 84vw;
        text-align: center;
    }

    .startViewWrapper h1 {
        font-weight: 500;
        font-size: 28px;
        line-height: 134%;
    }

    @media screen and (max-width: 800px) {
        
        #newSite {
            width: 520px; 
            height: 440px; 
            margin: -60px 0;
        }

    }

    @media screen and (max-width: 479px) {
        .startViewWrapper {
            padding-top: 0px;
            padding-bottom: 0px;
        }

        .startViewWrapper h1 {
            font-weight: 400;
            font-size: 24px;
            margin-bottom: 20px;
        }

        .startViewInner {
            margin: 0;
        }

        #newSite {
            margin: -20px 0 0 0;
        }
    }

    @media screen and (max-width: 351px) {
        .startViewWrapper {
            min-height: 0vh;
        }
    }

    
`}</style>

</div>

)};
} 
export default StartScreen