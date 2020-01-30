<template>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'Callback',
    methods: {
      ...mapActions([
        'authCallback',
      ]),
    },
    created() {
      this.authCallback(this.$route.query)
        .then(() => {
          if (window && this.$route.query.redirect_back) {
            window.location.href = this.$route.query.redirect_back;
          } else {
            this.$router.push({ name: 'home' });
          }
        });
    }
  };
</script>
