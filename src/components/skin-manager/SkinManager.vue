<template>
  <div class="skin-manager">
    <div class="skin-manager__price" v-if="isPrice">${{formatPrice(price)}}</div>

    <!-- STATE ACCEPTED -->
    <template v-if="state === 'accepted'">
      <div class="skin-manager__accepted skin-manager__label skin-manager__item" v-if="!acceptType">{{$t('user.accepted')}}</div>
      <div class="skin-manager__accepted skin-manager__label skin-manager__item" v-else-if="acceptType === 'withdraw_to_steam'">{{$t('user.accepted')}}</div>

      <div class="skin-manager__accepted skin-manager__label skin-manager__item" v-else-if="acceptType === 'withdraw_to_opskins'">
        {{$t('user.accepted')}}
        <span class="skin-manager-icon skin-manager-icon--opskins skin-manager-tooltip__hoverable">
          <img class="skin-manager-icon__icon" src="@/assets/images/icons/opskins.svg" alt="">
        </span>
        <div class="skin-manager-tooltip__tooltip">{{$t('user.exchanged_opskins')}}</div>
      </div>

      <button class="button button--green-dark-dis skin-manager__item skin-manager__button" :disabled="isPending === 'accept'" v-else-if="acceptType === 'withdraw_to_crypto'" @click="accept">
        <span class="button__label">{{$t('user.accepted')}}</span>
        <span class="skin-manager-icon skin-manager-tooltip__hoverable">
            <img class="skin-manager-icon__icon" src="@/assets/images/icons/btc.svg" alt="">
          </span>
        <div class="skin-manager-tooltip__tooltip">{{$t('user.exchanged_crypto')}}</div>
      </button>

      <button class="button button--green-dark-dis skin-manager__item skin-manager__button" :disabled="isPending === 'accept'" v-else-if="acceptType === 'getting_keys'" @click="accept">
        <span class="button__label">{{$t('user.show_key')}}</span>
      </button>

      <div class="skin-manager__accepted skin-manager__label skin-manager__item" v-else-if="acceptType === 'opened'">{{$t('user.opened')}}</div>
    </template>
    <!-- END OF STATE ACCEPTED -->

    <!-- STATE INPROGRESS -->
    <div class="skin-manager__accepted skin-manager__label skin-manager__item" v-else-if="state === 'inprogress'">{{$t('user.in_progress')}}</div>
    <!-- END OF STATE INPROGRESS -->


    <button class="button button--green-dark-dis skin-manager__item skin-manager__button" :disabled="isPending === 'accept'" v-if="state === 'new'" @click="accept">
      <span class="button__label">{{labelAcceptNew}}</span>
    </button>


    <div class="skin-manager__swapped skin-manager__label skin-manager__item" v-if="state === 'swapped'">{{$t('case.swapped')}}</div>

    <button class="button button--blue skin-manager__item skin-manager__button" :disabled="isPending === 'unreserve'" v-if="state === 'reserved'" @click="unreserve">
      <span class="button__label">{{$t('user.reserved')}}</span>
    </button>



    <button class="button button--gold-bright skin-manager__item skin-manager__button" v-if="!isPrice" @click="sellConfirm" :disabled="isPending === 'sell'">
      <span class="button__label">{{$t('user.sell_for') + ' $' + formatPrice(price)}}</span>
    </button>

    <div class="skin-manager__sold skin-manager__label skin-manager__item" v-if="state === 'sold'">{{$t('user.sold')}}</div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex';
  import { showModal, formatPrice } from '@/logics';

  export default {
    name: 'SkinManager',
    props: {
      price: {
        type: Number,
        default: 0,
      },
      type: {
        type: String,
        default: '',
      },
      acceptType: {
        type: String,
        default: '',
      },
      state: {
        type: String,
        default: '',
      },
      id: {
        type: Number,
        default: 0,
      },
    },
    data: () => ({
      isPending: '',
    }),
    computed: {
      ...mapGetters([
        'isFetchLockedGetter',
      ]),
      labelAcceptNew() {
        switch (this.type) {
          case 'game': return this.$t('user.accept');
          case 'case': return this.$t('user.open');
          case 'csgoitem': return this.$t('user.accept');
        }
      },
      isPrice() {
        return ['accepted', 'swapped', 'sold', 'inprogress'].includes(this.state);
      },
    },
    methods: {
      ...mapMutations([
        'updateAcceptMethods',
        'updateSkinToSwap',
        'setIsFetchLocked',
        'updateAcceptKey',
        'setUserDropWinId',
        'updateItem',
      ]),
      ...mapActions([
        'fetchUnreserveSkin',
        'fetchAcceptSkin',
        'fetchSellSkin',
      ]),
      showModal,
      formatPrice,
      unreserve() {
        if (!this.isFetchLockedGetter) {
          showModal('notification', {
            confirmCallBack: () => {
              this.lock('unreserve');
              this.fetchUnreserveSkin(this.id)
                .finally(this.unlock);
            },
            message: this.$t('user.unreserve_popup'),
          });
        }
      },
      accept() {
        if (!this.isFetchLockedGetter) {
          this.lock('accept');
          this.fetchAcceptSkin(this.id)
            .then(response => {
              if (response.data) {
                if (response.data.action === 'game_keys_popup') {
                  this.updateAcceptKey({
                    keys: response.data.keys,
                    platform: response.data.platform,
                  });
                  this.updateSkinToSwap(this.id);
                  showModal('ModalWinAcceptKey');
                } else if (response.data.action === 'redirect_to_case') {
                  this.setUserDropWinId(response.data.win_id);
                  this.$router.push({
                    path: `/${response.data.case_data.static_name}`,
                  });
                } else if (response.data.action === 'out_of_stock_popup') {
                  this.updateAcceptMethods(response.data.accept_methods);
                  this.updateSkinToSwap(this.id);
                  showModal('ModalWinAccept');
                }
              }
              if (response.message) {
                showModal('notification', {
                  message: response.message,
                });
              } else if (response.error) {
                showModal('notification', {
                  message: response.error,
                });
              }
            })
            .catch(error => {
              showModal('notification', {
                message: error,
              });
            })
            .finally(this.unlock);
        }
      },
      sellConfirm() {
        showModal('notification', {
          confirmCallBack: () => {
            this.sell();
          },
          value: this.formatPrice(this.price),
        });
      },
      sell() {
        if (!this.isFetchLockedGetter) {
          this.lock('sell');
          this.fetchSellSkin(this.id)
            .then(response => {
              if (response.status === 'error') {
                showModal('notification', {
                  message: response.error,
                });
              }
            })
            .catch(error => {
              showModal('notification', {
                message: error,
              });
            })
            .finally(() => {
              this.setIsFetchLocked(false);
            });
        }
      },
      lock(type) {
        this.setIsFetchLocked(true);
        this.isPending = type;
      },
      unlock() {
        this.setIsFetchLocked(false);
        this.isPending = '';
      },
    },
  };
</script>

<style lang="scss">
  @import "skin-manager";
</style>
