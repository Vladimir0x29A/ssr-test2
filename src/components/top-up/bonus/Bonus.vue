<template>
  <div class="top-up-bonus">

    <div class="top-up-bonus__item"
         :class="[
           `top-up-bonus__item--${bonus.name}`,
            {'top-up-bonus__item--disabled': isDisabled(bonus)}
         ]"
         v-for="(bonus, index) in bonuses"
         v-if="bonus.name in available"
    >
      <div class="top-up-bonus__icon-block" :class="`top-up-bonus__icon-block--${bonus.name}`">
        <img class="top-up-bonus__icon" :class="`top-up-bonus__icon--${bonus.name}`" :src="require(`@/assets/images/icons/${bonus.img}`)" :alt="bonus.name">
      </div>

      <div class="top-up-bonus__text">
        <span v-for="label in bonus.label" :class="formatLabel(label, bonus.name)">
          {{extractValue(label.text)}}
        </span>
      </div>

      <div class="top-up-bonus__check-block">
        <svg class="top-up-bonus__check-sign" viewBox="0 0 16 14" width="16" height="14">
          <path d="M1 6L0 7l6 7L16 1l-1-1-9 8-5-2z"/>
        </svg>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'Bonus',
    props: {
      available: {
        type: Object,
        default: () => ({}),
      },
      amount: {
        type: Number,
        default: null,
      },
    },
    data() {
      return {
        levels: [4, 9, 30, 70, 150, 300],
        bonuses: [
          {
            name: 'percent',
            img: 'percent.svg',
            label: [
              {
                text: '+5%',
                isFormatted: true,
              },
              {
                text: 'popups.refill_bonus',
              },
            ],
          },
          {
            name: 'freecase',
            img: 'freecase.svg',
            label: [
              {
                text: 'popups.refill_free_case',
                isFormatted: true,
              },
              {
                text: 'popups.refill_free_case_cont',
              },
            ],
          },
          {
            name: 'bonus',
            img: 'dollar.svg',
            label: [
              {
                text: 'popups.add_funds_daily_possible_level_1',
              },
              {
                text: 'this.level',
                isFormatted: true,
              },
              {
                text: 'popups.add_funds_daily_possible_level_2',
              },
              {
                text: 'popups.add_funds_daily_possible_level_3',
                isFormatted: true,
              },
            ],
          },
        ],
      }
    },
    computed: {
      level() {
        for (let i = this.levels.length; i >= 0; i--) {
          if (+this.amount > this.levels[i]) return i + 1;
        }
        return 0;
      },
    },
    methods: {
      formatLabel(label, name) {
        if (label.isFormatted) {
          return [
            'top-up-bonus__span',
            `top-up-bonus__span--${name}`,
          ];
        }
      },
      extractValue(text) {
        return ~text.indexOf('this.') ? this[text.slice(5)] : this.$t(text);
      },
      isDisabled(bonus) {
        // return !this.available[bonus.name];
        return !(bonus.name === 'bonus' && this.level);
      },
    },
  };
</script>

<style lang="scss">
  @import "bonus";
</style>
