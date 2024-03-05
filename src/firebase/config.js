import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyChZxlLNBAyvZ3K91m98Cf8btrGJPdSOjY",
    authDomain: "olx-clone-9cad2.firebaseapp.com",
    projectId: "olx-clone-9cad2",
    storageBucket: "olx-clone-9cad2.appspot.com",
    messagingSenderId: "374506638996",
    appId: "1:374506638996:web:24e88ed091d6fbe2a2ae81",
    measurementId: "G-BY4TLCJ4FH"
  };

  // export default firebase.initializeApp(firebaseConfig)
  const app = firebase.initializeApp(firebaseConfig);

// Export the authentication module
export const auth = app.auth();

export default app;