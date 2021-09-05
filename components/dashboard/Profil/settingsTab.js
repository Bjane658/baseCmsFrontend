import React, { useEffect } from 'react'
import $ from 'jquery'



class SettingsTab extends React.Component {

    componentDidMount () {
        $('#dark').click( function () {
            $('html').removeClass('red blue green purple')
        })

        $('#blue').click( function () {
            $('html').addClass('blue')
            $('html').removeClass('purple green red')
        })

        $('#red').click( function () {
            $('html').addClass('red')
            $('html').removeClass('purple green blue')
        })

        $('#green').click( function () {
            $('html').addClass('green')
            $('html').removeClass('red purple blue')
        })

        $('#purple').click( function () {
            $('html').addClass('purple')
            $('html').removeClass('red green blue')
        })
    }


render = () => {

return (

<div style={{diplay: 'flex', flexDirection: 'column', width: '100%'}}>

    <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' ,marginBottom: '40px'}}>
        <div className="colors" id="dark"></div>
        <div className="colors" id="green"></div>
        <div className="colors" id="blue"></div>
        <div className="colors" id="purple"></div>
        <div className="colors" id="red"></div>
    </div>


<style jsx >{`

    .colors {
        height: 36px;
        width: 36px;
        border: 1px solid rgba(255,255,255,0.4);
        margin-right: 6px;
        pointer: cursor;
        border-radius: 4px;
    }

    #dark {
        background: #3c3839;
    }

    #blue {
        background: #456079;
    }

    #red {
        background: #b24c4c;
    }

    #green {
        background: #427c5e;
    }

    #purple {
        background: #844199;
    }


`}</style>

</div>

)};
}

export default SettingsTab