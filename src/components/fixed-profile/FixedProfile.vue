<template>
  <div class="fix-profile" :class="{'fix-profile--fixed': isProfileShown}">
    <div class="fix-profile__width-limiter width-limiter">
      <ProfileHandler class="fix-profile__logged logged" is-plus v-if="this.isLoggedGetter"/>
      <a href="#" class="fix-profile__login login" v-else @click.prevent="logIn">{{$t('layout.header_sign_in')}}</a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { eventBus } from '@/logics';
import ProfileHandler from '@/components/profile-handler/ProfileHandler';

export default {
  name: 'FixedProfile',
  components: {
    ProfileHandler,
  },
  data: () => ({
    isProfileShown: false,
  }),
  computed: {
    ...mapGetters([
      'userGetter',
      'isLoggedGetter',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchAuth',
      'fetchLogout',
    ]),
    logIn() {
      this.fetchAuth();
    },
  },
  mounted() {
    eventBus.$on('show-fixed-profile', (e) => {
      this.isProfileShown = e;
    });
  },
};
</script>

<style lang="scss">
    @import "fixed-profile";
</style>
