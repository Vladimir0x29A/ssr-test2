<template>
  <div id="app">
    <div>App component</div>
    <div><button @click="val = !val">button</button></div>
    <div class="block" v-if="val">shown block</div>

    <div><router-link to="/first">Link 1</router-link></div>
    <div><router-link to="/second">Link 2</router-link></div>
    <router-view/>

    <div class="store-val">Store value: {{storeVal}}</div>
    <div><button @click="updateStoreVal(!storeVal)">Change store value</button></div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';

  export default {
    name: "App",
    data: () => ({
      val: true,
    }),
    computed: {
      ...mapState([
        'storeVal',
      ]),
    },
    methods: {
      ...mapMutations([
        'updateStoreVal',
      ]),
    },
    /*created() {
      console.log('Route:', this.$route);
    },*/
  }
</script>

<style lang="scss">
  .block {
    font-weight: 700;
    color: #ff4f57;
  }

  .store-val {
    font-weight: 700;
  }
</style>
