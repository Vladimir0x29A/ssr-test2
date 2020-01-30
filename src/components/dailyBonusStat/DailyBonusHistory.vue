<template>
  <div class="daily-bonus-stat block-style block-style--padding">
    <h4 class="daily-bonus-stat__header">{{$t('dailybonus.history_header')}}</h4>
    <div class="daily-bonus-stat__container">
      <DailyBonusStatItem class="daily-bonus-stat__item daily-bonus-stat__item--single"
                          :date="item.date"
                          :skin="item.skin_data"
                          v-for="item in this.dailybonusHistoryGetter"
                          :key="item.date"/>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import DailyBonusStatItem from './DailyBonusStatItem';

  export default {
    name: 'DailyBonusHistory',
    components: {
      DailyBonusStatItem,
    },
    computed: {
      ...mapGetters([
        'dailybonusHistoryGetter',
      ]),
    },
    methods: {
      ...mapActions([
        'fetchDailybonusHistory',
      ]),
    },
    created() {
      this.fetchDailybonusHistory();
    }
  };
</script>
