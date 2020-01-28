<template>
  <div id="app">
    <div>App component</div>
    <router-link to="/first">Link 1</router-link>
    <router-link to="/second">Link 2</router-link>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "App",
    created() {
      console.log('Route:', this.$route);
    }
  }
</script>
