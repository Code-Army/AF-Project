import firebase from 'firebase/app';
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA0xNczk1urxtH8ssk8eKcX0hvpPX3vAGU",
    authDomain: "shopping-app-c298a.firebaseapp.com",
    databaseURL: "https://shopping-app-c298a.firebaseio.com",
    projectId: "shopping-app-c298a",
    storageBucket: "shopping-app-c298a.appspot.com",
    messagingSenderId: "531780251960",
    appId: "1:531780251960:web:e064335fe04da3fa5791cd",
    measurementId: "G-YRTZDTSVJ5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage,firebase as default
}