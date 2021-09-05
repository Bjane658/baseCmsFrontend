import React, { useEffect } from 'react'
import $ from "jquery"



class Database extends React.Component {

componentDidMount () {
    $('.item').mouseover( function () {
        $(this).find('.item-img').addClass('item-img-hover')
        $(this).find('.page-item-icon').css('opacity', '100%')
    })
    $('.item').mouseout( function () {
        $(this).find('.item-img').removeClass('item-img-hover')
        $(this).find('.page-item-icon').css('opacity', '60%')
    })
}




render = () => {

return (

        <div className="sidebar-tab-inner">
            <div className="header">
                    <div className="header-inner">
                        <h2 className="header-h">Datasets</h2>
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
                                <img className="page-item-icon" src="../editor/database-icon.svg" width="22px" style={{marginRight: '20px', opacity: '0.6'}}/>
                                <div className="page-name">Blog</div>
                            </div>
                            <img src="../editor/arrow-right.svg" className="item-img" width="15px" />
                        </div>
                    </div>

                    {/* <div className="item-wrapper">
                        <div className="item">
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <img className="collection-item-img" src="../editor/database-icon.svg" width="22px" style={{marginRight: '20px', opacity: '0.6'}}/>
                                <div className="page-name">Blog Categories</div>
                            </div>
                            <img src="../editor/arrow-right.svg" className="item-img" width="15px" />
                        </div>
                    </div>

                    <div className="item-wrapper">
                        <div className="item">
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <img className="collection-item-img" src="../editor/database-icon.svg" width="22px" style={{marginRight: '20px', opacity: '0.6'}}/>
                                <div className="page-name">Jobs</div>
                            </div>
                            <img src="../editor/arrow-right.svg" className="item-img" width="15px" />
                        </div>
                    </div>

                    <div className="item-wrapper">
                        <div className="item">
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <img className="collection-item-img" src="../editor/database-icon.svg" width="22px" style={{marginRight: '20px', opacity: '0.6'}}/>
                                <div className="page-name">Job Categories</div>
                            </div>
                            <img src="../editor/arrow-right.svg" className="item-img" width="15px" />
                        </div>
                    </div> */}
                </div>
            </div>




)};
}

export default Database