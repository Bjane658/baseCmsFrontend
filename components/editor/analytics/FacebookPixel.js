import React, { useEffect } from 'react'



class FacebookPixel extends React.Component {


render = () => {

return (

    <div className="AnalyticsGrid">
        <div className="AnalyticsItem">
            <div className="AnalyticsIndicator" >+ 12%</div>
            <div style={{fontSize: '42px', fontWeight: '700', lineHeight: '140%'}}>2.378</div>
            <div className="page-name">Pageviews</div>
        </div>

        <div className="AnalyticsItem">
            <div className="AnalyticsIndicator" >+ 4%</div>
            <div style={{fontSize: '42px', fontWeight: '700', lineHeight: '120%'}}>9.456</div>
            <div className="page-name">Impressions</div>
        </div>

        <div className="AnalyticsItem">
            <div className="AnalyticsIndicator" >+ 0.82%</div>
            <div style={{fontSize: '42px', fontWeight: '700', lineHeight: '120%'}}>8.43</div>
            <div className="page-name">Conversion Rate</div>
        </div>

        <div className="AnalyticsItem">
            <div className="AnalyticsIndicator" >- 0.11%</div>
            <div style={{fontSize: '42px', fontWeight: '700', lineHeight: '120%'}}>2.34</div>
            <div className="page-name">Bounce Rate</div>
        </div>

        <div className="AnalyticsItem">
            <div className="AnalyticsIndicator">+ 22s</div>
            <div style={{fontSize: '42px', fontWeight: '700', lineHeight: '120%'}}>2.11s</div>
            <div className="page-name">Avg. Time / Session</div>
        </div>

        <div className="AnalyticsItem">
            <div  className="AnalyticsIndicator" >+  0</div>
            <div style={{fontSize: '42px', fontWeight: '700', lineHeight: '120%'}}>2.1</div>
            <div className="page-name">Pages / Sessions</div>
        </div>

    </div>

)};
}

export default FacebookPixel