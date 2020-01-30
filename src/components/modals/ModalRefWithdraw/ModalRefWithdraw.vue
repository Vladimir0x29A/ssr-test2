<template>
  <div>
    <div class="modal__title">{{$t('partner.withdraw_balance_header')}}</div>

    <div class="tab-block">
      <div class="columner-modal-tabs" :style="columnsStyle">

        <button class="columner-modal-tabs__item tab-block__tab"
                :class="{'tab-block__tab--active': tabName === currentTab}"
                @click="changeTab(tabName)"
                v-for="tabName in Object.keys(tabs)"
        >
          <img class="tab-block__img" :src="require(`@/assets/images/icons/${tabs[tabName].image}`)" alt="">
          <span class="tab-block__label">{{tabs[tabName].label}}</span>
        </button>
      </div>

      <div class="tab-block__content tab-block-content" v-if="message">
        <div class="tab-block-content__label tab-block-content__label--red">{{message}}</div>
      </div>

      <div class="tab-block__content" v-else-if="currentTab === 'balance'">
        <div class="tab-block__stream-el input-and-button input-and-button--dollar input-and-button--big">
          <input type="text" placeholder="0.0" v-model="withdrawAmount" class="input-and-button__input input-and-button__input--big input-and-button__input--bg2 input-and-button__input--sign">
          <button class="input-and-button__button input-and-button__button--big" @click="withdraw">{{$t("partner.withdraw_button")}}</button>
        </div>
      </div>

      <div class="tab-block__content" v-else-if="currentTab === 'crypto'">
        <div class="tab-block-content__label">{{$t('popups.accept_swap_bitcoin_notification')}}</div>

        <div class="input-and-button input-and-button--big buttoned-input tab-block-content__stream-el">
          <input class="input-and-button__input input-and-button__input--single input-and-button__input--big-normal input-and-button__input--bg2"
                 type="text"
                 :placeholder="$t('popups.withdraw_crypto_wallet_field_auto')"
                 v-model="wallet">
          <SelectorImaged :options="currencies" v-model="selectedCurrency"/>
        </div>

        <div class="tab-block__stream-el input-and-button input-and-button--dollar input-and-button--big tab-block-content__stream-el">
          <input type="text" placeholder="0.0" v-model="withdrawAmount" class="input-and-button__input input-and-button__input--big input-and-button__input--bg2 input-and-button__input--sign">
          <button class="input-and-button__button input-and-button__button--big" @click="withdrawCrypto">{{$t("partner.withdraw_button")}}</button>
        </div>

        <div class="tab-block-content__label tab-block-content__label--bold-italic tab-block-content__stream-el">{{$t('partner.partner_bitcoin_notif', {fee: '9%', limit: 400})}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  // import { hideModal } from '@/logics';
  import SelectorImaged from '../../selectorImaged/SelectorImaged';

  export default {
    name: 'ModalRefWithdraw',
    components: {
      SelectorImaged,
    },
    data() {
      return {
        currentTab: '',
        tabs: {
          balance: {
            image: 'knife.png',
            label: this.$t('partner.farmskins_balance'),
          },
          crypto: {
            image: 'swap-crypto.png',
            label: 'Cryptocurrency',
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
        wallet: '',
        withdrawAmount: '',
        message: '',
      };
    },
    computed: {
      columnsStyle() {
        return {
          'grid-template-columns': `repeat(${Object.keys(this.tabs).length}, 1fr)`,
        };
      },
    },
    watch: {
      currentTab() {
        this.message = '';
      },
    },
    methods: {
      ...mapActions([
        'fetchRefWithdrawCrypto',
        'fetchRefWithdrawBalance',
      ]),
      // hideModal,
      changeTab(name) {
        this.currentTab = name;
      },
      withdraw() {
        this.fetchRefWithdrawBalance({
          amount: this.withdrawAmount,
          method: 'balance',
        })
          .then(response => {
            if (response.status === 'success') {
              this.message = response.message;
              // this.hideModal();
            } else if (response.status === 'error') {
              this.message = response.error;
            }
          })
          .catch(error => {
            this.message = error;
          });
      },
      withdrawCrypto() {
        this.fetchRefWithdrawCrypto({
          amount: this.withdrawAmount,
          method: 'crypto',
          crypto: this.selectedCurrency,
          wallet: this.wallet,
        })
          .then(response => {
            if (response.status === 'success') {
              this.message = response.message;
              // this.hideModal();
            } else if (response.status === 'error') {
              this.message = response.error;
            }
          })
          .catch(error => {
            this.message = error;
          });
      },
    },
    mounted() {
      this.currentTab = Object.keys(this.tabs)[0];
    },
  };
</script>
