<template>
  <div>
    <div class="container">
      <div class="header">{{$t('404.first')}}<br>{{$t('404.second')}}</div>
      <div class="description">{{$t('404.description')}}</div>
      <router-link to="/" class="link">{{$t('404.home')}}</router-link>
    </div>
    <router-link to="/" class="logo">
      <img src="@/assets/images/logo-404.png">
    </router-link>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    name: 'Errors',
    mounted() {
      document.body.id = 'page_404';
    },
    methods: {
      ...mapMutations([
        'updateErrorPageStatus',
      ]),
    },
    watch: {
      '$route.path'() {
        this.updateErrorPageStatus(false);
      },
    },
    destroyed() {
      document.body.removeAttribute('id');
    },
  };
</script>

<style lang="scss">
  @import "errors";
</style>
