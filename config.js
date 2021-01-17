import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
 apiKey: "AIzaSyBy16ihOQLkw_W-YO5EItfkh5XFd7q661U",
 authDomain: "wily-46099.firebaseapp.com",
 projectId: "wily-46099",
 storageBucket: "wily-46099.appspot.com",
 messagingSenderId: "815080280558",
 appId: "1:815080280558:web:e0b05b16d7ad3856c57eff"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/*if (firebase.apps=== undefined){

 firebase.initializeApp(firebaseConfig); 
}*/

export default firebase.firestore()