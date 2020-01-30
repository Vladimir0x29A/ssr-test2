<template>
  <div class="battle-content__container battle-content__container--single">

    <div class="battle-content__single battle-side">
      <div class="battle-side__text battle-side__text--win-title battle-side__text--one">Horde wins!</div>
      <div class="battle-side__single-image battle-side-image">
        <img class="battle-side-image__light battle-side-image__light--filter" src="@/assets/images/battle/light.png" alt="">
        <img class="battle-side-image__light battle-side-image__light--anim-reverse battle-side-image__light--filter" src="@/assets/images/battle/light.png" alt="">
        <img class="battle-side-image__fx battle-side-image__fx--anim-1 battle-side-image__fx--one" src="@/assets/images/battle/fx-red.png" alt="">
        <img class="battle-side-image__fx battle-side-image__fx--anim-2 battle-side-image__fx--one" src="@/assets/images/battle/fx-red.png" alt="">
        <img class="battle-side-image__fx battle-side-image__fx--anim-3 battle-side-image__fx--one" src="@/assets/images/battle/fx-red.png" alt="">
        <img class="battle-side-image__img" src="@/assets/images/battle/horde.png" alt="">
      </div>
      <div class="battle-side__text battle-side__text--horde battle-side__text--count battle-side__text--one">1593</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'BattleHorde'
  };
</script>
