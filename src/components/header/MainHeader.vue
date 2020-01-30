<template>
  <div>
    <div class="preheader wrapper-main">
      <div class="preheader__container wrapper-main__content wrapper-main__content--wide">
        <div class="social preheader__social">
          <span class="social__prelabel">{{$t('layout.preheader_join_us')}}</span>
          <a class="social__link" href="https://www.facebook.com/FarmskinsOfficial/" title="" target="_blank" v-if="$i18n.locale !== 'cn'">
            <img class="social__logo social__logo--preheader" src="@/assets/images/icons/fb-ico.png" alt="">
          </a>
          <a class="social__link" href="https://twitter.com/farmskins" title="" target="_blank" v-if="$i18n.locale !== 'cn'">
            <img class="social__logo social__logo--preheader" src="@/assets/images/icons/tw-ico.png" alt="">
          </a>
          <a class="social__link" href="https://www.weibo.com/farmskinscn" title="" target="_blank" v-show="($i18n.locale === 'cn' || $i18n.locale === 'en')">
            <img class="social__logo social__logo--preheader" src="@/assets/images/icons/weibo-icon.png" alt="">
          </a>
          <a class="social__link" href="https://steamcommunity.com/groups/officialfarmskins" title="" target="_blank">
            <img class="social__logo social__logo--preheader" src="@/assets/images/icons/st-ico.png" alt="">
          </a>
          <a class="social__link social__logo--preheader social__link--tooltip-header" href="#" v-show="($i18n.locale === 'cn' || $i18n.locale === 'en')">
            <img class="social__logo" src="@/assets/images/icons/wechat.png" alt="">
            <div class="social__tooltip-header tooltip">
              <div class="tooltip__message">{{$t('layout.wechat_welcome')}}</div>
              <img src="@/assets/images/qr_new.png" class="tooltip__image tooltip__stream-el">
            </div>
          </a>
        </div>

        <router-link to="/" class="preheader__logo">
          <img src="@/assets/images/logo.png" alt="Farmskins">
        </router-link>

        <div class="langs" :class="{'langs--active': isLangListShown}" @click.prevent="toggleLangList" v-click-outside="clickOutsideLangList">
          <span class="langs__title">{{$t('layout.preheader_langs')}}:</span>
          <a class="lang-link" href="#" :title="$i18n.locale">
            {{$i18n.locale}}
            <img class="lang-link__img" :src="require(`@/assets/images/langs/lang-${$i18n.locale}.png`)" :alt="$i18n.locale">
          </a>

          <transition name="langListAnim">
            <div class="more-langs" v-if="isLangListShown">
              <a class="lang-link" href="#" :title="lang" v-for="lang in langList" @click.prevent.stop="chooseLng(lang)">
                {{lang}}
                <img class="lang-link__img" :src="require(`@/assets/images/langs/lang-${lang}.png`)" :alt="lang">
              </a>
            </div>
          </transition>
        </div>

        <div class="burger" :class="{'burger--active': this.isBurgerMenuShown}" @click="this.toggleBurgerMenu">
          <span class="burger__item burger__item--first" aria-hidden="true"></span>
          <span class="burger__item burger__item--second" aria-hidden="true"></span>
        </div>

        <Share/>

      </div>
    </div>

    <header class="header wrapper-main">
      <div class="header__container wrapper-main__content wrapper-main__content--wide">

        <div class="header-logo">
          <router-link to="/" class="header-logo__link">
            <img class="header-logo__img" src="@/assets/images/logo.svg" alt="Farmskins">
          </router-link>
        </div>

        <nav class="main-navigation">
          <router-link class="main-navigation__button main-navigation__button--default-bg main-navigation__button--fights" to="/battle" v-if="isFightEnabled">
            <img src="@/assets/images/icons/menu-ico-fights.png" alt="" class="main-navigation__img">
            <span class="main-navigation__span">{{$t('layout.header_menu_fights')}}</span>
          </router-link>
          <router-link class="main-navigation__button main-navigation__button--default-bg main-navigation__button--default-color main-navigation__button--topdrop" to="/top">
            <img src="@/assets/images/icons/menu-ico-topdrop.png" alt="" class="main-navigation__img">
            <span class="main-navigation__span">{{$t('layout.header_menu_top_drop')}}</span>
          </router-link>
          <router-link class="main-navigation__button main-navigation__button--default-bg main-navigation__button--default-color main-navigation__button--faq" to="/faq">
            <img src="@/assets/images/icons/menu-ico-faq.png" alt="" class="main-navigation__img">
            <span class="main-navigation__span">{{$t('layout.header_menu_faq')}}</span>
          </router-link>
          <router-link class="main-navigation__button main-navigation__button--default-bg main-navigation__button--default-color main-navigation__button--partner" to="/partner">
            <img src="@/assets/images/icons/menu-ico-partner.png" alt="" class="main-navigation__img">
            <span class="main-navigation__span">{{$t('layout.header_menu_partner')}}</span>
          </router-link>
          <router-link class="main-navigation__button main-navigation__button--default-bg main-navigation__button--default-color main-navigation__button--bonus" to="/dailybonus">
            <img src="@/assets/images/icons/menu-ico-bonus.png" alt="" class="main-navigation__img">
            <span class="main-navigation__span">{{$t('layout.header_menu_dailybonus')}}</span>
          </router-link>

          <div class="main-navigation__button main-navigation__button--nopads main-navigation-login" v-if="this.isLoggedGetter">
            <div class="main-navigation-login__row main-navigation-user">
              <router-link :to="`/user/${this.userGetter.id}`" class="main-navigation-user__container main-navigation-login__pads">
                <img :src="this.userGetter.avatar" alt="avatar" class="main-navigation-user__avatar">
                <div class="main-navigation-user__nickname">{{userGetter.nickname}}</div>
              </router-link>
              <button @click="logout" class="main-navigation-user__logout">
                <img class="main-navigation-user__logout-img" src="@/assets/images/icons/logout-icon.png" alt="logout">
              </button>
            </div>
            <div class="main-navigation-login__row main-navigation-balance main-navigation-login__pads">
              <div class="main-navigation-balance__balance">${{userGetter.balance}}</div>
              <router-link to="/pay" class="button button--default button--add-funds">
                <span class="button__label">{{$t('layout.header_add_funds')}}</span>
              </router-link>
            </div>
          </div>

          <a href="#" class="main-navigation__button main-navigation__button--login" v-else @click.prevent="logIn">
            <img src="@/assets/images/icon-steam.png" alt="" class="main-navigation__img">
            <span class="main-navigation__span">{{$t('layout.header_sign_in')}}</span>
          </a>
        </nav>
      </div>
    </header>

  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { baseLink, isFightEnabled,langs } from '@/logics';

// import VueCookies from 'vue-cookies';
import ProfileHandler from '@/components/profile-handler/ProfileHandler';
import Share from '../share/Share';

const langCookie = 'browser_language_checked';

export default {
  name: 'MainHeader',
  components: {
    Share,
    ProfileHandler,
  },
  data: () => ({
    isFightEnabled,
    isLangListShown: false,
  }),
  computed: {
    ...mapState([
      'isBurgerMenuShown',
      'baseApiUrl',
    ]),
    ...mapGetters([
      'userGetter',
      'isLoggedGetter',
    ]),
    langList() {
      return this.$i18n.availableLocales.filter(item => item !== this.$i18n.locale);
    },
  },
  methods: {
    ...mapMutations([
      'toggleBurgerMenu',
    ]),
    ...mapActions([
      'fetchAuth',
      'fetchLogout',
    ]),
    toggleLangList() {
      this.isLangListShown = !this.isLangListShown;
    },
    chooseLng(lang) {
      this.storeLang(lang);
      this.isLangListShown = false;

        if(typeof window !== 'undefined') {
            if (lang === 'en') {
                window.location.href = this.$route.path;
            } else {
                window.location.href = '/' + lang + this.$route.path;
            }
        }
    },
    logIn() {
      this.fetchAuth();
    },
    logout() {
        // this.$router.push({path: '/logout'});
        if(typeof window !== 'undefined') {
            location.href = this.$router.options.base + 'auth/logout';
        }
    },
    clickOutsideLangList() {
      this.isLangListShown = false;
    },
    detectLang() {

      let lang = global.cookies.get('browser_language_checked');

      if (lang === undefined || typeof lang === 'undefined' || lang === 'undefined') {
          let globallang = '';
          if(global.navlang === undefined || typeof global.navlang === 'undefined' || global.navlang === 'undefined') {
              globallang = global.navigator.language;
          }else{
              globallang = global.navlang;
          }
        const browserLanguage = (globallang || "").replace(/(\w+)-\w+/, '$1');
        const isLangExist = this.$i18n.availableLocales.includes(browserLanguage);

        if (isLangExist) {
            lang = browserLanguage;
        }
      }

      if (lang !== this.$i18n.locale) {
          if (langs.includes(lang)) {
              this.chooseLng(lang);
          } else {
              this.chooseLng('en');
          }
      }
    },
    storeLang(lang) {
      global.cookies.set('browser_language_checked', lang);
      this.$i18n.locale = lang;
    },
  },
  created() {
      this.detectLang();
  }
};
</script>

<style lang="scss">
  @import "header";
</style>
