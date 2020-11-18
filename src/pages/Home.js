import React from 'react';
import './Home.css'
import CreateTweet from '../components/CreateTweet'
import TweetsList from '../components/TweetsList'
import ErrorBox from '../components/ErrorBox'
import AppContext from '../AppContext'
import { db, fire } from '../config/Firestore'



class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      errorMsg: '',
      msgInput: '',
      tweetsList: [],
      singleTweet: {},
      imgUrl: ''
    }
  }

  componentDidMount() {
    this.displayTweetsFromServer()
    const currentUser = fire.auth().currentUser;
    this.setState({ imgUrl: currentUser.photoURL })
  }

  async handleOnClick() {
    await this.addTweetToFire()

  }

  handleOnChange(inputValue) {
    this.setState({ msgInput: inputValue })
  }


  async displayTweetsFromServer() {
    this.setState({ loading: true })

    const firstTen = db.collection("tweetsList")
      .orderBy('date', 'desc')

    await firstTen.onSnapshot(Snapshot => {
      let tweets = []
      Snapshot.forEach(doc => {
        tweets.push(doc.data())
      });
      this.setState({ tweetsList: tweets, loading: false })
    })
  }

  async addTweetToFire() {
    let { msgInput } = this.state;
    this.setState({ loading: true })

    await db.collection('tweetsList').doc().set({
      userName: this.props.msgProfile,
      content: msgInput,
      date: new Date().toISOString()
    })
      .catch((error) => {
        this.setState({ errorMsg: error.message })
      });
    this.setState({ loading: false })
  }


  render() {
    const { msgInput, loading, errorMsg, tweetsList, imgUrl } = this.state
    const { msgProfile } = this.props
    const defaultProfileImg = 'https://pbs.twimg.com/profile_images/1250906302672494592/lHFdPRlg_400x400.jpg'

    return (
      <div>
        <div className='profileImg'>
          <img className='pic' src={imgUrl ? imgUrl : defaultProfileImg} alt='profile image' />
        </div>
        <AppContext.Provider value={{
          tweetsList: tweetsList,
          profile: msgProfile,
          loading: loading,
          tweetMsg: msgInput,
          textChange: inputValue => this.handleOnChange(inputValue),
          submitTweet: () => this.handleOnClick()
        }}>
          {errorMsg && <ErrorBox errorText={errorMsg} />}
          <CreateTweet />
          <TweetsList />
        </AppContext.Provider>
      </div>
    )
  }
}

export default Home;
