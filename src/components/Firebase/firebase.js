import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const config = {
    apiKey: "AIzaSyBoT7cCq5IpWh-DE0agTbOHIg8DvJLo3-E",
    authDomain: "woorld-tools.firebaseapp.com",
    databaseURL: "https://woorld-tools.firebaseio.com",
    projectId: "woorld-tools",
    storageBucket: "woorld-tools.appspot.com",
    messagingSenderId: "585971463302",
    appId: "1:585971463302:web:823b84e6483bb0e5928d07"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();


    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);


    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');


}
export default Firebase;