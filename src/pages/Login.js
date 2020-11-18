import React, { useState } from 'react';
import Button from 'react-bootstrap/button'
import Spinner from 'react-bootstrap/spinner'
import './Login.css'
import { fire } from '../config/Firestore';
import firebase from 'firebase'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authError, setError] = useState('')
    const [authSuccess, setAuthSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const login = async () => {
        setIsLoading(true)
        let response = await fire.auth().signInWithEmailAndPassword(email, password)
            .catch(error => {
                setError(error.message)
            })

        if (response) {
            setAuthSuccess("Success")
            setError('')
            setTimeout(() => {
                setAuthSuccess(false)
            }, 4000);
        }
        setIsLoading(false)
    }

    const googleLogin = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        fire.auth().signInWithPopup(provider)
            .catch(error => {
                setError(error.message)
            })
    }
    

    return (

        < div >
            <p className="headerLogin">Log in to MicroBlog</p>
            <div className="loginBox">
                <input
                    type="email"
                    className="loginInput"
                    placeholder="Please enter your user Email..."
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                >
                </input>
            </div>
            <div className="loginBox">
                <input
                    type="password"
                    className="loginInput"
                    placeholder="Please enter your user Password..."
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                >
                </input>
                <Button
                    className="loginButton"
                    onClick={login}>
                    {isLoading ? <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true" /> : 'Login'}
                </Button>
            </div>
            <div className="authErrorMsg">{authError}</div>
            <div className="authSuccessMsg">{authSuccess}</div>
            <p className="headerLogin">OR</p>
            <img className="googleImg" type='button' src="/google.png" alt="Google signIn" onClick={googleLogin} />
        </div >
    );
}

export default Login;