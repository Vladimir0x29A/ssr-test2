export default {
  install(Vue) {
    Vue.prototype.$setMeta = function (page, param) {
      const nameParam = param && param.nameParam;
      const nameValue = param && param.nameValue;

      const metaObj = {
        title: this.$t(`meta.${page}_title`, {[nameParam]: nameValue}),
        meta: [
          {
            vmid: 'og:title',
            property: 'og:title',
            content: this.$t(`meta.${page}_ogtitle`, {[nameParam]: nameValue}),
          },
          {
            vmid: 'og:description',
            property: 'og:description',
            content: this.$t(`meta.${page}_description`, {[nameParam]: nameValue}),
          },
          {
            vmid: 'description',
            name: 'description',
            content: this.$t(`meta.${page}_description`, {[nameParam]: nameValue}),
          },
          {
            vmid: 'og:image',
            property: 'og:image',
            content: (param && param.snippet_image) || require('@/assets/images/snippets/main.png'),
          },
        ],
      };

      return metaObj;
    }
  }
};
