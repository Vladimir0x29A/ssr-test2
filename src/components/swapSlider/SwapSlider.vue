<template>
  <div class="swap-slider">
    <Carousel class="swap-slider__container"
              :per-page="3"
              :mouse-drag="false"
              :pagination-enabled="false"
              :navigation-enabled="true"
              :navigationNextLabel="null"
              :navigationPrevLabel="null"
              :navigationClickTargetSize="12"
    >
      <Slide class="swap-slider__item" v-for="(item, index) in items" :key="item">
        <Skin class="swap-slider__skin" :skin="item.item_id" is-price is-slider :skin-options="skinOptions(index)"/>
      </Slide>
    </Carousel>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  // import { Carousel, Slide } from 'vue-carousel';
  let { Carousel, Slide } = '';
  if(typeof window !== 'undefined') {
      Carousel = require('vue-carousel');
      Slide = require('vue-carousel');
  }
  import Skin from '../skin/Skin';

  export default {
    name: 'SwapSlider',
    components: {
      Skin,
      Carousel,
      Slide,
    },
    props: {
      items: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      ...mapGetters([
        'selectedSkinToSwapGetter',
      ]),
    },
    methods: {
      ...mapMutations([
        'chooseSkinToSwap',
      ]),
      skinOptions(index) {
        return {
          selected: index === this.selectedSkinToSwapGetter,
          index,
        }
      },
    },
    beforeDestroy() {
      this.chooseSkinToSwap(null);
    },
  };
</script>

<style lang="scss">
  @import "swap-slider";
</style>
