<template>
  <div class="wrapper-main">
    <div class="pastheader wrapper-main__content wrapper-main__content--wide" id="PastHeader">

      <div class="total-stats">
        <div class="columner-total-stats">
          <div class="columner-total-stats__item total-stats__type total-stats__type--total">
            <p class="total-stats__label total-stats__label--total">Total opened</p>
            <div class="total-stats__count">{{formattedStatObj.cases_opened}}</div>
          </div>
          <div class="columner-total-stats__item total-stats__type total-stats__type--rare">
            <p class="total-stats__label total-stats__label--rare">Knives</p>
            <div class="total-stats__count">{{formattedStatObj.rare_skins_count}}</div>
          </div>
          <div class="columner-total-stats__item total-stats__type total-stats__type--covert">
            <p class="total-stats__label total-stats__label--covert">Covert</p>
            <div class="total-stats__count">{{formattedStatObj.covert_skins_count}}</div>
          </div>
          <div class="columner-total-stats__item total-stats__type total-stats__type--classified">
            <p class="total-stats__label total-stats__label--classified">Classified</p>
            <div class="total-stats__count">{{formattedStatObj.classified_skins_count}}</div>
          </div>
          <div class="columner-total-stats__item total-stats__type total-stats__type--restricted">
            <p class="total-stats__label total-stats__label--restricted">Restricted</p>
            <div class="total-stats__count">{{formattedStatObj.restricted_skins_count}}</div>
          </div>
          <div class="columner-total-stats__item total-stats__type total-stats__type--milspec">
            <p class="total-stats__label total-stats__label--milspec">Mil-Spec</p>
            <div class="total-stats__count">{{formattedStatObj.milspec_skins_count}}</div>
          </div>
        </div>
      </div>

      <div class="recent-head">{{$t('layout.scroller')}}</div>

      <LiveFeed/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LiveFeed from './LiveFeed';

export default {
  name: 'Pastheader',
  components: {
    LiveFeed,
  },
  computed: {
    ...mapGetters([
      'statObj',
    ]),
    formattedStatObj() {
      const obj = Object.assign({}, this.statObj);
      Object.keys(obj).forEach((key) => {
        obj[key] = obj[key].toLocaleString();
      });
      return obj;
    },
  },
  methods: {
    ...mapActions([
      'getStat',
      'liveFeedInit',
    ]),
  },
  mounted() {
    this.getStat();
    this.liveFeedInit();
  },
};
</script>

<style lang="scss">
  @import "pastheader";
</style>
