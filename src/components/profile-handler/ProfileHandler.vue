<template>
  <!--<div class="logged profile-handler" v-if="this.isLoggedGetter">-->
  <div class="logged profile-handler">

    <router-link :to="`/user/${this.userGetter.id}`" class="profile-handler__avatar-link profile-handler__stream-el">
      <img :src="this.userGetter.avatar" alt="avatar" class="profile-handler__avatar">
    </router-link>

    <div class="profile-handler__balance profile-handler__stream-el">${{userGetter.balance}}</div>

    <router-link to="/pay" class="button button--gold-bright button--color-dark button--add-funds profile-handler__stream-el" v-if="!isPlus">
      <span class="button__label" >{{$t('layout.header_add_funds')}}</span>
    </router-link>

    <router-link to="/pay" class="button button--gold-bright button--color-dark button--plus profile-handler__stream-el" v-else>
      <span class="button__label" >
        <svg width="12" height="12" slot="btn">
          <path d="M0,5h5V0h2V5h5v2H7v5H5V7H0z"/>
        </svg>
      </span>
    </router-link>

    <!--<button class="profile-handler__notification-button profile-handler__stream-el-2" :class="{'profile-handler__notification-button&#45;&#45;active': isBellActive}" @click="isBellActive = !isBellActive">
      <svg viewBox="0 0 14 18" width="14" height="18">
        <path fill="#fff" d="M12 7c0-2.8-1.6-4.4-4-5V1c0-.6-.4-1-1-1-.6 0-1 .4-1 1v1c-2.4.6-4 2.2-4 5v5l-2 2v1h14v-1l-2-2V7zM7 18c1 0 2-1 2-2H5c0 1 1 2 2 2z"/>
      </svg>
    </button>-->

    <button @click="logout" class="profile-handler__logout profile-handler__stream-el-2"></button>
  </div>

  <!--<a href="/sign/in" class="fix-profile__login login" v-else @click.prevent="logIn">Sign in through STEAM</a>-->
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'ProfileHandler',
  props: {
    isPlus: {
      type: Boolean,
      default: false,
    },
  },
  /*data: () => ({
    isBellActive: true,
  }),*/
  computed: {
    ...mapState([
      'baseApiUrl',
    ]),
    ...mapGetters([
      'userGetter',
      'isLoggedGetter',
      'userGetter',
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
    logout() {
      this.fetchLogout();
    },
  },
};
</script>

<style lang="scss">
    @import "profile-handler";
</style>
