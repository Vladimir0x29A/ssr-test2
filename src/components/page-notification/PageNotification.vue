<template>
  <div class="page-notification wrapper-main" v-if="shownNotifications.length">
     <div class="wrapper-main__content" :class="{'wrapper-main__content--wide': visibility === 'all'}">

       <div class="page-notification__block"
            :class="[blockColor(notification.type), {'wrapper-main__content--pads': notification.type === 'alert'}]"
            v-for="notification in shownNotifications"
       >
         <div>
           <template v-for="(text, idx) in splitText(notification.text)">
             <template v-if="text === 'link'">
               <a :href="notification.params[0].link.url" v-if="isOuterLink(notification.params[0].link.url)">{{notification.params[0].link.text}}</a>
               <router-link :to="notification.params[0].link.url" v-else>{{notification.params[0].link.text}}</router-link>
             </template>
             <template v-else>{{text}}</template>
           </template>
         </div>

         <button class="page-notification__button button button--default button--add-funds"
                 @click="hideNotification(notification.id)"
                 v-if="notification.type === 'alert'"
         >
           <span class="button__label">OK</span>
         </button>

         <button class="page-notification__cross" @click="hideNotification(notification.id)" v-else></button>
       </div>

     </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
// import VueCookies from 'vue-cookies';

let VueCookies = '';
if(typeof window !== 'undefined') {
    VueCookies = require('vue-cookies');
}

export default {
  name: 'PageNotification',
  data: () => ({
    hiddenNotifications: [],
  }),
  props: {
    visibility: {
      type: String,
      default: 'all',
    }
  },
  computed: {
    ...mapState([
      'pageNotifications',
    ]),
    shownNotifications() {
      return this.pageNotifications.filter(item => !this.hiddenNotifications.includes(item.id) && item.visibility === this.visibility);
    },
  },
  /*watch: {
    '$route.path'() {
      this.updatePageNotifications([]);
      this.fetchPageNotifications();
    },
  },*/
  methods: {
    ...mapMutations([
      'updatePageNotifications',
    ]),
    ...mapActions([
      'fetchPageNotifications',
    ]),
    splitText(text) {
      return text.split(/:(\w+)((?=\s)|$)/).filter(item => item);
    },
    isOuterLink(url) {
      return url.match(/(^\/\/)|(^http(s)?:\/\/)/);
    },
    hideNotification(id) {
      if (!this.hiddenNotifications.includes(id)) {
        this.hiddenNotifications.push(id);
        if(typeof window !== 'undefined') {
            VueCookies.set('hidden_page_notifications', JSON.stringify(this.hiddenNotifications));
        }
        // console.log('hidden_page_notifications stringified', JSON.stringify(this.hiddenNotifications));
      }
    },
    initHiddenNotifications() {
      if(typeof window !== 'undefined') {
          const hiddenNotifications = VueCookies.get('hidden_page_notifications');
          // console.log('hidden_page_notifications', hiddenNotifications);

          if (hiddenNotifications !== null) {
            this.hiddenNotifications = JSON.parse(hiddenNotifications);
            // console.log('hidden_page_notifications parsed', JSON.parse(hiddenNotifications));
          }
      }
    },
    blockColor(type) {
      const base = 'page-notification__block--';
      switch (type) {
        case 'alert': return base + 'red';
        case 'notice': return base + 'blue';
      }
    },
  },
  created() {
    // VueCookies.remove('hidden_page_notifications');
    this.fetchPageNotifications();
    this.initHiddenNotifications();
  }
};
</script>

<style lang="scss">
  @import "page-notification";
</style>
