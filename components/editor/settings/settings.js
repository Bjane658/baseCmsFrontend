import React, { useEffect } from 'react'
import $ from 'jquery'


class Settings extends React.Component {


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

        <div className="sidebar-tab-inner">
            <div className="header">
                <div className="header-inner">
                    <h2 className="header-h">Settings</h2>
                    <div className="header-functions">
                        <div className="tab-header-button">
                            <img width="16" src="../editor/profil-icon.svg" />
                        </div>
                    </div>
                </div>
            </div>

                <div style={{width: '100%'}} className="list">

                    <div className="item-wrapper">
                        <div className="item">
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <img className="page-item-icon" src="../editor/backup-icon.svg" width="22px" style={{marginRight: '20px', opacity: '0.6'}}/>
                                <div className="page-name">Backups</div>
                            </div>
                            <img src="../editor/arrow-right.svg" className="item-img" width="15px" />
                        </div>
                    </div>

                    <div className="item-wrapper">
                        <div className="item">
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <img className="page-item-icon" src="../editor/webflow-icon.svg" width="25px" style={{marginRight: '20px', opacity: '0.6'}}/>
                                <div className="page-name">Webflow Import</div>
                            </div>
                            <img src="../editor/arrow-right.svg" className="item-img" width="15px" />
                        </div>
                    </div>

                    <div className="item-wrapper">
                        <div className="item">
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <img className="page-item-icon" src="../editor/language-icon.svg" width="25px" style={{marginRight: '20px', opacity: '0.6'}}/>
                                <div className="page-name">Change Language</div>
                            </div>
                            <img src="../editor/arrow-right.svg" className="item-img" width="15px" />
                        </div>
                    </div>

                    <div className="item-wrapper">
                        <div className="item">
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <img className="page-item-icon" src="../editor/language-icon.svg" width="25px" style={{marginRight: '20px', opacity: '0.6'}}/>
                                <div className="page-name">Domain Settings</div>
                            </div>
                            <img src="../editor/arrow-right.svg" className="item-img" width="15px" />
                        </div>
                    </div>

                    <div className="item-wrapper">
                        <div className="item">
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <img className="page-item-icon" src="../editor/language-icon.svg" width="25px" style={{marginRight: '20px', opacity: '0.6'}}/>
                                <div className="page-name">Check Cookies</div>
                            </div>
                            <img src="../editor/arrow-right.svg" className="item-img" width="15px" />
                        </div>
                    </div>

                    <div className="item-wrapper">
                        <div className="item">
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <img className="page-item-icon" src="../editor/language-icon.svg" width="25px" style={{marginRight: '20px', opacity: '0.6'}}/>
                                <div className="page-name">Sitemap</div>
                            </div>
                            <img src="../editor/arrow-right.svg" className="item-img" width="15px" />
                        </div>
                    </div>

                    <div className="item-wrapper">
                        <div className="item">
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <img className="page-item-icon" src="../editor/language-icon.svg" width="25px" style={{marginRight: '20px', opacity: '0.6'}}/>
                                <div className="page-name">Robot.txt</div>
                            </div>
                            <img src="../editor/arrow-right.svg" className="item-img" width="15px" />
                        </div>
                    </div>

                </div>
            </div>



)};
}

export default Settings