import axios from 'axios';

const baseUrl = 'https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet';

export async function getTweetsListFromServer() {
    try {
        const response = await axios.get(`${baseUrl}`);
        return response
    }
    catch (error) {
        return (error)
    }

}

export async function postTweetOnServer(myTweet) {
    try {
        const response = await axios.post(`${baseUrl}`, { tweet: myTweet })
        return response
    }
    catch (error) {
        return (error)
    }
}
