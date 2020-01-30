<template>
  <div class="notification">
    <h4 class="notification__message" v-if="notifData.message">
      <template v-for="el in parsedHtml">
        <template v-if="el.nodeName === '#text'">{{el.textContent}}</template>
        <router-link v-else-if="el.nodeName === 'A'" :to="el.getAttribute('href')">{{el.textContent}}</router-link>
      </template>
    </h4>
    <h4 class="notification__message" v-else>{{$t('user.sell_for')}} ${{notifData.value}}?</h4>

    <div class="notification__buttons notification-buttons">
      <template v-if="notifData.confirmCallBack">
        <button class="notification-buttons__el button button--default button--notif" @click="$emit('confirm')">
          <span class="button__label">{{$t('general.yes')}}</span>
        </button>
        <button class="notification-buttons__el button button--default button--notif" @click="$emit('hideModal')">
          <span class="button__label">{{$t('general.cancel')}}</span>
        </button>
      </template>

      <button class="notification-buttons__el button button--default button--notif" @click="$emit('hideModal')" v-else>
        <span class="button__label">OK</span>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ModalNotification',
    props: {
      notifData: {
        type: Object,
        default: () => ({}),
      }
    },
    computed: {
      parsedHtml() {
        const div = document.createElement('div');
        div.innerHTML = this.notifData.message;
        return div.childNodes;
      },
    },
  };
</script>
