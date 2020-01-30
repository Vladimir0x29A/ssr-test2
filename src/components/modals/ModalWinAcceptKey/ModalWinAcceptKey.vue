<template>
    <div>
      <div class="modal__title modal__title--red">{{this.skinToSwapGetter.market_hash_name}}</div>
      <div class="modal__centered modal__stream-el">
        <Skin class="modal__skin-big" :skin="this.skinToSwapGetter.skin_data" isPrice isBig/>
      </div>

      <div class="modal-key">
        <div class="modal-key__header">{{acceptKeyGetter.keys}}</div>

        <div class="modal-key__content modal-key-content">
          <div class="modal-key-content__title">{{$t(`popups.accept_${currentPlatform.translation}_instructions`)}}</div>

          <ul class="modal-key-content__list">
            <li class="modal-key-content__list-item" v-for="listItem in currentPlatform.listItems">
              <span class="modal-key-content__list-span">{{$t(`popups.accept_${currentPlatform.translation}_instructions_${listItem}`)}}</span>
            </li>
          </ul>

          <div class="modal-key-content__note">{{$t('popups.accept_gamekeys_notif')}}</div>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Skin from '../../skin/Skin';

  export default {
    name: 'ModalWinAccept',
    components: {
      Skin,
    },
    data: () => ({
      instuctions: [
        {
          type: 'Steam',
          translation: 'steam',
          listItems: 4,
        },
        {
          type: 'Origin',
          translation: 'origin',
          listItems: 6,
        },
        {
          type: 'Uplay',
          translation: 'uplay',
          listItems: 4,
        },
        {
          type: 'Rockstar',
          translation: 'rockstar',
          listItems: 4,
        },
        {
          type: 'GOG',
          translation: 'gog',
          listItems: 2,
        },
      ],
    }),
    computed: {
      ...mapGetters([
        'skinToSwapGetter',
        'acceptKeyGetter',
      ]),
      currentPlatform() {
        return this.instuctions.find(item => item.type === this.acceptKeyGetter.platform);
      },
    },
  };
</script>
