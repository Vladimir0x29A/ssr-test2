<template>
  <div class="buttoned-input__button dropout-list" v-if="selected">
    <button class="dropout-list__button" @click="openList" v-click-outside="closeList">
      <img :src="require(`@/assets/images/icons/${selectedImg}.png`)" alt="">
    </button>

    <transition name="dropout-list">
      <div class="dropout-list__list" v-if="isOpened">
        <button class="dropout-list__list-item" @click="chooseOption(item.option)" v-for="item in optionsAvailable">
          <img :src="require(`@/assets/images/icons/${item.img}.png`)" alt="">
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'SelectorImaged',
    props: {
      options: {
        type: Array,
        default: () => [],
      },
      selected: {
        type: String,
        default: '',
      },
    },
    model: {
      prop: 'selected',
      event: 'change',
    },
    data: () => ({
      isOpened: false,
    }),
    computed: {
      selectedImg() {
        return this.options.find(item => item.option === this.selected).img;
      },
      optionsAvailable() {
        return this.options.filter(item => item.option !== this.selected);
      },
    },
    methods: {
      openList() {
        this.isOpened = !this.isOpened;
      },
      closeList() {
        this.isOpened = false;
      },
      chooseOption(option) {
        this.isOpened = false;
        this.$emit('change', option);
      },
    },
    mounted() {
      if (!this.selected) {
        this.$emit('change', this.options.length && this.options[0].option);
      }
    }
  };
</script>

<style lang="scss">
  @import 'selector-imaged';
</style>
