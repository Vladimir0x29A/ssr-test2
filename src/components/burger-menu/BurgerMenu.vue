<template>
    <transition name="anim-burger-menu">
        <div class="burger-menu" v-if="this.isBurgerMenuShown">
            <div class="burger-menu__links-list">
                <router-link class="burger-menu__link" to="/user-own" v-if="this.isLoggedGetter">{{$t('user.profile')}}</router-link>
                <router-link class="burger-menu__link" to="/faq">{{$t('layout.header_menu_faq')}}</router-link>
                <router-link class="burger-menu__link" to="/partner">{{$t('layout.header_menu_partner')}}</router-link>
                <router-link class="burger-menu__link" to="/dailybonus">{{$t('layout.header_menu_dailybonus')}}</router-link>
                <router-link class="burger-menu__link" to="/top">{{$t('layout.header_menu_top_drop')}}</router-link>
            </div>

            <div class="social burger-menu__social">
                <a class="social__link" href="https://www.facebook.com/FarmskinsOfficial/" title="" target="_blank" v-if="$i18n.locale !== 'cn'">
                    <img class="social__logo" src="@/assets/images/icons/fb-ico.png" alt="">
                </a>
                <a class="social__link" href="https://twitter.com/farmskins" title="" target="_blank" v-if="$i18n.locale !== 'cn'">
                    <img class="social__logo" src="@/assets/images/icons/tw-ico.png" alt="">
                </a>
                <a class="social__link" href="https://www.weibo.com/u/7004466686" title="" target="_blank" v-if="$i18n.locale === 'cn' || $i18n.locale === 'en'">
                    <img class="social__logo" src="@/assets/images/icons/weibo-icon.png" alt="">
                </a>
                <a class="social__link" href="https://steamcommunity.com/groups/officialfarmskins" title="" target="_blank">
                    <img class="social__logo" src="@/assets/images/icons/st-ico.png" alt="">
                </a>
                <a class="social__link social__link--tooltip social__link--tooltip-burger" href="#" v-if="$i18n.locale === 'cn' || $i18n.locale === 'en'">
                    <img class="social__logo" src="@/assets/images/icons/wechat.png" alt="">
                    <div class="social__tooltip social__tooltip--burger tooltip">
                        <span class="tooltip__message">{{$t('layout.wechat_welcome')}}</span>
                        <img src="@/assets/images/qr_new.png" class="tooltip__image">
                    </div>
                </a>
                <router-link class="social__link social__sitemap social__sitemap--burger" to="/sitemap">
                    <img src="@/assets/images/icons/sitemap.png" alt="Sitemap">
                </router-link>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import ProfileHandler from '@/components/profile-handler/ProfileHandler';

export default {
  name: 'BurgerMenu',
  components: { ProfileHandler },
  data: () => ({
    cssClass: 'fixed-by--burger-menu',
  }),
  computed: {
    ...mapState([
      'isBurgerMenuShown',
    ]),
    ...mapGetters([
      'isLoggedGetter',
    ]),
  },
  methods: {
    ...mapMutations(['hideBurgerMenu']),
  },
  watch: {
    isBurgerMenuShown(val) {
      if (val) document.body.classList.add(this.cssClass);
      else document.body.classList.remove(this.cssClass);
    }
  },
  created() {
    this.$router.afterEach(() => {
      this.hideBurgerMenu();
    })
  }
};
</script>

<style lang="scss">
    @import "burger-menu";
</style>
