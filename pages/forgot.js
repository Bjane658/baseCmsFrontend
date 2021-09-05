import React, { useState } from 'react';
import $ from 'jquery';
import {apiBaseUrl} from "../utils/network";
import Head from 'next/head';


const Forgot = () => {
    const [username, setUsername] = useState("");
    const [pending, setPending] = useState(false);
    const [message, setMessage] = useState(undefined);
    const [forgotError, setError] = useState(undefined);

    const forgotAttempt = (event) => {
        event.preventDefault();
        setError(undefined);
        setMessage(undefined);
        setPending(true);
        $.ajax({type: "POST", url: apiBaseUrl +  "/api/forgot", data: JSON.stringify({email: username}), contentType: 'application/json'}).then((response) => {
            setPending(false);
            setMessage("An Email has been send to reset your password");
        }
        ).catch((error) => {
            console.log(error.status);
            setPending(false);
            setError("Service not available");
        });
    };

return (
        
<div>

    <Head>
        <title>BASE - Login</title>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
    </Head>

    <div className="page">
        <div className="login">
            <h1 className="headline">Reset Passwort</h1>
            <div className="signup-form-wrapper">
                <form name="Login" className="signup-form" onSubmit={(event) => loginAttempt(event)} >
                    <input type="text" className="input" name="Email" placeholder="Email" id="Email" required />
                    <input type="submit" className="start-button" value="Send Reset Mail" />
                </form>
            </div>
        </div>
        <div className="login-forgot-wrapper">
            <a href="/login" className="button-small">Login</a>
            <a href="/register" className="button-small" style={{marginLeft: '12px'}}>Create Account</a>
        </div>
    </div>

</div>

)};

export default Forgot