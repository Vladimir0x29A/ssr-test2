<template>
  <div class="battle-winners">
    <div class="battle-winners__header">Super prize winners:</div>
    <div class="columner-battle-winners">
      <WinnerItem class="columner-battle-winners__item" v-for="item in topDrop" :item="item" :key="item"/>
    </div>
  </div>
</template>

<script>
  import WinnerItem from './WinnerItem';

  export default {
    name: 'BattleWinners',
    components: {
      WinnerItem
    },
    data: () => ({
      topDrop: [
        {
          id: '2890415',
          name: 'Who Is Kurt?',
          avatar: '83/8387007f63c8edf18feba240b9d6b5e8f350914f',
          case: 'pepe-case',
        },
        {
          id: '635300',
          name: 'Ev7oh1gh(挂卡中，不玩)',
          avatar: 'ad/adc5cf513dcf9f9cbee7e92c8a6f7416c22cec72',
          case: 'random-awp',
        },
        {
          id: '2691922',
          name: 'Lorry is rolling lonely lollipop',
          avatar: '90/903924fd9d443f43e7b121d085062fbdd2064f25',
          case: 'random-ak-47',
        },
        {
          id: '2890415',
          name: 'Who Is Kurt?',
          avatar: '83/8387007f63c8edf18feba240b9d6b5e8f350914f',
          case: 'random-m4a4',
        },
      ],
    }),
  };
</script>
