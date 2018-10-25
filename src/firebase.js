import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
const provider = new firebase.auth.GoogleAuthProvider();

const config = {
  apiKey: "AIzaSyDvMQdQ4tmylsFaEgdkN4nmyh-MNXLpjDQ",
  authDomain: "lifestyle-in-a-box.firebaseapp.com",
  databaseURL: "https://lifestyle-in-a-box.firebaseio.com",
  projectId: "lifestyle-in-a-box",
  storageBucket: "lifestyle-in-a-box.appspot.com",
  messagingSenderId: "270431751387"
};

firebase.initializeApp(config);

export { provider };
export { firebase };
