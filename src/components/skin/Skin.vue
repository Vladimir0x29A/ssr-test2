<template>
  <div class="skin" :class="[cssHoverable, {'skin--hovered-slider': isSlider && skinOptions.selected}]" @click="choose">
    <div class="skin__top skin-top top-skin--tooltip" v-if="skin.is_hot">
      <div class="skin__tooltip tooltip">
        <span class="tooltip__message tooltip__message--skin">{{$t('case.hot_skin')}}</span>
      </div>
    </div>

    <div class="skin__slider-hover" v-if="isSlider"></div>

    <div class="skin__thumb" :class="cssThumb">
      <img class="skin__img" :class="{'skin__img--game': skin.type === 'game'}" alt="" :src="`${fixLink(skin.image)}`">
    </div>

    <img class="skin__stattrak"
         v-if="skin.is_stattrak"
         src="@/assets/images/icons/stattrak-skin.png"
         alt="stattrak">

    <div class="skin__labels" :class="{'skin__labels--big': isBig}">
      <div class="skin__label">{{skin.firstname}}</div>
      <div class="skin__label" v-if="skin.secondname">{{secondnameStr}}</div>
    </div>

    <div class="skin__price" :class="{'skin__price--big': isBig}" v-if="isPrice">${{skin.price}}</div>

    <router-link :to="`/item/${skin.static_name}`" class="skin__item-link" v-if="isLinkToItemPageAppeared"></router-link>

    <router-link class="skin__avatar" :to="`/user/${user.id}`" v-if="user.id">
      <img class="skin__avatar-img" :src="user.avatar" alt="avatar">
    </router-link>

    <router-link class="skin__case-link"
                 :to="'/' + skinCase.static_name"
                 v-else-if="skinCase && skinCase.static_name"
    >
      <img class="skin__case-img skin__case-img--shadow" :src="fixLink(skinCase.shadow_image)" alt="">
      <img class="skin__case-img" :src="fixLink(skinCase.image)" alt="">
      <img class="skin__case-img" :src="fixLink(skinCase.front_image)" alt="">
    </router-link>

    <div class="skin__header-label" v-if="isManager && headerLabel">{{headerLabel}}</div>
  </div>
</template>

<script>
import { fixLink } from '@/logics';
import { mapMutations } from 'vuex';

export default {
  name: 'Skin',
  props: {
    skinCase: {
      type: Object,
      default: null,
    },
    isManager: {
      type: Boolean,
      default: false,
    },
    skin: {
      type: Object,
      default: () => ({}),
    },
    skinOptions: {
      type: Object,
      default: () => ({}),
    },
    isPrice: {
      type: Boolean,
      default: false,
    },
    isBig: {
      type: Boolean,
      default: false,
    },
    isSlider: {
      type: Boolean,
      default: false,
    },
    isItemLink: {
      type: [Boolean, String],
      default: false,
    },
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    cssHoverable() {
      if (this.user.id) return 'skin--hoverable-avatar';
      if (this.skinCase && this.skinCase.static_name) return 'skin--hoverable-case';
      if (this.isSlider) return 'skin--hoverable-slider';
    },
    rarity() {
      const rarity = this.skin.rarity;
      if (rarity) return `skin__thumb--${rarity}`;
    },
    cssThumb() {
      return [
        this.rarity,
        {
          'skin__thumb--bottom': this.isManager,
          'skin__thumb--big': this.isBig,
          'skin__thumb--header-label': this.isManager && this.headerLabel,
        },
      ];
    },
    headerLabel() {
      if (['new', 'reserved'].includes(this.skinOptions.state) && this.skinOptions.type === 'csgoitem') {
        if (!this.skinOptions.stock_available) return this.$t('user.out_of_stock');

        const available_in = this.skinOptions.available_in;

        if (!available_in) return this.$t('user.avaible_now');

        else {
          const days = ~~(available_in / (60 * 24));
          const hours = ~~((available_in % (60 * 24)) / 60);
          const minutes = ~~(available_in % (60 * 24) % 60);

          const daysStr = days ? ` ${days}d` : '';
          const hoursStr = hours ? ` ${hours}h` : '';
          const minutesStr = minutes && !days ? ` ${minutes}m` : '';

          return this.$t('user.avaible_in') + daysStr + hoursStr + minutesStr;
        }
      }
    },
    isLinkToItemPageAppeared() {
      return this.skin.static_name && ((this.isItemLink && this.skin.type === 'csgoitem') || this.isItemLink === 'force');
    },
    secondnameStr() {
      return this.skin.secondname && (this.skin.secondname + (this.skin.quality ? ` (${this.skin.quality})` : ''));
    },
  },
  methods: {
    ...mapMutations([
      'chooseSkinToSwap',
    ]),
    fixLink,
    choose() {
      if (this.isSlider) {
        this.chooseSkinToSwap(this.skinOptions.index);
      }
    },
  },
};
</script>

<style lang="scss">
    @import "skin";
</style>
