<template>
  <div>
    <h3 class="modal__title">{{$t('popups.support_header')}}</h3>
    <div class="modal__text-block">
      <div class="modal__paragraph">{{$t('popups.support_content')}}</div>
      <div class="modal__paragraph">{{$t('popups.support_content_2')}}</div>
    </div>
    <div class="modal__text-block">
      <div class="modal__paragraph">
        <a href="mailto:support@farmskins.com" title="support@farmskins.com">support@farmskins.com</a>
      </div>
    </div>
    <div></div>
    <div class="modal__text-block">
      <div class="modal__paragraph">WiseAvant OÜ</div>
      <div class="modal__paragraph">Registration info:</div>
      <div class="modal__paragraph">Reg.number: 14777399</div>
      <div class="modal__paragraph">Address: Pikk tn 7-5 Kesklinna linnaosa, Tallinn Harju maakond 10123</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalContact',
};
</script>
