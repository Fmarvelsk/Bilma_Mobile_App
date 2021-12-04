import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDMYqToLYNLkFPqafxGXq1dNCddIgw6-2I",
    authDomain: "kilonta-cfd5e.firebaseapp.com",
    projectId: "kilonta-cfd5e",
    storageBucket: "kilonta-cfd5e.appspot.com",
    messagingSenderId: "515471294400",
    appId: "1:515471294400:web:80de6ceea08edf8fc6d225",
    measurementId: "G-MPR4F5723G"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth()

export { auth, db, storage }