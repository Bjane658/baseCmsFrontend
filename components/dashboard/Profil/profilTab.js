import React, { useEffect } from 'react';
import {apiBaseUrl} from "../../../utils/network";
import $ from 'jquery'


class ProfilTab extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        newEmail: "",
        emailConfirmation: "",
        company: "",
        language: "",
        username: "",
        newPassword: "",
        newPasswordConfirm: "",
        isPending: false,
        profileError: undefined,
        fetchedProfile: {firstName: "", lastName: "", username: "", email: ""},
    };

    componentDidMount() {
        const bearerToken = localStorage.getItem("token");
        $.ajax(
            {
                type: "GET",
                url: apiBaseUrl + "/api/user",
                headers: {authorization: bearerToken}
            }
        )
            .then((response) => {
                    let result = response;
                    console.log(response)
                    result.newEmail = response.email;
                    this.setState({fetchedProfile: result, ...result});
                }
            ).catch((error) => {
            this.setState({isPending: false, profileError: "Service nicht verfügbar"});
            console.log(error);
        });
    }

    changePassword = (event) => {
        const bearerToken = localStorage.getItem("token");
        const {newPassword, newPasswordConfirm} = this.state;
        event.preventDefault();
        if(newPassword === newPasswordConfirm && newPassword.length > 4){
        this.setState({isPending: true, profileError: undefined});
            $.ajax({
                type:"POST",
                url: apiBaseUrl + "/api/user/password",
                data: JSON.stringify({password: newPassword}),
                contentType: 'application/json',
                headers: {authorization: bearerToken}
            }).then(() => {
                this.setState({isPending: false});
                this.props.onNotification({notify: true, message: "Password was changed", type: "success"});
                setTimeout(()=>this.props.onNotification({notify: false, message: "", type: undefined}),3000);
            }).catch((error) => {
                console.log(error);
                this.setState({isPending: false});
                this.props.onNotification({notify: true, message: "Password could not be changed", type: "failure"});
                setTimeout(()=>this.props.onNotification({notify: false, message: "", type: undefined}),3000);
            })
        }else{
            this.setState({profileError: "Passwörter müssen gleich sein; Passwort muss mindestens 4 Zeichen lang sein"});
        }
    };
    
    updateEmail = (event) => {
        const bearerToken = localStorage.getItem("token");
        const {newEmail, newEmailConfirmation} = this.state;
        event.preventDefault();
        if(newEmail === newEmailConfirmation){
            $.ajax({
                    type: "PUT",
                    url: apiBaseUrl + "/api/user/email",
                    data: JSON.stringify({email: newEmail}),
                    contentType: 'application/json',
                    headers: {authorization: bearerToken}
                })
                
                .then(() => {
                        this.props.onNotification({notify: true, message: "Email was updated", type: "success"});
                        setTimeout(()=>this.props.onNotification({notify: false, message: "", type: undefined}),3000);
                        this.setState({isPending: false, email: newEmail});
                    }
                ).catch((error) => {
                if (error.status === 422) {
                    this.setState({isPending: false, profileError: "Email already taken"});
                    this.props.onNotification({notify: true, message: "Profile could not be updated", type: "failure"});
                    setTimeout(()=>this.props.onNotification({notify: false, message: "", type: undefined}),3000);
                } else {
                    this.setState({isPending: false, profileError: "Service unavailable"});
                    this.props.onNotification({notify: true, message: "Profile could not be updated", type: "failure"});
                    setTimeout(()=>this.props.onNotification({notify: false, message: "", type: undefined}),3000);
                }
                console.log(error);
            });
            } else {
                this.setState({profileError: "Emails müssen gleich sein"});
            }
    
        };
    
    hasProfileChanged = () => {
        const {fetchedProfile, firstName, lastName, username} = this.state;
        if(firstName !== fetchedProfile.firstName) return true;
        if(lastName !== fetchedProfile.lastName) return true;
        if(username !== fetchedProfile.username) return true;
        return false;
    };
    
    updateUser = (event) => {
        const bearerToken = localStorage.getItem("token");
        const {firstName, lastName, company, username} = this.state;
        event.preventDefault();
        if(!this.hasProfileChanged()) return;
        this.setState({isPending: true, profileError: undefined});
        $.ajax({
                type: "PUT",
                url: apiBaseUrl + "/api/user/profile",
                data: JSON.stringify({firstName, lastName, username, company}),
                contentType: 'application/json',
                headers: {authorization: bearerToken}
        })
        
        .then(() => {
//                this.props.onNotification({notify: true, message: "Profile was updated", type: "success"});
//                setTimeout(()=> this.props.onNotification({notify: false, message: "", type: undefined}),3000);
 //               this.setState({isPending: false, fetchedProfile: {...this.state.fetchedProfile, firstName, lastName, username}});
        })
        .catch((error) => {
        if (error.status === 422) {
 //           this.setState({isPending: false, profileError: "Profile could not be updated"});
//            this.props.onNotification({notify: true, message: "Profile could not be updated", type: "failure"});
            setTimeout(()=>this.props.onNotification({notify: false, message: "", type: undefined}),3000);
        } else {
            this.setState({isPending: false, profileError: "Service nicht verfügbar"});
//            this.props.onNotification({notify: true, message: "Profile could not be updated", type: "failure"});
//            setTimeout(()=>this.props.onNotification({notify: false, message: "", type: undefined}),3000);
        }
        });
    };


render = () => {

const {firstName, lastName, username, email} = this.state.fetchedProfile;

return (

<div className="profil-form">
    <div>
        <label htmlFor="name" className="profil-label">First Name</label>
        <input onBlur={(event) => this.updateUser(event)} value={firstName} onChange={(event) => this.setState({fetchedProfile: {firstName: event.target.value, lastName, username, email}})} type="text" className="db-input" name="Firstname" placeholder="Firstname"/>
    </div>
    <div>
        <label htmlFor="Lastname" className="profil-label">Last Name</label>
        <input onBlur={(event) => this.updateUser(event)} value={lastName} onChange={(event) => this.setState({lastName: event.target.value})} type="text" className="db-input" name="Lastname" placeholder="Lastname"/>
    </div>
    <div>
        <label htmlFor="Username" className="profil-label">Username</label>
        <input onBlur={(event) => this.updateUser(event)} value={username} onChange={(event) => this.setState({username: event.target.value})} type="text" className="db-input" name="Username" placeholder="Username"/>
    </div>
    <div>
        <label htmlFor="Email" className="profil-label">Company</label>
        <input onBlur={(event) => this.updateUser(event)} type="text" className="db-input" name="Email" placeholder="Company"/>
    </div>
</div>

)};

}

export default ProfilTab