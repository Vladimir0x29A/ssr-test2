<template>
  <main class="inner wrapper-main">
    <section class="wrapper-main__content">
      <div class="bread-crumbs">
        <router-link to="/" class="bread-crumbs__link">{{$t('general.breadcrumbs_home')}}</router-link>
        <h1 class="bread-crumbs__span">SiteMap</h1>
      </div>

      <div class="block-style block-style--padding">
        <h3>Main menu</h3>
        <div class="sitemap-paragraph">
          <p><router-link to="/blabla">An Incorrect link</router-link></p>

          <!--<p><router-link to="/">Farmskins.com</router-link></p>
          <p><router-link to="/dailybonus">{{$t('layout.header_menu_dailybonus')}}</router-link></p>
          <p><router-link to="/faq">{{$t('layout.header_menu_faq')}}</router-link></p>
          <p><router-link to="/partner">{{$t('layout.header_menu_partner')}}</router-link></p>
          <p><router-link to="/terms">{{$t('layout.footer_menu_terms')}}</router-link></p>
          <p><router-link to="/top">{{$t('layout.header_menu_top_drop')}}</router-link></p>-->
        </div>

        <!--<h3 class="header-label header-label&#45;&#45;3">Cases</h3>
        <div class="sitemap-paragraph">
          <p v-for="item in this.caseLinksGetter">
            <router-link :to="'/' + item.static_name">{{item.title}}</router-link>
          </p>
        </div>-->

        <!--<h3>Articles</h3>
        <div style="padding-left: 20px; padding-bottom: 40px; padding-top: 20px;">
          <p><a href="/vgo-skins" target="_blank">VGO VS STEAM</a></p>
        </div>-->
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'SiteMap',
  computed: {
    ...mapGetters([
      'caseLinksGetter',
    ]),
  },
  methods: {
    ...mapMutations([
      'updateStoreVal',
    ]),
    ...mapActions([
      'fetchCasesLinks',
    ]),
  },
  /*serverPrefetch() {
    return this.fetchCasesLinks();
  },
  mounted() {
    this.fetchCasesLinks();
  },*/
};
</script>

<style lang="scss">
  .sitemap-paragraph {
    padding-left: 20px;
    padding-top: 20px;

    &:not(:last-child) {
      margin-bottom: 40px;
    }
  }
</style>
