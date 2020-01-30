<template>
  <div class="about">
    <div class="info width-limiter">
      <h1>{{$t("index.about_header")}}</h1>
      <p v-html="$t('index.about_content')"></p>

      <span class="more-info">{{$t("index.about_content2")}}</span>
      <br>

      <a href="#" class="signin" @click.prevent="logIn">
        <img src="@/assets/images/icons/ico-steam.png" alt="">
        {{$t("layout.header_sign_in")}}
      </a>
    </div>
    <div class="stats clearfix">
      <div class="stat">
        <p id="cases_opened">{{formattedStatObj.cases_opened}}</p>
        {{$t("index.about_opened_cases")}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'About',
  computed: {
    ...mapGetters([
      'statObj',
    ]),
    formattedStatObj() {
      const obj = Object.assign({}, this.statObj);
      Object.keys(obj).forEach((key) => {
        obj[key] = obj[key].toLocaleString();
      });
      return obj;
    },
  },
  methods: {
    ...mapActions([
      'fetchAuth',
    ]),
    logIn() {
      this.fetchAuth();
    },
  },
};
</script>

<style lang="scss">
  @import "about";
</style>
