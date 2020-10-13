import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDH_Gdh0c6z4i6_S1tlsBXlsb3TusoCkP0",
  authDomain: "search-engine-sam.firebaseapp.com",
  databaseURL: "https://search-engine-sam.firebaseio.com",
  projectId: "search-engine-sam",
  storageBucket: "search-engine-sam.appspot.com",
  messagingSenderId: "1035026594476",
  appId: "1:1035026594476:web:2c04a67ad600c68a127d09",
  measurementId: "G-G2BPEM6N7S",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
// Google login auth
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
