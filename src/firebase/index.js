import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBy30wnX0_r3WKoyRLgONJxCimkZeyyrwo',
  authDomain: 'first-twitter-clone-coding.firebaseapp.com',
  projectId: 'first-twitter-clone-coding',
  storageBucket: 'first-twitter-clone-coding.appspot.com',
  messagingSenderId: '929657165488',
  appId: '1:929657165488:web:fa92bf0acc07ec46960d75',
  measurementId: 'G-7L0NBKX623',
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()

export const USER_COLLECTION = db.collection('users')
export const TWEET_COLLECTION = db.collection('tweets')
export const COMMENT_COLLECTION = db.collection('comments')
export const RETWEET_COLLECTION = db.collection('retweets')
export const LIKE_COLLECTION = db.collection('likes')
export const MESSAGE_COLLECTION = db.collection('messages')
