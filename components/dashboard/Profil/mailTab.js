import React, { useEffect } from 'react'



class MailTab extends React.Component {


render = () => {

return (

<div>
    <div className="profil-label" style={{marginBottom: '8px'}}>Current Mail</div>
    <div style={{fontWeight: '700', fontSize: '18px', marginBottom: '12px'}}>{this.email} tim@emailadress.com</div>
    <input onBlur={(event) => this.updateUser(event)} value={this.company} onChange={(event) => this.setState({username: event.target.value})} type="email" className="db-input" name="NewMail" placeholder="Enter New Email"/>
    <div className="button" style={{marginBottom: '4px'}}>Change Email</div>
</div>

)};
}

export default MailTab