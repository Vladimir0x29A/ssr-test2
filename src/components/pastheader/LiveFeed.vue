<template>
  <transition-group tag="div" name="livefeed" class="livefeed">
    <router-link :to="'/user/' + winner.user_id"
                 class="livefeed__item"
                 :class="cssRarity(winner.skin_rarity)"
                 v-for="winner in winnersGetter"
                 :key="winner.win_id"
    >
      <img class="livefeed__img" :src="winner.skin_image" alt="">
      <img class="livefeed__stattrak"
           v-if="winner.is_stattrak"
           src="@/assets/images/icons/stattrak-skin.png"
           alt="stattrak">

      <div class="livefeed__center">
        <div class="livefeed__labels">
          <div class="livefeed__label livefeed__label--name">{{winner.skin_name_first}} | {{winner.skin_name_second}}</div>
          <div class="livefeed__label livefeed__label--user">{{winner.nickname}}</div>
          <div class="livefeed__label livefeed__label--case">{{winner.case_name}}</div>
        </div>
      </div>
    </router-link>
  </transition-group>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'LiveFeed',
    computed: {
      ...mapGetters([
        'winnersGetter',
      ]),
    },
    methods: {
      cssRarity(rarity) {
        if (rarity) return `livefeed__item--${rarity}`;
      },
    },
  };
</script>
