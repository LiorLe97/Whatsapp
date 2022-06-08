import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAMzJ7ORkrHpKlfrZPFmLr35t-jwu97Wts",
    authDomain: "whatsapp-clone-ffbc5.firebaseapp.com",
    projectId: "whatsapp-clone-ffbc5",
    storageBucket: "whatsapp-clone-ffbc5.appspot.com",
    messagingSenderId: "880361817089",
    appId: "1:880361817089:web:e23a7407e30b8048802c00",
    measurementId: "G-1JWB7HRWDJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db