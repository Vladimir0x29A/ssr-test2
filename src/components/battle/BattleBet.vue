<template>
  <div class="battle-content__container">

    <div class="battle-content__column battle-side">
      <div class="battle-side__text battle-side__text--horde battle-side__text--count battle-side__text--one">2</div>
      <div class="battle-side-image">
        <img class="battle-side-image__fx battle-side-image__fx--anim-1 battle-side-image__fx--one" src="@/assets/images/battle/fx-red.png" alt="">
        <img class="battle-side-image__fx battle-side-image__fx--anim-2 battle-side-image__fx--one" src="@/assets/images/battle/fx-red.png" alt="">
        <img class="battle-side-image__fx battle-side-image__fx--anim-3 battle-side-image__fx--one" src="@/assets/images/battle/fx-red.png" alt="">
        <img class="battle-side-image__img" src="@/assets/images/battle/horde.png" alt="">
      </div>
      <div class="battle-side__text battle-side__text--bet-label battle-side__text--one">For the <span class="battle-side__span">Horde</span>!</div>
      <button class="battle-side__button battle-button">$3.99 USD</button>
    </div>

    <div class="battle-content__vs battle-vs">
      <div class="battle-vs__back">VS</div>
      <div class="battle-vs__front">VS</div>
      <img class="battle-vs__fx" src="@/assets/images/battle/fx-vs.png" alt="">
      <img class="battle-vs__fx battle-vs__fx--anim-2" src="@/assets/images/battle/fx-vs.png" alt="">
      <img class="battle-vs__fx battle-vs__fx--anim-3" src="@/assets/images/battle/fx-vs.png" alt="">
      <img class="battle-vs__fx battle-vs__fx--anim-4" src="@/assets/images/battle/fx-vs.png" alt="">
    </div>

    <div class="battle-content__column battle-side">
      <div class="battle-side__text battle-side__text--alliance battle-side__text--count battle-side__text--two">4</div>
      <div class="battle-side-image">
        <img class="battle-side-image__fx battle-side-image__fx--anim-1 battle-side-image__fx--two" src="@/assets/images/battle/fx-blue.png" alt="">
        <img class="battle-side-image__fx battle-side-image__fx--anim-2 battle-side-image__fx--two" src="@/assets/images/battle/fx-blue.png" alt="">
        <img class="battle-side-image__fx battle-side-image__fx--anim-3 battle-side-image__fx--two" src="@/assets/images/battle/fx-blue.png" alt="">
        <img class="battle-side-image__img" src="@/assets/images/battle/alliance.png" alt="">
      </div>
      <div class="battle-side__text battle-side__text--bet-label battle-side__text--two">For the <span class="battle-side__span">Alliance</span>!</div>
      <button class="battle-side__button battle-button">$3.99 USD</button>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'BattleBet'
  };
</script>
