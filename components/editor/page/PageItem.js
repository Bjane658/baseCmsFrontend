import React from 'react'
import $ from 'jquery'



class PageItem extends React.Component {

    componentDidMount () {

        $('.item-wrapper').mouseover( function () {
            $(this).find('.page-item-icon').css('opacity', '100%')
            $(this).find('.setting-button').css('opacity', '100%')
        })

        $('.item-wrapper').mouseleave( function () {
            $(this).find('.page-item-icon').css('opacity', '40%')
            $(this).find('.setting-button').css('opacity', '0%')
        })

    }

    render = () => {

        return (
            <div className="item-wrapper">
                <div className="item" onClick={this.props.onClick}>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <img className="page-item-icon" src="./editor/page-icon.svg" width="20" style={{marginRight: '12px', opacity: '0.4'}}/>
                        <div className="page-name">{this.props.name.replace("-", " ")}</div>
                    </div>
                    <div></div>
                </div>
                <div className="page-seo-wrapper" onClick={this.props.onClickSeo}>
                    <div className="setting-button pagesettings" style={{opacity: '0'}}>
                        <img src="../editor/settings-icon.svg" width="12px" />
                    </div>
                </div>
                <div className={`${this.props.isActive ? 'currentSite' : ''}`}></div>
            </div>

        )};
}

export default PageItem
