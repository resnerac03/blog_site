import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firebase-database';

const fb = firebase.initializeApp({
    apiKey: "AIzaSyBl8_ffEoEs3qdq-EcV59skBwNwPXi3_fM",
    authDomain: "blog-6f91d.firebaseapp.com",
    databaseURL: "https://blog-6f91d.firebaseio.com",
    projectId: "blog-6f91d",
    storageBucket: "blog-6f91d.appspot.com",
    messagingSenderId: "530416821850",
    appId: "1:530416821850:web:564015730ccc148204da63"
});

export default fb; 