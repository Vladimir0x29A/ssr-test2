<template>
  <transition name="anim-overlay">
    <div class="modal-overlay" v-if="this.shownModal.isShown">
      <div class="modal-overlay__close-space" @click="hide"></div>

      <ModalNotification class="modal-overlay__content" v-if="isNotification" :notif-data="notifData" @hideModal="hideModal" @confirm="confirm"/>

      <div class="modal-overlay__content modal-overlay__content--image" v-else-if="isImage">
        <img class="modal-overlay__image"
             :src="require(`@/assets/images${image}`)"
             :alt="image.replace(/\/.+\/(.+)\.png/, '$1')">
        <button class="modal-overlay__close" @click="hideModal"></button>
      </div>

      <div class="modal-overlay__content modal" v-else>
        <ModalContact v-if="modal === 'ModalContact'"/>
        <ModalWinAccept v-if="modal === 'ModalWinAccept'" @inner-notif="showInnerNotif"/>
        <ModalWinAcceptKey v-if="modal === 'ModalWinAcceptKey'"/>
        <ModalRefWithdraw v-if="modal === 'ModalRefWithdraw'"/>

        <button class="modal-overlay__close" @click="hideModal"></button>

        <transition name="anim-overlay">
          <div class="modal-overlay__inner-notification" v-if="isInnerNotif">
            <div class="modal-overlay__close-space" @click="hide"></div>
            <ModalNotification class="modal-overlay__content" :notif-data="notifData" @hideModal="hide" @confirm="confirm"/>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { eventBus, hideModal } from '@/logics';
import ModalContact from './ModalContact/ModalContact';
import ModalWinAccept from './ModalWinAccept/ModalWinAccept';
import ModalWinAcceptKey from './ModalWinAcceptKey/ModalWinAcceptKey';
import ModalRefWithdraw from './ModalRefWithdraw/ModalRefWithdraw';
import ModalNotification from './ModalNotification';

export default {
  name: 'Modal',
  components: {
    ModalNotification,
    ModalWinAccept,
    ModalWinAcceptKey,
    ModalRefWithdraw,
    ModalContact,
  },
  data: () => ({
    isNotification: false,
    isImage: false,
    notifData: {
      confirmCallBack: null,
      value: 0,
      message: '',
    },
    image: '',
    modal: null,
    isInnerNotif: false,
  }),
  computed: {
    ...mapState([
      'shownModal',
    ]),
    parsedHtml() {
      const div = document.createElement('div');
      div.innerHTML = this.notifData.message;
      return div.childNodes;
    },
  },
  watch: {
    '$route.path'() {
      eventBus.$emit('hideModal');
    },
  },
  methods: {
    ...mapMutations([
      'setModal',
    ]),
    hideModal,
    confirm() {
      this.notifData.confirmCallBack();
      this.hide();
    },
    keyPressHandler({keyCode}) {
      if (keyCode === 27) {   // 27 = escape
        this.hide();
      }
    },
    hide() {
      if (!this.isInnerNotif) {
        this.hideModal();
      } else {
        this.isInnerNotif = false;
        this.notifData = {
          confirmCallBack: null,
          value: 0,
          message: '',
        };
      }
    },
    showInnerNotif(notifData) {
      this.notifData.confirmCallBack = notifData.confirmCallBack;
      this.notifData.value = notifData.value || 0;
      this.notifData.message = notifData.message || '';
      this.isInnerNotif = true;
    },
  },
  mounted() {
    eventBus.$on('showModal', (modalName, payload) => {
      this.setModal(true);
      if (modalName === 'notification') {
        this.isNotification = true;
        this.notifData.confirmCallBack = payload.confirmCallBack;
        this.notifData.value = payload.value || 0;
        this.notifData.message = payload.message || '';
      } else if (modalName === 'image') {
        this.image = payload.image || '';
        this.isImage = true;
      } else {
        this.modal = modalName;
      }
      document.addEventListener('keydown', this.keyPressHandler);
    });
    eventBus.$on('hideModal', () => {
      this.modal = null;
      this.image = '';
      this.isImage = false;
      this.isNotification = false;
      this.notifData = {
        confirmCallBack: null,
        value: 0,
        message: '',
      };
      this.setModal(false);
      document.removeEventListener('keydown', this.keyPressHandler);
    });
  },
};
</script>

<style lang="scss">
    @import "modals";
</style>
