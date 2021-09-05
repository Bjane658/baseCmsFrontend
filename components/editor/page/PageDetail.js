import React, { useEffect } from 'react'


class PageDetail extends React.Component {


render = () => {

return (

    <div className="sidebar-tab-inner">
        
        <div className="page-header">
                <div className="back-to-page-e1">
                    <img src="https://assets.website-files.com/5fc4e722a01385f2f72217f2/5fc50dbc1f9417ae7912d7e7_pfeil-nuggs.svg" width={26} alt="" className="back-arrow" />
                    <h2 className="header-headline">Back</h2>
                </div>
        </div>

        <div className="page-name-wrapper">
            <h5 id="title" contentEditable="true" className="page-name-changeable">Service</h5>
            <div>
                <p id="description" className="domain">https://your-website.de/</p>
                <p id="slug" contentEditable="true" className="slug">service</p>
            </div>
        </div>
        
        <div className="headline-wrapper">
            <h4 className="sdHeadline"> Search Preview</h4>
            <div className="info-button">i</div>
        </div>
        
        <div className="google-preview">
            <h5 id="title" contentEditable="true" className="title">Service</h5>
            <div className="domain-preview">https://www.testdomain.de/about</div>
            <p id="description" contentEditable="true" className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
        </div>
            
        <div className="headline-wrapper">
            <h4 className="sdHeadline">Social Media Preview</h4>
            <div className="info-button">i</div>
        </div>
        
        <div className="page-information">
            <div className="open-graph">
                <div className="og-image-wrapper">
                    <img src="https://assets.website-files.com/5fc4e722a01385f2f72217f2/5fc50dbc1f9417382a12d7e2_5de804be65d48a34bae335c8_cathal-mac-an-bheatha-MxOc_5_CsaY-unsplash.jpg" sizes="(max-width: 479px) 77vw, (max-width: 767px) 78vw, 432px" className="og-image" />
                    <div className="og-image-overlay">
                        <div className="og-image-button">Change Image</div>
                        <input type="file" className="chooseFile" />
                        <div className="text-block">Make sure your images are at least 1200px by 630px </div>
                    </div>
                </div>
                <div className="og-text">
                    <h5 id="og-title" contentEditable="true" className="title">Service</h5>
                    <div className="domain-preview">https://www.testdomain.de/about</div>
                    <p id="og-description" contentEditable="true" className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero</p>
                </div>
            </div>
        </div>
        
        <div>
            <label className="w-checkbox uebernehmen">
                <input type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" className="w-checkbox-input checkbox" /><span className="w-form-label">Same as SEO Title and Description</span>
            </label>
        </div>

        <div className="headline-wrapper">
            <h4 className="sdHeadline"> Structered Data</h4>
            <div className="info-button">i</div>
        </div>

        <div className="list">
            <div className="item-wrapper">
                <div className="item">
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <img className="page-item-icon" src="./editor/page-icon.svg" width="20" style={{marginRight: '12px', opacity: '0.4'}}/>
                        <div className="page-name">Local Buisness</div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>


        <div className="headline-wrapper">
            <h4 className="sdHeadline"> Keywords <span> (optional)</span></h4>
            <div className="info-button">i</div>
        </div>

        <div className="google-preview">

        </div>
            

    </div>




)};
}

export default PageDetail
