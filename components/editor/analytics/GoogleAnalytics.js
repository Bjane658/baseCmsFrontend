import React, { useEffect } from 'react'



class GoogleAnalytics extends React.Component {


render = () => {

return (

    <div className="AnalyticsGrid">
        <div className="AnalyticsItem">
            <div style={{fontSize: '42px', fontWeight: '700', lineHeight: '140%'}}>2.378</div>
            <div className="page-name">Pageviews</div>
            <div className="AnalyticsIndicator" >+ 12%</div>
        </div>

        <div className="AnalyticsItem">
            <div style={{fontSize: '42px', fontWeight: '700', lineHeight: '120%'}}>9.456</div>
            <div className="page-name">Impressions</div>
            <div className="AnalyticsIndicator" >+ 4%</div>
        </div>

        <div className="AnalyticsItem">
            <div style={{fontSize: '42px', fontWeight: '700', lineHeight: '120%'}}>8.43</div>
            <div className="page-name">Conversion Rate</div>
            <div className="AnalyticsIndicator" >+ 0.82%</div>
        </div>

        <div className="AnalyticsItem">
            <div style={{fontSize: '42px', fontWeight: '700', lineHeight: '120%'}}>2.34</div>
            <div className="page-name">Bounce Rate</div>
            <div className="AnalyticsIndicator" >- 0.11%</div>
        </div>

        <div className="AnalyticsItem">
            <div style={{fontSize: '42px', fontWeight: '700', lineHeight: '120%'}}>52.4</div>
            <div className="page-name">Avg. Time (s) / Session</div>
            <div className="AnalyticsIndicator">+ 22s</div>
        </div>

        <div className="AnalyticsItem">
            <div style={{fontSize: '42px', fontWeight: '700', lineHeight: '120%'}}>2.1</div>
            <div className="page-name">Pages / Sessions</div>
            <div className="AnalyticsIndicator" >+  0</div>
        </div>

        <div className="AnalyticsItem-big">
            <div className="page-name">Site Traffic</div>
        </div>

        <div className="AnalyticsItem-big">
            <div className="page-name">Pages / Sessions</div>
        </div>


    </div>

)};
}

export default GoogleAnalytics