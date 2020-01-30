<template>
    <div>
      <div class="modal__title modal__title--red">{{$t('popups.accept_header')}}</div>
      <div class="modal__centered modal__separator modal__stream-el">
        <Skin class="modal__skin-big modal__stream-el" :skin="this.skinToSwapGetter.skin_data" isPrice isBig/>
        <button class="modal__button button button--modal button--blue button--color-dark" @click="reserve">
          <span class="button__label">{{$t('popups.accept_reserve')}}</span>
        </button>
      </div>

      <div class="modal__title">{{$t('popups.accept_or_swap')}}</div>
      <div class="tab-block">
        <div class="columner-modal-tabs" :style="columnsStyle">

          <button class="columner-modal-tabs__item tab-block__tab"
                  :class="{'tab-block__tab--active': tabName === currentTab}"
                  @click="changeTab(tabName)"
                  v-for="tabName in this.acceptMethodsGetter"
          >
            <img class="tab-block__img" :src="require(`@/assets/images/icons/${tabs[tabName].image}`)" alt="">
            <span class="tab-block__label">{{tabs[tabName].label}}</span>
          </button>
        </div>

        <div class="tab-block__content tab-block-content" v-if="(currentTab === 'swap' || currentTab === 'swap_to_game') && message">
          <div class="tab-block-content__label tab-block-content__label--red">{{message}}</div>
          <!--<a target="_blank" href="/faq#withdrawal_question_5">Why?</a>-->
        </div>

        <div class="tab-block__content tab-block-content" v-else-if="currentTab === 'swap' || currentTab === 'swap_to_game'">
          <div class="tab-block-content__label">{{$t('popups.accept_choose_and_swap')}}:</div>
          <div class="tab-block-content__label tab-block-content__label--red">{{$t('popups.skin_exchange')}}</div>
          <SwapSlider class="tab-block-content__stream-el" :items="swapVariants" v-if="swapVariants.length" :key="currentTab"/>
          <button class="modal__button button button--modal button--green-dark-dis button--color-dark tab-block-content__stream-el" :disabled="this.selectedSkinToSwapGetter === null" @click="swap">
            <span class="button__label">{{$t('popups.accept_swap_and_accept')}}</span>
          </button>
        </div>

        <div class="tab-block__content" v-else-if="currentTab === 'withdraw_to_opskins'">
          <template v-if="!messageOpskins">
            <div class="tab-block-content__label tab-block-content__label--red">{{$t('popups.accept_opskinspoints_notify')}}</div>

            <button class="modal__button button button--modal button--green button--color-dark tab-block-content__stream-el" @click="sellThrouhgOpskins">
              <span class="button__label">Get ${{this.skinToSwapGetter.skin_data.price}} at opskins</span>
            </button>
          </template>

          <div class="tab-block-content__label tab-block-content__label--red" v-else>{{messageOpskins}}</div>
        </div>

        <div class="tab-block__content" v-else-if="currentTab === 'withdraw_to_crypto'">
          <template v-if="!messageCrypto">
            <div class="tab-block-content__label">{{$t('popups.accept_swap_bitcoin_notification')}}</div>

            <div class="buttoned-input tab-block-content__stream-el">
              <input class="input" type="text" :placeholder="$t('popups.withdraw_crypto_wallet_field_auto')" v-model="wallet">
              <SelectorImaged :options="currencies" v-model="selectedCurrency"/>
            </div>

            <button class="modal__button button button--modal button--gold-bright button--color-dark tab-block-content__stream-el" @click="withdrawCrypto">
              <span class="button__label">Withdraw</span>
            </button>

            <div class="tab-block-content__label tab-block-content__label--bold-italic tab-block-content__stream-el">{{$t('popups.accept_swap_bitcoin_up3days')}}</div>
          </template>

          <div class="tab-block-content__label tab-block-content__label--red" v-else>{{messageCrypto}}</div>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex';
  import { hideModal } from '@/logics';
  import Skin from '../../skin/Skin';
  import SelectorImaged from '../../selectorImaged/SelectorImaged';
  import SwapSlider from '../../swapSlider/SwapSlider';

  export default {
    name: 'ModalWinAccept',
    components: {
      SwapSlider,
      SelectorImaged,
      Skin,
    },
    data: () => ({
      currentTab: '',
      tabs: {
        swap: {
          image: 'swap-csgo.png',
          label: 'Swap item',
        },
        withdraw_to_opskins: {
          image: 'swap-opskins.png',
          label: 'Opskins',
        },
        withdraw_to_crypto: {
          image: 'swap-crypto.png',
          label: 'Crypto',
        },
        swap_to_game: {
          image: 'swap-game.png',
          label: 'Game',
        },
      },
      currencies: [
        {
          img: 'crypto-bitcoin',
          option: 'btc',
        },
        {
          img: 'crypto-bitcoin-cash',
          option: 'bth',
        },
        {
          img: 'crypto-ethereum',
          option: 'eth',
        },
        {
          img: 'crypto-litecoin',
          option: 'ltc',
        },
      ],
      selectedCurrency: '',
      skinId: 0,
      message: '',
      messageOpskins: '',
      messageCrypto: '',
      wallet: '',
    }),
    computed: {
      ...mapGetters([
        'acceptMethodsGetter',
        'skinToSwapGetter',
        'swapVariantsCSGOGetter',
        'swapVariantsGameGetter',
        'selectedSkinToSwapGetter',
      ]),
      columnsStyle() {
        return {
          'grid-template-columns': `repeat(${this.acceptMethodsGetter.length}, 1fr)`,
        };
      },
      swapVariants() {
        if (this.currentTab === 'swap') {
          return this.swapVariantsCSGOGetter.map(item => item.skin_data);
        }
        if (this.currentTab === 'swap_to_game') {
          return this.swapVariantsGameGetter.map(item => item.skin_data);
        }
      },
    },
    watch: {
      currentTab: {
        handler(val) {
          this.message = '';
          if (val === 'swap' || val === 'swap_to_game') {
            this.fetchVariants();
          }
          /*else if (val === 'withdraw_to_opskins') {
            this.fetchOptskinsAccept(this.skinToSwapGetter.id)
              .then(response => {
                if (response.status === 'success') {
                  this.message = response.message;
                }
              });
          } else if (val === 'withdraw_to_crypto') {

          }*/
        },
        immediate: true,
      },
    },
    methods: {
      ...mapMutations([
        'updateAcceptMethods',
      ]),
      ...mapActions([
        'fetchReserveSkin',
        'fetchSwapVariants',
        'fetchSwapAndAccept',
        'fetchOptskinsAccept',
        'fetchCryptoAccept',
      ]),
      hideModal,
      changeTab(name) {
        this.currentTab = name;
      },
      reserve() {
        this.fetchReserveSkin(this.skinToSwapGetter.id);
      },
      swap() {
        if (this.selectedSkinToSwapGetter !== null) {
          const id = this.skinToSwapGetter.id;
          let item_id;
          if (this.currentTab === 'swap') {
            item_id = this.swapVariantsCSGOGetter[this.selectedSkinToSwapGetter].item_id;
          } else if (this.currentTab === 'swap_to_game') {
            item_id = this.swapVariantsGameGetter[this.selectedSkinToSwapGetter].item_id;
          }
          this.fetchSwapAndAccept({id, item_id})
            .then(data => {

              if (data.status === 'success') {
                // this.message = data.message;
                this.hideModal();
              } else if (data.status === 'error') {
                this.message = data.error;
              }
            })
            .catch(error => {

            });
        }
      },
      fetchVariants() {
        const obj = {
          swap: 'csgoitem',
          swap_to_game: 'game',
        };
        if (Object.keys(obj).some(item => item === this.currentTab)) {
          this.fetchSwapVariants({
            id: this.skinToSwapGetter.id,
            type: obj[this.currentTab],
          })
            .then(response => {
              if (response.status === 'error') {
                this.message = response.error;
              }
            })
            .catch(error => {
              this.message = error;
            });
        }
      },
      sellThrouhgOpskins() {
        this.fetchOptskinsAccept(this.skinToSwapGetter.id)
          .then(response => {
            if (response.status === 'success') {
              // this.messageOpskins = response.message;
              this.hideModal();
            } else if (response.status === 'error') {
              this.messageOpskins = response.error;
            }
          })
          .catch(error => {
            this.messageOpskins = error;
          });
      },
      withdrawCrypto() {
        this.fetchCryptoAccept({
          id: this.skinToSwapGetter.id,
          type: this.selectedCurrency,
          wallet: this.wallet,
        })
          .then(response => {
            if (response.status === 'success') {
              // this.messageCrypto = response.message;
              this.hideModal();
            } else if (response.status === 'error') {
              this.messageCrypto = response.error;
            }
          })
          .catch(error => {
            this.messageCrypto = error;
          });
      },
    },
    beforeDestroy() {
      this.updateAcceptMethods([]);
      this.message = '';
      this.messageOpskins = '';
    },
    mounted() {
      this.currentTab = this.acceptMethodsGetter[0];
    },
  };
</script>
