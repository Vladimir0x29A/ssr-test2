<template>
  <div class="top-up-alipay-response">
    <div class="top-up-alipay-response__sum">
      {{$t('popups.refill_alipay_amount')}} <span class="top-up-alipay-response__span">¥{{response.real_price}}!</span>
    </div>
    <div class="top-up-qr">
      <img class="top-up-qr__code" :src="response.qrcode" alt="qr-code">
      <div class="top-up-qr__description">
        <div class="top-up-qr__paragraph">{{$t('popups.refill_alipay_instructions_1')}}</div>
        <div class="top-up-qr__paragraph">{{$t('popups.refill_alipay_instructions_2')}}</div>
        <div class="top-up-qr__paragraph">{{$t('popups.refill_alipay_instructions_3')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AlipayResponse',
    props: {
      response: {
        type: Object,
        default: () => ({
          qrcode: null,
          pay_url: null,
          real_price: null,
        }),
      },
    },
  };
</script>

<style lang="scss">
  @import "alipay-response";
</style>
