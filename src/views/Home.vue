<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Lifestyle in a box" @login-google="login"/>
    <div v-if="error">
      <h3>Something went wrong!</h3>
      <p>Please inform our development team.</p>
      <img alt="Vue logo" src="../assets/logical-error.jpg">
      <div><small>(Our development team)</small></div>
      <h4>Send them this information:</h4>
      <div class="error-details">
        <span>Code: {{ this.errorDetails.code }}</span>
        <span>Message: {{ this.errorDetails.message }}</span>
        <span>Email: {{ this.errorDetails.email }}</span>
        <span>Credential: {{ this.errorDetails.credential }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import { firebase } from '@/firebase';
import { provider } from '@/firebase';

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      error: false,
      errorDetails: {
        code: '',
        message: '',
        email: '',
        credential: ''
      }
    };
  },
  methods: {
    login() {
      const self = this;
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function() {
          firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            self.$store.dispatch('login', { user, token });
            self.$router.push('/your-week');
          }).catch(function(error) {
            console.error(error);
            // Handle Errors here.
            self.errorDetails.code = error.code;
            self.errorDetails.message = error.message;
            // The email of the user's account used.
            self.errorDetails.email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            self.errorDetails.credential = error.credential;
            self.error = true;
        })
        .catch(function(error) {
          self.errorDetails.code = error.code;
          self.errorDetails.message = error.message;
          self.error = true;
        });
      });
    }
  }
}
</script>

<style lang="scss">
.error-details {
  span {
    display: block;
  }
}
</style>