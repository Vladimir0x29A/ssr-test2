<template>
  <div class="case-items2 block-style block-style--padding width-limiter">
    <div class="case-items2__header-container">
      <h4 class="case-items2__header" v-if="isDailyBonus">{{$t('case.items_in')}} <b class="case-items2__colored case-items2__colored--green">{{$t('dailybonus.dailybonus')}}</b></h4>
      <h4 class="case-items2__header" v-else>{{$t('case.items_in')}} <b class="case-items2__colored">{{caseName}}</b></h4>
      <div class="case-items2__share-container">
        {{$t('case.if_you_like')}}
        <Share class="case-items2__share"/>
      </div>
    </div>

    <div class="columner-skins-case">
      <Skin class="columner-skins-case__item case-items2__skin"
             :skin="skin"
             is-item-link
             :key="skin.id"
             v-for="skin in skins"
      />
    </div>
  </div>
</template>

<script>
import Skin from '@/components/skin/Skin';
import Share from '../share/Share';

export default {
  name: 'CaseItems',
  components: { Share, Skin },
  props: {
    skins: {
      type: Array,
      default: {},
    },
    caseName: {
      type: String,
      default: null,
    },
    isDailyBonus: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
  @import "case-items";
</style>
