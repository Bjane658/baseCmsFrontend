import React, { useEffect } from 'react'
import $ from 'jquery'



class AnalyticsStart extends React.Component {


render = () => {

return (

    <div className="media-empty">

          <img src="../editor/analytics-icon.svg" width="100" />

          <p>Here you can connect your Analytics <br/> to see your Pageperformance</p>
          
          <div className="button-big">Connect Google Analytics</div>
          <div className="button-big">Connect Facebook Pixel</div>
          <div className="button-big">Connect Google Optimize</div>
 
    </div>




)};
}

export default AnalyticsStart