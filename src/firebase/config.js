import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA0CBN-eHy5h2DZzYFuV7gaEaNf4pIOaXg",
    authDomain: "fir-500fb.firebaseapp.com",
    projectId: "fir-500fb",
    storageBucket: "fir-500fb.appspot.com",
    messagingSenderId: "299965237599",
    appId: "1:299965237599:web:26fa6b7240914e3a520eea",
    measurementId: "G-5VKCRC4Q9H"
  };

  export default firebase.initializeApp(firebaseConfig)