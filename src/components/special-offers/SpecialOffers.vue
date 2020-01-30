<template>
  <div class="special-offers">
    <div class="special-offers-header">
      <div class="special-offers-header__title">Special offers</div>
      <button class="special-offers-header__hidder"
              :class="{'special-offers-header__hidder--shown': isOffersShown}"
              @click="isOffersShown = !isOffersShown"
      >
        <template v-if="isOffersShown">hide offers</template>
        <template v-else>show offers</template>
      </button>
    </div>

    <div class="special-offers-container" v-if="isOffersShown">
      <div class="columner-special-offers">
        <router-link :to="`/${cs['static_name']}`"
                     class="case-offer columner-special-offers__item"
                     v-for="cs in offers" :key="cs"
        >
          <div class="case-offer__thumb-container">
            <div class="case-offer__thumb case-offer__thumb--float case-offer__thumb--shadow" v-if="cs.shadow_image">
              <img class="case-offer__shadow-img" :src="baseLink + cs.shadow_image" alt="">
            </div>

            <div class="case-offer__thumb" v-if="cs.image">
              <img class="case-offer__img" :src="baseLink + cs.image" alt="">
            </div>

            <div class="case-offer__thumb case-offer__thumb--float" v-if="cs.front_image">
              <img class="case-offer__img" :src="baseLink + cs.front_image" alt="">
            </div>
          </div>

          <div class="case-offer__title">
            {{cs.title}}
            <span class="case-offer__discount">-{{cs.discount}}%</span>
          </div>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
  import { baseLink } from '@/logics';

  export default {
    name: 'SpecialOffers',
    props: {
      offers: {
        type: Array,
        default: () => [],
      },
    },
    data: () => ({
      baseLink,
      isOffersShown: true,
    }),
    methods: {
      shadowBG(cs) {
        if (cs.shadow_image) {
          return {
            'background-image': `url(${baseLink + cs.shadow_image})`,
          };
        }
      },
    },
  };
</script>

<style lang="scss">
  @import "special-offers";
</style>
