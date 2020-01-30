<template>
  <div class="cookies-note wrapper-main" v-if="!isCookiesNoteHidden">
    <div class="cookies-note__container wrapper-main__content wrapper-main__content--wide">
      We use cookies to offer you a better browser experience, analyze site traffic, personalize content, and server targeted advertisements. If you continue to use this site, you consent to our use of cookies.
      <button class="cookies-note__button button button--default" @click="acceptCookies">
        <span class="button__label">ACCEPT</span>
      </button>
    </div>
  </div>
</template>

<script>
let VueCookies = '';
if (typeof window !== 'undefined') {
  VueCookies = require('vue-cookies');
}

export default {
  name: 'Cookies',
  data: () => ({
    isCookiesNoteHidden: true,
  }),
  methods: {
    acceptCookies() {
      this.isCookiesNoteHidden = true;
      VueCookies.set('is_cookies_note_hidden', '1');
    },
  },
  mounted() {
    this.isCookiesNoteHidden = !!+VueCookies.get('is_cookies_note_hidden');
  }
};
</script>
<style lang="scss">
  @import 'cookies';
</style>
