<template>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'CallbackLogout',
    data: () => ({

    }),
    methods: {
      ...mapActions([
        'fetchLogout',
      ]),
    },
    created() {

        this.fetchLogout()
            .then(() => {
                this.$router.go(-1);
            });
    }
  };
</script>
