<template>
  <div>
    <div class="footer-menu wrapper-main">
      <div class="wrapper-main__content wrapper-main__content--wide">
        <a href="#" class="footer-menu__link" @click.prevent="showModal('ModalContact')">{{$t('layout.footer_menu_support')}}</a>
        <router-link class="footer-menu__link" to="/items">{{$t('layout.footer_menu_items')}}</router-link>
        <router-link class="footer-menu__link" to="/terms">{{$t('layout.footer_menu_terms')}}</router-link>
        <!--<router-link to="/pay" class="footer-menu__link">{{$t('layout.footer_menu_add_funds')}}</router-link>-->
        <router-link class="footer-menu__link" to="/top">{{$t('layout.header_menu_top_drop')}}</router-link>
        <!--<a href="#" class="footer-menu__link" @click.prevent="logIn" v-if="!this.isLoggedGetter">{{$t('layout.footer_menu_sign_in')}}</a>-->
      </div>
    </div>

    <footer class="footer wrapper-main">
      <div class="footer__container wrapper-main__content wrapper-main__content--wide">
        <a class="footer__g2a-link g2a-link" href="//pay.g2a.com/" target="_blank">
          <img class="g2a-link__img" src="@/assets/images/g2apay_partner_badge_on_black_H.png" alt="G2A Pay">
        </a>

        <div class="social footer__social">
          <a class="social__link" href="https://www.facebook.com/FarmskinsOfficial/" title="" target="_blank" v-if="$i18n.locale !== 'cn'">
            <img class="social__logo social__logo--footer" src="@/assets/images/icon-social-fb.png" alt="">
            <span class="social__label">Facebook</span>
          </a>
          <a class="social__link" href="https://twitter.com/farmskins" title="" target="_blank" v-if="$i18n.locale !== 'cn'">
            <img class="social__logo social__logo--footer" src="@/assets/images/icon-social-tw.png" alt="">
            <span class="social__label">Twitter</span>
          </a>
          <a class="social__link" href="https://www.weibo.com/farmskinscn" title="" target="_blank" v-show="($i18n.locale === 'cn' || $i18n.locale === 'en')">
            <img class="social__logo social__logo--preheader" src="@/assets/images/icons/weibo-icon.png" alt="">
          </a>
          <a class="social__link" href="https://steamcommunity.com/groups/officialfarmskins" title="" target="_blank">
            <img class="social__logo social__logo--footer" src="@/assets/images/icon-social-st.png" alt="">
            <span class="social__label">Steam</span>
          </a>
          <a class="social__link social__logo--preheader social__link--tooltip-footer" href="#" v-show="($i18n.locale === 'cn' || $i18n.locale === 'en')">
            <img class="social__logo" src="@/assets/images/icons/wechat.png" alt="">
            <div class="social__tooltip-footer tooltip">
              <div class="tooltip__message">{{$t('layout.wechat_welcome')}}</div>
              <img src="@/assets/images/qr_new.png" class="tooltip__image tooltip__stream-el">
            </div>
          </a>
          <router-link class="social__link sitemap--social" to="/sitemap">
            <img class="sitemap__img" src="@/assets/images/icon-sitemap.png" alt="Sitemap">
          </router-link>
        </div>

        <!--<div class="footer__fscopy">
          <img class="footer__fscopy-image" src="@/assets/images/logo.svg" alt="">
        </div>-->

        <div class="footer__copy">
          <p class="footer__copy-fs">© 2016—2019 Farmskins.com</p>
          WiseAvant OÜ as an administrator of the Website adopts these Terms of Use that specifies User’s rights and obligations and constitute a legally binding agreement for both parties. These Terms of Use affect User’s rights and impose certain obligations while using the Website, so the User must read them carefully.
          <br>
          <br>
        </div>

        <div class="footer__payments">
          <img class="footer__payments-image" src="@/assets/images/payments/payments.png" alt="payments">
        </div>

        <div class="footer__g2a">
          <G2ARating/>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import { showModal, baseLink } from '@/logics';
import G2ARating from '../G2ARating.vue';

export default {
  name: 'MainFooter',
  components: {
    G2ARating,
  },
  data: () => ({
    // baseLink,
  }),
  computed: {
    ...mapGetters([
      // 'isLoggedGetter',
    ]),
  },
  methods: {
    ...mapActions([
      // 'fetchAuth',
    ]),
    // showModal,
    logIn() {
      // this.fetchAuth();
    },
  },
};
</script>

<style lang="scss">
  @import "footer";
</style>
