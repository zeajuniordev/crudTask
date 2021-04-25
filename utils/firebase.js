import firebase from 'firebase/app'
import'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDIZGLMHyNhF2-aRsABNFiCunpoPaPSYno",
    authDomain: "parcialluiszea.firebaseapp.com",
    projectId: "parcialluiszea",
    storageBucket: "parcialluiszea.appspot.com",
    messagingSenderId: "794767787080",
    appId: "1:794767787080:web:1c030ef73d9bc07eccc47d"
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
