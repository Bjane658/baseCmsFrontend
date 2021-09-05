import React from "react";


class FunctionBar extends React.Component {


    renderFunctionbar = () => {
        return (
            <div className="funktionsbar">
                <div className={`searchWrapper ${this.props.disable ? "notHighlighted disabled" : ""}`}>
                    <img src="../dashboard/search-icon-small.svg" className="searchInput"/>
                    <input disabled={this.props.disable ? true : false} value={this.props.siteFilter}
                           onChange={(event) => this.props.onSiteFilterChange(event.target.value)}
                           type="text" className="websiteSuche" placeholder="Search Site" id="search"/>
                    {this.props.siteFilter.length > 0 && !this.props.disable ?
                        <img src="../dashboard/clear-input-icon.svg" className="clearInput"
                             onClick={() => this.props.onSiteFilterChange("")}/> : <></>}
                </div>
                <div className={`addSiteButton ${this.props.disable ? "notHighlighted disabled" : ""}`} id="addsite">
                    <svg x="0px" y="0px" viewBox="0 0 440 440" xmlSpace="preserve" width="16px">
                        <path d="M2.1,183.6c60,0,118.3,0,180,0c0-61.6,0-121.3,0-182.4c26.6,0,49.9,0,76.1,0c0,60.3,0,119.4,0,181.1c61,0,119.2,0,179.7,0c0,25.6,0,48.6,0,74.1c-58.8,0-117,0-178.9,0c0,61.9,0,121.6,0,182.3c-27,0-50.3,0-75.8,0c0-60.4,0-119.5,0-181.2c-61.2,0-120.2,0-181,0C2.1,232.6,2.1,210.2,2.1,183.6z"/>
                    </svg>
                </div>
            </div>
        );
    };

    render = () => {
        return (
            <>
                {this.props.hide ? (<></>) : this.renderFunctionbar()}
            </>
        )
    };
}

export default FunctionBar
