<template>
  <router-link :to="`/${cs.static_name}`"
               class="case-main"
               :class="{'case-main--disabled': isDisabled}"
               :style="shadowBG"
  >

    <div class="case-main__label-new" v-if="+cs.is_new">{{$t('layout.case_sign_new')}}</div>

    <div class="case-main__thumb case-thumb" :style="thumbBg">
      <img class="case-thumb__img case-thumb__img--fly" :src="baseLink + (cs.front_image || cs.image)" alt="">
    </div>

    <div class="case-main__info">
      <div class="case-main__label-limited" v-if="+cs.opens_limit">{{$t('layout.case_sign_limited')}}</div>
      <div class="case-main__name">{{cs.title}}</div>

      <div class="case-main__price main-case-price" :style="{transform: `translate(-${translate}px)`, transition}">
        <div class="main-case-price__container" ref="priceLabel">
          <div class="main-case-price__left">
            <span class="main-case-price__left-span">{{$t('index.open')}}</span>
          </div>
        </div>
        <div class="main-case-price__right">
          <span class="main-case-price__right-span">${{formatPrice(cs.price)}} USD</span>
        </div>
      </div>

    </div>

    <div class="case-main__sold" v-if="isSoldLabelShown">{{$t('index.already_sold')}}: <strong v-html="labelSold"></strong></div>
  </router-link>
</template>

<script>
  import { eventBus, baseLink } from '@/logics';

  export default {
    name: 'CaseBox',
    props: {
      cs: {
        type: Object,
        default: () => ({}),
      },
    },
    data: () => ({
      baseLink,
      translate: 0,
      transition: '',
    }),
    computed: {
      isSoldLabelShown() {
        return this.cs.hasOwnProperty('opens_limit') && this.cs.hasOwnProperty('opens_count');
      },
      isDisabled() {
        return !+this.cs.is_available && this.cs.hasOwnProperty('is_available');
      },
      shadowBG() {
        if (this.cs.shadow_image) {
          return {
            'background-image': `url(${this.baseLink + this.cs.shadow_image})`,
          };
        }
      },
      thumbBg() {
        if (this.cs.front_image && this.cs.image) {
          return {
            'background-image': `url(${this.baseLink + this.cs.image})`,
          };
        }
      },
      labelSold() {
        const limit = this.cs.opens_limit;
        const count = (+this.cs.opens_count).toLocaleString();
        if (+limit !== 0) return `${count} / ${(+limit).toLocaleString()}`;
        return count;
      },
    },
    watch: {
      translate(val) {
        if (val) {
          this.$nextTick(() => {
            this.transition = 'transform .3s';
          });
        }
      },
    },
    methods: {
      formatPrice(price) {
        return (+price).toLocaleString().replace(/,/, '.');
      },
      calcPriceLabelWidth(currentScreen) {
        const screens = {
          0: 7,
          719: 10,
          1279: 7,
          1599: 10,
        };
        const scr = Object.keys(screens)
          .sort((a, b) => b - a)
          .find(screen => screen < currentScreen);
        this.translate = (this.$refs.priceLabel.getBoundingClientRect().width) / 2 - screens[scr];
      },
    },
    mounted() {
      this.calcPriceLabelWidth(window.innerWidth);

      eventBus.$on('window_resize', screen => {
        this.calcPriceLabelWidth(screen);
      });
    },
    destroyed() {
      eventBus.$off('window_resize');
    },
  };
</script>

<style lang="scss">
  @import "case-box";
</style>
