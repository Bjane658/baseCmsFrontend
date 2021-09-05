import React, { useEffect } from 'react'
import $ from 'jquery'



class Forms extends React.Component {

componentDidMount () {
    $('.item').mouseover( function () {
        $(this).find('.item-img').addClass('item-img-hover')
        $(this).find('.page-item-icon').css('opacity', '100%')
    })

    $('.item').mouseout( function () {
        $(this).find('.item-img').removeClass('item-img-hover')
        $(this).find('.page-item-icon').css('opacity', '40%')
    })
}

render = () => {

return (

            <div className="sidebar-tab-inner" id="form">
                <div className="header">
                    <div className="header-inner">
                        <h2 className="header-h">Forms</h2>
                        <div className="header-functions">
                            <div className="tab-header-button">
                                <img className="search" src="../dashboard/search-icon-small.svg" />
                            </div>
                        </div>
                    </div>
                </div>

                    <div style={{width: '100%'}} className="list">

                    <div className="item-wrapper">
                        <div className="item">
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <img className="page-item-icon" src="../editor/form-icon.svg" width="22px" style={{marginRight: '20px', opacity: '0.6'}}/>
                                <div className="page-name">Blog</div>
                            </div>
                            <img src="../editor/arrow-right.svg" className="item-img" width="15px" />
                        </div>
                    </div>

                </div>
            </div>




)};
}

export default Forms