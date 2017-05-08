import firebase from 'firebase/app'
require('firebase/database')

const config = {
  apiKey: process.env.FIREBASE_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL
}

firebase.initializeApp(config)

export const database = firebase.database()