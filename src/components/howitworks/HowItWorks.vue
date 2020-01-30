<template>
  <div class="case__info block-style howitworks">
    <div class="howitworks__head" @click="isActive = !isActive" :class="{'howitworks__head--active': isActive}">
      <span class="howitworks__icon">
        <svg width="12" height="2" v-if="isActive">
          <path d="M0 0h12v2H0V0z"/>
        </svg>

        <svg width="12" height="12" v-if="!isActive">
          <path d="M12 5H7V0H5v5H0v2h5v5h2V7h5z"/>
        </svg>
      </span>

      <h4 class="howitworks__title">{{data.title}}</h4>
    </div>

    <div class="howitworks__paragraphs" v-if="isActive">
      <p class="howitworks__paragraph" v-for="paragraph in data.paragraphs">{{paragraph}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HowItWorks',
    props: {
      data: {
        type: Object,
        default: {
          title: '',
          paragraphs: [],
        },
      },
    },
    data: () => ({
      isActive: true,
    }),
    mounted() {
      this.isActive = false;
    }
  };
</script>

<style lang="scss">
  @import "howitworks";
</style>
