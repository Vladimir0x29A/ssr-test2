<template>
  <div class="carousel">
    <div class="inner-items carousel__wrapper">
      <div class="carousel__centered">
        <div class="carousel__slider" :style="{transform, transition}" @transitionend="end">
          <Skin class="carousel__skin"
                 :skin="skin"
                 :tooltip="false"
                 v-for="(skin, idx) in carouselSkins"
                 :id="`carousel__skin_${idx}`"
                 :key="idx"/>
        </div>
      </div>
    </div>
    <div class="carousel__win-line"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Skin from '@/components/skin/Skin';
import { shuffle } from '../../logics';

export default {
  name: 'Carousel',
  components: { Skin },
  data: () => ({
    duration: 10,
    itemsAmount: 40,
    carouselSkins: [],
    transition: null,
    transform: null,
    timeout: null,
  }),
  props: {
    skins: {
      type: Array,
      default: {},
    },
    winId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState([
      'isMute',
    ]),
  },
  methods: {
    prepare() {
      const offset = 3;
      const winPos = this.itemsAmount - offset;
      const skinsCount = this.skins.length;
      const shuffledSkins = shuffle(this.skins);

      for (let i = 0; i < this.itemsAmount; i++) {
        this.carouselSkins.push(shuffledSkins[i % skinsCount]);
      }

      this.carouselSkins.splice(winPos, 0, this.skins[this.winId]);
      this.roll();
    },
    roll() {
      setTimeout(() => {
        this.transition = `transform ${this.duration}s`;

        setTimeout(() => {
          const offsetStatic = 1438;
          const offsetRandomRange = 150;
          const offsetRandom = ~~(Math.random() * offsetRandomRange - offsetRandomRange / 2);
          const total = offsetStatic + offsetRandom;

          this.transform = `translate(-100%) translate(${total}px)`;
          this.playTicks();
        }, 150);
      }, 100);
    },
    playTicks() {
      const passedItems = [];
      const winLine = document.getElementsByClassName('carousel__win-line')[0];
      const winLineX = winLine.getBoundingClientRect().x;

      //List of all carousel items
      const carouselSkins = document.getElementsByClassName('carousel__skin');
      const start = Date.now();

      //Skip all passed items
      for (let index = 0; index < carouselSkins.length; index++) {
        const skin = carouselSkins[index];
        const id = skin.id.replace('carousel__skin_', '');

        if (skin.getBoundingClientRect().x < winLineX) {
          passedItems.push(id);
        }
      }

      const interval = setInterval(() => {
        //Check next item position
        const skin = carouselSkins[passedItems.length] || null;

        if (!skin || Date.now() - start > 10000) {
          clearInterval(interval);
          return;
        }

        //Don't check passed items
        const id = skin.id.replace('carousel__skin_', '');
        if (!passedItems.includes(id) && skin.getBoundingClientRect().x < winLineX) {
          passedItems.push(id);
          this.playTick();
        }
      }, 20);
    },
    end() {
      this.$emit('ended');
      if (this.timeout) clearTimeout(this.timeout);

      setTimeout(() => {
        this.$emit('cleared');
        this.transform = null;
        this.transition = null;
        this.carouselSkins = [];
      }, 500);
    },
    playTick() {
      if (this.isMute) {
        return;
      }

      const sound = this.$sound.caseScroll;
      // sound.pause();
      sound.currentTime = 0;
      sound.play();
    }
  },
  created() {
    this.prepare();
  },
};
</script>

<style lang="scss">
  @import "carousel";
</style>
