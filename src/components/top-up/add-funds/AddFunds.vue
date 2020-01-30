<template>
  <div class="top-up-add block-style block-style--2">
    <div class="top-up-add__el top-up-ali-login" v-if="isAlipay">
      <input class="top-up-ali-login__input" type="text" :placeholder="$t('popups.refill_alipay_login')" v-model="account">
      <input class="top-up-ali-login__input" type="text" :placeholder="$t('popups.refill_alipay_phone')" v-model="mobile">
    </div>

    <div class="top-up-add__el input-and-button input-and-button--dollar input-and-button--big">
      <input class="input-and-button__input input-and-button__input--big input-and-button__input--bg2 input-and-button__input--sign" type="text" placeholder="0.00" v-model="amount">
      <button class="input-and-button__button input-and-button__button--big" @click="emitPayment">{{$t('popups.refill_add_funds')}}</button>
    </div>

    <div class="top-up-preset top-up-add__el">
      <a href="#" class="top-up-preset__item" v-for="item in setAmountList" @click.prevent="amount = item">${{item}}</a>
    </div>

    <div class="top-up-add__description top-up-add__el">{{$t('popups.refill_may_delay')}}</div>

    <Bonus class="top-up-add__el" :available="{'bonus': true, 'percent': true, 'freecase': true}" :amount="+amount"/>
  </div>
</template>

<script>
  import Bonus from '@/components/top-up/bonus/Bonus';

  export default {
    name: 'AddFunds',
    components: {
      Bonus,
    },
    props: {
      isAlipay: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({
      setAmountList: [5, 10, 50, 100, 200, 500],
      amount: null,
      account: null,
      mobile: null,
      request: {},
    }),
    methods: {
      emitPayment() {
        if (this.isAlipay) {
          if (this.account && this.mobile) {
            this.request.account = this.account;
            this.request.mobile = this.mobile;
            this.emitPayment2();
          }
        } else {
          this.emitPayment2();
        }
      },
      emitPayment2() {
        if (this.amount && !isNaN(+this.amount)) {
          this.request.amount = +this.amount;
          this.$emit('addFunds', this.request);
        }
      },
    },
    watch: {
      amount(newVal, oldVal) {
        // Prevent input of non-digital data
        if (isNaN(+newVal)) this.amount = oldVal;
      },
    },
  };
</script>

<style lang="scss">
  @import "add-funds";
</style>
