import React from 'react'
import { Button, Alert, Spinner } from 'react-bootstrap';
import AppContext from '../AppContext'

function buttonConfig(textLength, callBackProp, loadingStatus) {
    if (textLength > 140) {
        return (
            <>
                <Alert
                    variant="danger"
                    className="charLimitAlert"
                >The tweet can't contain more then 140 chars
                </Alert>
                <Button
                    style={{ cursor: "not-allowed" }}
                    className="tweetButton"
                    disabled
                >Tweet
            </Button>
            </>
        )
    }
    else if (loadingStatus) {
        return (
            <Button
                style={{ cursor: "not-allowed" }}
                className="tweetButton"
                disabled
            >Tweet
            </Button>
        )
    }
    else {
        return (
            <Button
                className="tweetButton"
                onClick={callBackProp}
            >Tweet
            </Button>
        )
    }
}

function CreateTweet() {

    return (
        <div className='createTweet'>
            <AppContext.Consumer>
                {({ tweetMsg, textChange, profile, loading, submitTweet }) => (
                    <>
                        <textarea
                            type="text"
                            rows="4"
                            className="tweetTextArea"
                            placeholder={`What you have in mind ${profile}...`}
                            value={tweetMsg}
                            onChange={event => textChange(event.target.value)}
                        >
                        </textarea>

                        {loading && <Spinner className="spinner" animation="grow" ></Spinner>}
                        {buttonConfig(tweetMsg.length, submitTweet, loading)}
                    </>
                )}
            </AppContext.Consumer>
        </div >
    )
}

export default CreateTweet
