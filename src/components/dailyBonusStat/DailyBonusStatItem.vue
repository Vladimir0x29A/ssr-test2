<template>
  <div class="daily-bonus-stat-item">

    <div class="daily-bonus-stat-item__date" v-if="date">{{date}}</div>

    <router-link class="daily-bonus-stat-item__user daily-bonus-stat-user" :to="`/user/${user.id}`" v-else>
      <img class="daily-bonus-stat-user__avatar" :src="user.avatar">
      <span class="daily-bonus-stat-user__nickname">{{user.nickname}}</span>
    </router-link>

    <div class="daily-bonus-stat-item__case daily-bonus-stat-case" :class="cssRarity">
      <img class="daily-bonus-stat-case__img" :src="fixLink(skin.image)" alt="">
      <div class="daily-bonus-stat-case__label">{{skin.market_hash_name}}</div>
    </div>

  </div>
</template>

<script>
  import { fixLink } from '@/logics';

  export default {
    name: 'DailyBonusStatItem',
    props: {
      date: {
        type: String,
        default: '',
      },
      user: {
        type: Object,
        default: () => ({}),
      },
      skin: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      cssRarity() {
        return 'daily-bonus-stat-case--' + this.skin.rarity;
      },
    },
    methods: {
      fixLink,
    },
  };
</script>
