<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Please log in</p>
    <ul>
      <li><button @click="login">Login with Google+</button></li>
      <li><button>Login with Facebook</button></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    login() {
      this.$emit('login-google');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
