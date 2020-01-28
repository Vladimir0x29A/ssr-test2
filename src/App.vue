<template>
  <div id="app">
    <div>App component</div>
    <button @click="val = !val">button</button>
    <div class="block" v-if="val">shown block</div>
  </div>
</template>

<script>
  export default {
    name: "App",
    data: () => ({
      val: true,
    }),
  }
</script>

<style lang="scss">
  .block {
    font-weight: 700;
    color: #ff4f57;
  }
</style>
