<template>
  <div class="top-up-promo-code">
    <h4 class="top-up-promo-code__stream-el top-up-promo-code__header">{{$t('popups.refill_promo')}}</h4>

    <div class="top-up-promo-code__stream-el input-and-button input-and-button--big input-and-button--restructizable" v-if="!isActivated">
      <input class="input-and-button__input input-and-button__input--nobg input-and-button__input--big-normal input-and-button__input--restructizable"
             type="text"
             :placeholder="$t('popups.refill_enter_code')"
             v-model="promocode"
      >
      <button class="input-and-button__button input-and-button__button--big input-and-button__button--restructizable" @click="use">{{$t('popups.refill_push')}}</button>
    </div>

    <div class="top-up-promo-code__stream-el top-up-promo-code__info" v-else>
      <div>{{$t('popups.refill_promo_activated')}}</div>
      <div v-if="type === 'money'">Your balance is replenished by <span class="top-up-promo-code__info-span">${{responseData}}</span></div>
      <div v-else-if="type === 'percent'">{{$t('popups.refill_promo_activated_desc', {percent: responseData})}}</div>
      <div v-else-if="type === 'case'">Now you can freely open the case with ID {{responseData}}</div>
      <div v-else-if="type === 'partner'">Brought a man, get <span class="top-up-promo-code__info-span">{{responseData}}</span> on your balance!</div>
    </div>

    <div class="top-up-promo-code__stream-el top-up-promo-code__description">{{$t('popups.refill_promo_desc')}}</div>
    <div class="top-up-promo-code__stream-el-2 top-up-promo-code__error" v-if="responseData">{{responseData}}</div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { showModal } from '@/logics';

  export default {
    name: 'PromoCode',
    data: () => ({
      isActivated: false,
      promocode: '',
      type: '',
      responseData: '',
      timer: null,
    }),
    watch: {
      responseData(val) {
        clearTimeout(this.timer);
        if (val) {
          this.timer = setTimeout(() => {
            this.responseData = '';
          }, 3000);
        }
      },
    },
    methods: {
      ...mapActions([
        'fetchPromocode',
      ]),
      use() {
        if (this.promocode) {
          this.fetchPromocode(this.promocode)
            .then(response => {
              if (response.status === 'success') {
                this.type = response.data.type;
                if (response.data.type === 'money') {
                  this.responseData = response.data.amount;
                } else if (response.data.type === 'percent') {
                  this.responseData = response.data.percent;
                } else if (response.data.type === 'case') {
                  this.responseData = response.data.case_id;
                }
                this.isActivated = true;
              } else if (response.status === 'error') {
                this.responseData = response.error;
              }
            })
            .catch(error => {
              this.responseData = error;
            });
        }
      },
    },
  };
</script>

<style lang="scss">
  @import "promo-code";
</style>
