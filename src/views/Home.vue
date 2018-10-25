<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Lifestyle in a box" @login-google="login"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import firebase from "firebase";
const provider = new firebase.auth.GoogleAuthProvider();

const config = {
  apiKey: "AIzaSyDvMQdQ4tmylsFaEgdkN4nmyh-MNXLpjDQ",
  authDomain: "lifestyle-in-a-box.firebaseapp.com",
  databaseURL: "https://lifestyle-in-a-box.firebaseio.com",
  projectId: "lifestyle-in-a-box",
  storageBucket: "lifestyle-in-a-box.appspot.com",
  messagingSenderId: "270431751387"
};

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created() {
    firebase.initializeApp(config);
  },
  methods: {
    login() {
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
    }
  }
}
</script>
