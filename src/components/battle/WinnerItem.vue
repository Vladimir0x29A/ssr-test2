<template>
  <div class="winner-item">

    <a class="winner-item__user" :href="`/user/${item.id}`">
      <img class="winner-item__avatar" :src="`https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/${item.avatar}_full.jpg`">
      <span class="winner-item__nickname">{{item.name}}</span>
    </a>

    <div class="winner-item__case">
      <img class="winner-item__case-img winner-item__case-img--shadow" :src="`http://csgo.kobal.cc/assets/images/cases_shadows/${item.case}.png`" alt="">
      <img class="winner-item__case-img" :src="`http://csgo.kobal.cc/assets/images/cases/${item.case}.png`" alt="">
      <img class="winner-item__case-img" :src="`http://csgo.kobal.cc/assets/images/cases_weapons/${item.case}.png`" alt="">
    </div>

  </div>
</template>

<script>
  import { fixLink } from '@/logics';

  export default {
    name: 'WinnerItem',
    props: {
      item: {
        type: Object,
        default: () => ({
          id: null,
          avatar: null,
          name: null,
          case: null,
        }),
      }
    },
    methods: {
      fixLink,
    },
  };
</script>
