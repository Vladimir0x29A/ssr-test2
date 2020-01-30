<template>
  <social-sharing :url="path" inline-template>
    <div class="share">
      <network network="facebook" class="button button--share button--facebook">
        <span class="button__label button__label--ac">
          <svg width="12" height="12" viewBox="0 0 12 12" class="share__svg">
            <path d="M12 6c0-3.31-2.69-6-6-6S0 2.69 0 6c0 2.99 2.13 5.55 5 6V8H3V6h2V4.45C5 3.15 6.14 2 7.51 2H9v2H8c-.75 0-1 .53-1 1v1h2l-.52 2H7v4c2.87-.45 5-3.01 5-6z"/>
          </svg>
          Share
        </span>
      </network>
      
      <network network="twitter" class="button button--share button--twitter">
        <span class="button__label button__label--ac">
          <svg viewBox="0 0 40.1 32.67" width="14" height="11.4" class="share__svg">
            <path d="M40.1 3.92c-1.5.7-3 1.1-4.7 1.3 1.7-1.1 3-2.7 3.6-4.6-1.6.9-3.3 1.6-5.2 2-5.8-6.1-16.1-.7-14.1 7.5-6.9-.3-12.9-3.6-17-8.6-2.1 3.7-1 8.6 2.6 11-1.3 0-2.6-.4-3.7-1v.1c0 4 2.8 7.3 6.6 8.1-1.2.3-2.4.3-3.7.1 1 3.2 4.1 5.6 7.7 5.7-3.4 2.6-7.6 3.9-12.2 3.4 15.6 10.1 37.1-1.3 36.1-20.8 1.6-1.2 3-2.6 4-4.2z"/>
          </svg>
          Tweet
        </span>
      </network>
    </div>
  </social-sharing>
</template>

<script>
import { mapGetters } from 'vuex';
import { locale, calcPath } from '../../logics';

export default {
  name: 'Share',
  computed: {
    ...mapGetters([
      'isLoggedGetter',
    ]),
    path() {
      return calcPath(locale, this.$route.path);
    },
  },
};
</script>

<style lang="scss">
  @import "share";
</style>
