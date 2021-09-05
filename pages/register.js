import React, {useState} from 'react'
import Head from 'next/head'
import $ from 'jquery';
import {apiBaseUrl} from "../utils/network";
import { GoogleLogin, GoogleLogout } from 'react-google-login';


const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [pending, setPending] = useState(false);
    const [registrationError, setRegistrationError] = useState(undefined);

    const registerAttempts = (event) => {
        event.preventDefault();
        setRegistrationError(undefined);
        if(password === passwordConfirmation){
            setPending(true);
            $.ajax(
                {
                    type: "POST",
                    url: apiBaseUrl + "/api/register",
                    data: JSON.stringify({firstName, lastName, username, email: email.toLowerCase(), password}),
                    contentType: 'application/json'
                }
                    )
                .then((response) => {
                    setPending(false);
                    location.pathname = "/login";
                }
            ).catch((error) => {
                setPending(false);
                if(error.status === 403){
                    setRegistrationError("Benutzername bereits vergeben")
                }else{
                    setRegistrationError("Service nicht verfügbar");
                }
                console.log(error);
            });
        }

    }

    return (
<div>
<Head>
    <title>BASE - Resister</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
</Head>


<div className="page">
    <div className="register">
        <h1 className="headline">Sign up</h1>
        <div className="signup-form-wrapper">
            <form onSubmit={(event) => registerAttempts(event)}>
                <div>
                    <input onChange={(event) => setFirstName(event.target.value)} type="text" className="input" name="Firstname" placeholder="Firstname" id="Firstname" required style={{width: '49%', marginRight: '1%', display: 'inline'}} />
                    <input onChange={(event) => setLastName(event.target.value)} type="text" className="input" name="Lastname" placeholder="Lastname" id="Lastname" required style={{width: '49%', marginLeft: '1%', display: 'inline'}} />
                </div>
                <input onChange={(event) => setEmail(event.target.value)} type="text" className="input" name="Email" placeholder="Email" id="Email" required />
                <input onChange={(event) => setPassword(event.target.value)} type="password" className="input" name="Password" placeholder="Password" id="Password" required />
                <input onChange={(event) => setPasswordConfirmation(event.target.value)} type="password" className="input" name="Confirm" placeholder="Confirm Password" id="Confirm" required />
                <input type="submit" value="Let's go" className="start-button w-button" />
            </form>
            { registrationError ? <p className="registration-error">{registrationError}</p> : undefined}
        </div>
        <GoogleLogin
            clientId="72354593243-emkjh7d3e8gh7cotelcg6makclpvcal6.apps.googleusercontent.com"
            buttonText="Login"
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
                <div className="google" onClick={renderProps.onClick} disabled={renderProps.disabled}><img src="../dashboard/google.svg"/> Sign up with Google</div>
              )}
        />
    </div>
    <div className="login-forgot-wrapper">
        <a href="/login" className="button-small">Log in</a>
        <a href="/register" className="button-small">Create Account</a>
    </div>
</div>

</div>
)
};

export default Register
