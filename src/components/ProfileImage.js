import React, { useState, useEffect } from 'react';
import { storage, fire } from '../config/Firestore'
import { Button } from 'react-bootstrap'

function ProfileImage() {
    const defaultProfileImg = 'https://pbs.twimg.com/profile_images/1250906302672494592/lHFdPRlg_400x400.jpg'
    const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const currentUser = fire.auth().currentUser;
        setImageUrl(currentUser.photoURL)
    }, [])

    const handleChooseImg = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUploadImg = () => {
        const uploadTask = storage.ref(`profileImages/${image.name}`).put(image)
        uploadTask.on('state_changed',
            (snapshot) => {
                const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(uploadProgress)
            },
            (error) => {
                console.log(error)
            },
            () => {
                storage.ref('profileImages').child(image.name).getDownloadURL().then(url => {
                    setImageUrl(url)
                    setProgress(0)
                    const currentUser = fire.auth().currentUser;
                    currentUser.updateProfile({ photoURL: url }).then(error => {
                        console.log(error)

                    })
                })
            })
    }

    return (
        <div>
            {progress ? <progress className='progress' value={progress} max="100" /> : ""}
            <div className='imgContainer'>
                <img className='imgBox' src={imageUrl ? imageUrl : defaultProfileImg} alt='uploadImg' />
                <input type='file' onChange={handleChooseImg} />
                <div>
                    <Button onClick={handleUploadImg}>Upload</Button>
                </div>
            </div>
        </div>
    )
}

export default ProfileImage