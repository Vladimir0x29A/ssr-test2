<template>
  <transition name="anim-fixed-header">
    <div class="fix-header wrapper-main" v-if="isHeaderShown">
      <div class="fix-header__container wrapper-main__content wrapper-main__content--wide">
        <router-link class="fix-header__link-logo" to="/">
          <img class="fix-header__logo-img" src="@/assets/images/logo.svg" alt="Farmskins">
        </router-link>

        <div class="right-side">
          <nav>
            <router-link class="menu m-fights" to="/battle" v-if="isFightEnabled">{{$t('layout.header_menu_fights')}}</router-link>
            <!--<a class="menu m-percent" href="#" @click.prevent>{{$t('danger_zone.sale_button')}}</a>-->

            <router-link class="menu m-topdrop" to="/top">{{$t('layout.header_menu_top_drop')}}</router-link>
            <router-link class="menu m-faq" to="/faq">{{$t('layout.header_menu_faq')}}</router-link>
            <router-link class="menu m-partner" to="/partner">{{$t('layout.header_menu_partner')}}</router-link>
            <router-link class="menu m-bonus" to="/dailybonus">{{$t('layout.header_menu_dailybonus')}}</router-link>

            <ProfileHandler class="clearfix" v-if="this.isLoggedGetter"/>
            <a href="#" class="login" v-else @click.prevent="logIn">{{$t('layout.header_sign_in')}}</a>
          </nav>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { eventBus, isFightEnabled } from '@/logics';
import ProfileHandler from '@/components/profile-handler/ProfileHandler';

export default {
  name: 'HeaderFixed',
  components: {
    ProfileHandler,
  },
  data: () => ({
    isFightEnabled,
    // narrowScreen: false,
    isHeaderShown: false,
  }),
  computed: {
    ...mapGetters([
      'userGetter',
      'isLoggedGetter',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchAuth',
      'fetchLogout',
    ]),
    logIn() {
      this.fetchAuth();
    },
  },
  mounted() {
    eventBus.$on('show-fixed-header', (e) => {
      this.isHeaderShown = e;
    });

    /* eventBus.$on("window_resize", e => {
      this.narrowScreen = e <= 1279;
    }); */
  },
};
</script>

<style lang="scss">
    @import "header-fixed";
</style>
