<template>
  <div id="app">
    <div>App component</div>
    <div><button @click="val = !val">button</button></div>
    <div class="block" v-if="val">shown block</div>
    <div><router-link to="/first">Link 1</router-link></div>
    <div><router-link to="/second">Link 2</router-link></div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "App",
    data: () => ({
      val: true,
    }),
    created() {
      console.log('Route:', this.$route);
    },
  }
</script>

<style lang="scss">
  .block {
    font-weight: 700;
    color: #ff4f57;
  }
</style>
