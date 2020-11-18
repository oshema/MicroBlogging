import React from 'react'
import AppContext from '../AppContext'

function TweetsList() {
    return (
        <AppContext.Consumer>
            {({ tweetsList }) => (
                <>
                    {tweetsList.map((tweet, index) =>
                        <div key={index} className='tweetsList'>
                            <div className="profile">
                                {tweet.userName}
                            </div>
                            <div className="tweetDate">
                                {tweet.date}
                            </div>
                            <div className="tweetMsg">
                                {tweet.content}
                            </div>
                        </div>
                    )
                    }
                </>
            )}
        </AppContext.Consumer>
    )
}

export default TweetsList