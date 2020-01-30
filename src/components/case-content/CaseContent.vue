<template>
    <div class="case-content">
        <div class="case-content__arrow case-content__arrow--left" :class="cssArrows" v-if="cs.arrows_image">
            <img :src="arrowImg" alt="arrow" v-if="cs">
        </div>

        <div class="case-content__arrow case-content__arrow--right" :class="cssArrows" v-if="cs.arrows_image">
            <img :src="arrowImg" alt="arrow" v-if="cs">
        </div>

        <div class="case-content__thumb" :style="bgThumb" v-if="!isLoadingShown && isThumbShown" key="thumb">
            <img :src="imgThumb" alt="thumb" v-if="imgThumb">
        </div>

        <div class="case-content__win-thumb" v-if="!isLoadingShown && !isThumbShown" key="win-thumb">
            <img class="case-content__win-img" :src="skinImg" alt="win-img">
        </div>

        <div class="case-content__loading" v-if="isLoadingShown">
            <img src="@/assets/images/loader.png" alt="">
        </div>

        <button class="case-content__pace pace-adjuster"
                v-if="!isLoadingShown && isThumbShown"
                :class="{'pace-adjuster--fast': this.isFast}"
                @click="this.toggleFastState">
        </button>

        <button class="case-content__sound sound-adjuster"
                v-if="!isLoadingShown && isThumbShown"
                :class="{'sound-adjuster--muted': this.isMute}"
                @click="this.toggleMuteState">
        </button>

        <div class="case-content__labels case-content-labels" v-if="!isLoadingShown && !isThumbShown">
            <div class="case-content-labels__title">{{$t('case.you_recieved')}}:</div>
            <div class="case-content-labels__name">{{skinName}}</div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { eventBus, baseLink } from '@/logics';

export default {
  name: 'CaseContent',
  data: () => ({
    loading: false,
    isArrowsDisappeared: true,
  }),
  props: {
    cs: {
      type: Object,
    },
    isBg: {
      type: Boolean,
      default: false,
    },
    isThumbShown: {
      type: Boolean,
      default: true,
    },
    skinImg: {
      type: String,
      default: '',
    },
    skinName: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState([
      'isFast',
      'isMute',
    ]),
    arrowImg() {
      if (this.cs && this.cs.arrows_image) {
        return baseLink + this.cs.arrows_image;
      }
    },
    isLoadingShown() {
      return this.loading && this.isFast;
    },
    imgThumb() {
      if (this.cs) {
        if (this.cs.front_image) {
          return baseLink + this.cs.front_image;
        }
        if (this.cs.image) {
          return baseLink + this.cs.image;
        }
      }
    },
    bgThumb() {
      if (this.cs && this.cs.front_image) {
        return {
          'background-image': `url(${baseLink + this.cs.image})`,
        };
      }
    },
    cssArrows() {
      return {
        'case-content__arrow--disappeared': this.isArrowsDisappeared,
      };
    },
  },
  watch: {
    isThumbShown(val) {
      if (!val) {
        this.loading = false;
      }
    },
  },
  methods: {
    ...mapMutations([
      'toggleFastState',
      'toggleMuteState',
    ]),
  },
  mounted() {
    eventBus.$on('openfast', () => {
      this.loading = true;
    });

    eventBus.$on('cancelLoading', () => {
      this.loading = false;
    });

    setTimeout(() => {
      this.isArrowsDisappeared = false;
    }, 100);
  },
};
</script>

<style lang="scss">
  @import "case-content";
</style>
