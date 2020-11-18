import React, { useState } from 'react';
import Button from 'react-bootstrap/button'
import Spinner from 'react-bootstrap/spinner'
import './SignUp.css'
import { fire } from '../config/Firestore';

function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authError, setError] = useState('')
    const [authSuccess, setAuthSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const login = async () => {
        setIsLoading(true)
        let response = await fire.auth().createUserWithEmailAndPassword(email, password)
            .catch(error => {
                setError(error.message)
            })
        if (response) {
            console.log(response)
            setAuthSuccess("Your account has been registered")
            setError('')
            setTimeout(() => {
                setAuthSuccess(false)
            }, 4000);
        }
        setIsLoading(false)
    }
    return (

        < div >
            <p className="headerSignUp">Create An Account</p>
            <div className="signUpBox">
                <input
                    type="email"
                    className="signUpInput"
                    placeholder="Email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                >
                </input>
            </div>
            <div className="signUpBox">
                <input
                    type="password"
                    className="signUpInput"
                    placeholder="Password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                >
                </input>
                <Button
                    className="registerButton"
                    onClick={login}>{isLoading ? <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true" /> : 'Register'}
                </Button>
            </div>
            <div className="authErrorMsg">{authError}</div>
            <div className="successMsg">{authSuccess}</div>
        </div >
    );
}

export default SignUp;