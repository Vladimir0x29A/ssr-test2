<template>
  <div>
    <div class="g2a_widget_rating" data-widget-rating="a965167a-488c-4213-ac03-add936496552"></div>
  </div>
</template>

<script>
  export default {
    name: 'G2ARating',
    metaInfo: {
      script: [
        {
          vmid: 'g2a-rating',
          async: true,
          charset: 'utf-8',
          src: 'https://platform.g2a.com/rating.js',
        },
      ],
    },
  };
</script>
