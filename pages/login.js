import React, { useState } from 'react';
import Head from 'next/head';
import $ from 'jquery';
import {apiBaseUrl} from "../utils/network";
import { GoogleLogin, GoogleLogout } from 'react-google-login';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [pending, setPending] = useState(false);
    const [loginError, setError] = useState(undefined);

    const loginAttempt = (event) => {
        event.preventDefault();
        if(pending) return;

        setError(undefined);
        setPending(true);
        $.ajax({type: "POST", url: apiBaseUrl +  "/api/login", data: JSON.stringify({email: username.toLowerCase(), password}), contentType: 'application/json'})
            .then((response) => {
            setPending(false);
            localStorage.setItem("token", response);
            location.pathname = "/dashboard";
        }
        ).catch((error) => {
            console.log(error.status);
            setPending(false);
            if(error.status === 401 || error.status === 404){
                setError("Benutzername oder Passwort falsch");
            }else{
                setError("Serivce nicht verfügbar");
            }
        });
    };

    const handleGoogleLoginSuccess = (response) => {
        $.ajax({type: "POST", url: apiBaseUrl + "/api/login/google", data: JSON.stringify({token: response.tokenId}), contentType: "application/json"})
            .then((response) => {
                localStorage.setItem("token", response);
                location.pathname = "/dashboard";
            })
            .catch(console.error);
    };

    const handleGoogleLoginFail = (response) => {
        setPending(false);
        console.log(response);
    };

    const renderError = () => {
        return loginError ? <div>{loginError}</div> : <></>;
    };


return (

<div>

<Head>
    <title>BASE - Login</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
</Head>

<div className="page">
    <div className="login">
        <h1 className="headline">Log in</h1>
        <div className="signup-form-wrapper">
            <form name="Login" className="signup-form">
                <input onChange={(event) => setUsername(event.target.value)} onKeyDown={(event) => event.keyCode === 13 ? loginAttempt(event) : undefined} type="email" className="input" name="Email" placeholder="Email" id="Email" required />
                <input onChange={(event) => setPassword(event.target.value)} onKeyDown={(event) => event.keyCode === 13 ? loginAttempt(event) : undefined} type="password" className="input" name="Password" placeholder="Password" id="Password" required />
                <div className={`${pending ? "loader" : "start-button"}`} onClick={(event) => loginAttempt(event)} >{pending ? "" : "Log In"}</div>
            </form>
        </div>
        <GoogleLogin
            clientId="72354593243-emkjh7d3e8gh7cotelcg6makclpvcal6.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFail}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
                <div className="google"
                     onClick={() => {
                        renderProps.onClick();
                        setPending(true);
                     }}
                     disabled={renderProps.disabled}><img src="../dashboard/google.svg"/> Login with Google</div>
              )}
        />
        {renderError()}
    </div>
    <div className="login-forgot-wrapper">
        <a href="/forgot" className="button-small">Reset Password</a>
        <a href="/register" className="button-small">Create Account</a>
    </div>

</div>

</div>

)};

export default Login