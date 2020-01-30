<template>
  <div class="daily-bonus-stat block-style block-style--padding">
    <h4 class="daily-bonus-stat__header">{{$t('dailybonus.top_header')}}</h4>
    <div class="daily-bonus-stat__container">
      <DailyBonusStatItem class="daily-bonus-stat__item"
                          :class="{'daily-bonus-stat__item--single': isSingle}"
                          :user="item.user"
                          :skin="item.skin_data"
                          :key="item.user.id"
                          v-for="item in this.dailybonusTopGetter"/>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { fixLink } from '@/logics';
  import DailyBonusStatItem from './DailyBonusStatItem';

  export default {
    name: 'DailyBonusTop',
    components: {
      DailyBonusStatItem,
    },
    props: {
      isSingle: {
        type: Boolean,
        default: true,
      }
    },
    computed: {
      ...mapGetters([
        'dailybonusTopGetter',
      ]),
    },
    methods: {
      ...mapActions([
        'fetchDailybonusTop',
      ]),
      fixLink,
    },
    created() {
      this.fetchDailybonusTop();
    }
  };
</script>
