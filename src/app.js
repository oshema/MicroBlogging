import React from 'react'
import { fire } from './config/Firestore'
import './app.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            profile: '',
            msgProfile: '',
            isProfileUpdateMsg: false,
        }
    }


    componentDidMount() {
        this.authListener()
    }

    setUserProfile(user, newName) {
        user.updateProfile({
            displayName: newName
        }).then(() => {
            console.log('user name updated: ', user.displayName)
        }).catch(error => {
            console.log(error.message)
        });
    }

    authListener() {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                const profile = user.email.split('@')[0]
                this.setState({ profile })
                if (user.displayName === false) {
                    this.setUserProfile(user, profile)
                }
                this.setState({ msgProfile: user.displayName })
            } else {
                this.setState({ profile: '' })
            }
        })
    }

    logOut() {
        fire.auth().signOut()
    }

    setMsgProfile(newProfile) {
        this.setState({ msgProfile: newProfile, isProfileUpdateMsg: true })
        setTimeout(() => this.setState({ isProfileUpdateMsg: false }), 1500)

        const currentUser = fire.auth().currentUser;
        this.setUserProfile(currentUser, newProfile)
    }

    render() {
        const { profile, isProfileUpdateMsg, msgProfile, imgUrl } = this.state



        return (
            <Router>
                <div>
                    <nav>
                        <ul className="navBar">
                            {profile ?
                                <>
                                    <Redirect to="/" />
                                    <li>
                                        <Link className="link" to="/">home</Link>
                                    </li>
                                    <li>
                                        <Link className="link" to="/profile">Profile</Link>
                                    </li>
                                    <li className="userStatus">
                                        <span >Logged in as: {profile}</span>
                                        <Button
                                            className="logoutButton"
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => this.logOut()}
                                        >Logged Out
                                        </Button>
                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <Link className="link" to="/login">Login</Link>
                                    </li>
                                    <li>
                                        <Link className="link" to="/Sign-Up">Sign Up</Link>
                                    </li>
                                </>
                            }
                        </ul>

                    </nav>
                    <Switch>
                        {profile ?
                            <>
                                <Route exact path="/">
                                    <Home msgProfile={msgProfile} />
                                </Route>
                                <Route path="/profile">
                                    <Profile
                                        msgProfile={(newProfile) => this.setMsgProfile(newProfile)}
                                        isProfileUpdate={isProfileUpdateMsg}
                                    />
                                </Route>
                            </>
                            :
                            <>
                                <Route exact path={["/", "/login"]}>
                                    <Login />
                                </Route>
                                <Route path="/Sign-Up">
                                    <SignUp />
                                </Route>
                            </>
                        }
                    </Switch>
                </div>
            </Router >
        )
    }
}

export default App
