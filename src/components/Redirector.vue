<template>
  <Case v-if="cs"/>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex';
  import { eventBus } from '@/logics';
  import Case from '@/views/case/Case';

  export default {
    name: 'Redirector',
    components: {
      Case,
    },
    computed: {
      ...mapGetters([
        'caseLinksGetter',
      ]),
      cs() {
        return this.caseLinksGetter.length && this.caseLinksGetter.some(item => item.static_name === this.$route.path.slice(1));
      },
    },
    methods: {
      ...mapMutations([
        'updateErrorPageStatus',
      ]),
      ...mapActions([
        'fetchCasesLinks',
      ]),
    },
    serverPrefetch() {
      return this.fetchCasesLinks()
    },
    mounted() {
      this.fetchCasesLinks()
        .finally(() => {
          this.$watch('cs', val => {
            if (val === false) {
              this.updateErrorPageStatus(true);
            }
          }, {immediate: true});
        });
    },
  };
</script>
