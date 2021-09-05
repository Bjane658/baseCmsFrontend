import React, { useEffect } from 'react'
import GoogleAnalytics from './GoogleAnalytics'
import $ from 'jquery'


class Analytics extends React.Component {

    componentDidMount () {
        $('.range-wrapper').css({
            'display': 'none',
            'opacity': '0',
            'transform': 'translate(12px,12px)',
        })

        $('.tab-header-button').mouseover( function () {
            $('.analytics-date').css('opacity', '1')
        })

        $('.tab-header-button').mouseout( function () {
            $('.analytics-date').css('opacity', '0')
        })
    }


    openRangeModal () {
        $('.range-wrapper').css({
            'display': 'block', 'opacity': '1', 'transform': 'translate(0,0)',
        })

        $('.AnalyticsGrid, .analytics-tabs').css({
            'opacity': '0.4', 'filter': 'blur(4px)', 'transform': 'scale(0.94)',
        })

        $('.search').attr('src', '../close-icon.svg')
        $('.tab-header-button').css('opacity', '1')

        $('select').change( function () {
            if ($('select').val() == 'custom') {
                $('.range-wrapper').css('height', '200px')
            } else {
                $('.range-wrapper').css('height', '60px')
            }
        })
    }


render = () => {

return (

        <div className="sidebar-tab-inner">
            <div className="header">
                <div className="header-inner">
                    <h2 className="header-h">Analytics</h2>
                    <div className="header-functions">
                        <div className="tab-header-button">
                            <div className="analytics-date">26.08.21 - 26.09.21</div>
                            <img className="search" src="../editor/datepicker.svg" onClick={() => {this.openRangeModal()} } />
                        </div>
                    </div>
                </div>
            </div>

            <div className="range-wrapper">
                <select style={{width: '100%'}}>
                    <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last Week</option>
                    <option>Last Month</option>
                    <option value="custom">Custom Range</option>
                </select>
            </div>

            <div className="analytics-tabs">
                <div>Analytics</div>
                <div>Pixel</div>
                <div>Integrations</div>
            </div>

            <GoogleAnalytics />

        </div>


)};
}

export default Analytics