import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBQg0pMpsNGJlrD3vT_9DPhtEgP94B04NQ",
    authDomain: "orishema-microblogging.firebaseapp.com",
    databaseURL: "https://orishema-microblogging.firebaseio.com",
    projectId: "orishema-microblogging",
    storageBucket: "orishema-microblogging.appspot.com",
    messagingSenderId: "42301234409",
    appId: "1:42301234409:web:707a4b1639d628702ee478",
    measurementId: "G-7NDCS0Y09J"
};
// Initialize Firebase
let fire = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore()
let storage = firebase.storage()

export { fire, db, storage }


