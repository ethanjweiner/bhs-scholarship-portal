import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyBliuvbQLc8dIlE49NIqccKYvVQnVg6zgY',
	authDomain: 'bhs-scholarship-portal.firebaseapp.com',
	databaseURL: 'https://bhs-scholarship-portal.firebaseio.com',
	projectId: 'bhs-scholarship-portal',
	storageBucket: 'bhs-scholarship-portal.appspot.com',
	messagingSenderId: '443507166705',
	appId: '1:443507166705:web:c13d4c0e3b697fb471c850',
	measurementId: 'G-Y7Z1BX9V79'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
