import React, { useState } from 'react'
import './Profile.css'
import Button from 'react-bootstrap/button'
import ProfileImage from '../components/ProfileImage'


function Profile(props) {
    const [newProfile, setNewProfile] = useState('')

    return (
        <div className='container'>
            <div className='uploadProfileImg'>
                <ProfileImage />
            </div>
            <div>
                <p className="Header">Profile</p>
                <p className="subHeader">User Name</p>
                <div className="inputBox">
                    <input
                        type="text"
                        className="inputText"
                        placeholder="Please Choose a profile name..."
                        value={newProfile}
                        onChange={event => setNewProfile(event.target.value)}
                    ></input>
                    <Button
                        className="saveButton"
                        onClick={() => props.msgProfile(newProfile)}
                    >Save
            </Button>
                    {props.isProfileUpdate && <div className="saveMsg">{`"${newProfile}" has been saved.`}</div>}
                </div>
            </div>
        </div>
    )
}

export default Profile

