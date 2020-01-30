<template>
  <div id="app">
    <template v-if="!isErrorPage">
      <router-view/>
      <MainFooter/>
    </template>

    <Errors v-else/>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';

  import Errors from "./views/errors/Errors.vue";
  import MainFooter from "./components/footer/MainFooter.vue";

  export default {
    name: "App",
    components: {
      MainFooter,
      Errors,
    },
    data: () => ({
      val: true,
    }),
    computed: {
      ...mapState([
        'isErrorPage',
      ]),
    },
    methods: {
    },
  }
</script>

<style lang="scss">
  @import "styles/index";
</style>
