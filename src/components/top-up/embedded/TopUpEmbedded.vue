<template>
  <div class="case-topup block-style block-style--padding">
    <div class="input-and-button" v-if="paymentMethod === 0">
      <input class="input-and-button__input" type="text" placeholder="$0.00" v-model="amount"/>
      <button class="input-and-button__button input-and-button__button--plus" @click="refillG2A">+</button>
    </div>

    <div class="input-and-button" v-else-if="paymentMethod === 1">
      <button class="input-and-button__button input-and-button__button--full" @click="refillSkin2Pay">{{$t('popups.refill_add_funds')}}</button>
    </div>

    <div class="topup-columner">
      <button class="topup-columner__col topup-button"
              :class="{'topup-button--active': paymentMethod === 0}"
              @click="paymentMethod = 0">
        <img class="topup-button__img" src="@/assets/images/payments/g2a-pay.png" alt="">
      </button>

      <button class="topup-columner__col topup-button"
              :class="{'topup-button--active': paymentMethod === 1}"
              @click="paymentMethod = 1">
        <img class="topup-button__img" src="@/assets/images/payments/skin2pay.png" alt="">
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TopUpEmbedded',
    data: () => ({
      paymentMethod: 0,
      amount: '',
    }),
    watch: {
      amount(newVal, oldVal) {
        // Prevent input of non-digital data
        if (isNaN(+newVal)) this.amount = oldVal;
      },
    },
    methods: {
      refillG2A() {
        if (this.amount && !isNaN(+this.amount)) {
          this.$store.dispatch('pay', {
            payMethod: 'g2a',
            amount: +this.amount,
          }).then(({data}) => {
            location.href = data.redirect_url;
            // console.log(data);
          });
        }
      },
      refillSkin2Pay() {
        this.$router.push({path: '/pay/skin2pay'});
      },
    },
  };
</script>
