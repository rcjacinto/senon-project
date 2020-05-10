import * as firebase from 'firebase/app'

import "firebase/auth"
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAewQHvcvNhgSZTb4IstUPy7b_OmAlNE_M",
  authDomain: "senon-project.firebaseapp.com",
  databaseURL: "https://senon-project.firebaseio.com",
  projectId: "senon-project",
  storageBucket: "senon-project.appspot.com",
  messagingSenderId: "1058294296900",
  appId: "1:1058294296900:web:d514dd046ec800b6dda711"
}

let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }
