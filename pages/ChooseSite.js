import React from 'react';
import Head from 'next/head';


const ChooseSite = () => {
    


return (

<div>

<Head>
    <title>BASE - Choose a Site</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
    <link href="/css/dashboard.css" rel="stylesheet" />
</Head>

<div className="page">
    <div className="login">
        <h1 className="headline">Choose a Site</h1>
        <p className="p">Click on the page you want to edit</p>
        <div className="choose-site-wrapper">
            <a className="choose-site-item">
                <div className="choose-site-short">WN</div>
                <p className="choose-site-name">Website Name</p>
            </a>
            <a className="choose-site-item">
                <div className="choose-site-short">TL</div>
                <p className="choose-site-name">Therapy Loft</p>
            </a>
           
        </div>

    </div>
</div>


<style jsx>{`

.choose-site-wrapper {
    width: 100%;
    max-height: 320px;
    overflow-y: scroll;
    overflow-x: hidden;
}

.p {margin-top: -10px; margin-bottom: 20px; color: #fff;}

.choose-site-item {
    padding: 8px;
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    margin-bottom: 8px;
    cursor: pointer;
    transition: ease 0.2s;
    border: 1px solid rgba(255,255,255,0.2);
    font-weight: 600;
}

.choose-site-item:hover {background: rgba(255, 255, 255, 0.4);border: 1px solid #fff;}

.choose-site-short {
    height: 52px;
    width: 52px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 6px;
    margin-right: 12px;
    color: #FF9CAE;
    font-size: 22px;
    text-transform: uppercase;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
}


`}</style>

</div>

)};

export default ChooseSite