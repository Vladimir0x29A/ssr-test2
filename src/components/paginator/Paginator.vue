<template>
    <div class="paginator">
        <transition-group tag="div" name="paginator" class="paginator__container paginator__container--desktop">
            <button class="paginator__item paginator__arrows paginator__arrows--prev" @click="loadPrev" :disabled="!currentPage" key="prev"></button>

            <button class="paginator__item paginator__button paginator__number"
                    v-if="isFirstShown"
                    v-for="item in pagesBefore"
                    @click="loadPage(item)"
                    :key="item"
            >
                <span class="paginator__number-span">{{item + 1}}</span>
            </button>

            <button class="paginator__item paginator__button" disabled v-if="isFirstShown" key="dots1">…</button>

            <button class="paginator__item paginator__button paginator__number"
                    :class="{'paginator__number--active': item === currentPage}"
                    v-for="item in between"
                    :disabled="item === currentPage"
                    @click="loadPage(item)"
                    :key="item"
            >
                <span class="paginator__number-span">{{item + 1}}</span>
            </button>

            <button class="paginator__item paginator__button" disabled v-if="isLastShown" key="dots2">…</button>

            <button class="paginator__item paginator__button paginator__number"
                    v-if="isLastShown"
                    v-for="item in pagesAfter"
                    @click="loadPage(item)"
                    :key="item"
            >
                <span class="paginator__number-span">{{item + 1}}</span>
            </button>

            <button class="paginator__item paginator__arrows" @click="loadNext" :disabled="currentPage >= total - 1" key="next"></button>
        </transition-group>

        <div class="paginator__container paginator__container--mobile" v-if="total > 3">
            <button class="paginator__item paginator__arrows paginator__arrows--prev" @click="loadPrev" :disabled="!currentPage"></button>
            <button class="paginator__item paginator__button paginator__number" @click="loadPage(0)" v-if="currentPage">
                <span class="paginator__number-span">1</span>
            </button>
            <button class="paginator__item paginator__button" disabled v-if="currentPage && currentPage !== 1">…</button>
            <button class="paginator__item paginator__button paginator__number paginator__number--active" @click="loadPage(currentPage)" disabled>
                <span class="paginator__number-span">{{currentPage + 1}}</span>
            </button>
            <button class="paginator__item paginator__button" disabled v-if="currentPage !== total - 1 && currentPage !== total - 2">…</button>
            <button class="paginator__item paginator__button paginator__number" @click="loadPage(total - 1)" v-if="currentPage !== total - 1">
                <span class="paginator__number-span">{{total}}</span>
            </button>
            <button class="paginator__item paginator__arrows" @click="loadNext" :disabled="currentPage >= total - 1"></button>
        </div>

        <div class="paginator__container paginator__container--mobile" v-else>
            <button class="paginator__item paginator__arrows paginator__arrows--prev" @click="loadPrev" :disabled="!currentPage"></button>
            <button class="paginator__item paginator__button paginator__number"
                    :class="{'paginator__number--active': item === currentPage + 1}"
                    v-for="item in total"
                    :disabled="item === currentPage + 1"
                    @click="loadPage(item - 1)"
                    :key="item - 1"
            >
                <span class="paginator__number-span">{{item}}</span>
            </button>
            <button class="paginator__item paginator__arrows" @click="loadNext" :disabled="currentPage >= total - 1"></button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Paginator',
  props: {
    total: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    pageRange: 3,
    threshold: 8,
    itemsOnTheEdge: 2,
  }),
  computed: {
    isTotalBiggerThanMax() {
      return this.total > (this.pageRange + this.itemsOnTheEdge) * 2 + 3;
    },
    isFirstShown() {
      if (this.isTotalBiggerThanMax) {
        return this.currentPage >= this.threshold - 1;
      }
      return false;
    },
    isLastShown() {
      if (this.isTotalBiggerThanMax) {
        return this.currentPage < this.total - this.threshold + 1;
      }
      return false;
    },
    pagesBefore() {
      const pages = [];
      for (let i = 0; i < this.itemsOnTheEdge % this.total; i++) {
        pages.push(i);
      }
      return pages;
    },
    pagesAfter() {
      const pages = [];
      for (let i = this.total - this.itemsOnTheEdge; i < this.total; i++) {
        pages.push(i);
      }
      return pages;
    },
    rangeStart() {
      const range = this.currentPage - this.pageRange;
      return range > 0 ? range : 0;
    },
    rangeEnd() {
      const range = this.currentPage + this.pageRange;
      const last = this.total - 1;
      return range < last ? range : last;
    },
    between() {
      const between = [];
      if (!this.isTotalBiggerThanMax) {
        for (let i = 0; i < this.total; i++) {
          between.push(i);
        }
      } else if (!this.isFirstShown) {
        for (let i = 0; i < this.threshold; i++) {
          between.push(i);
        }
      } else if (!this.isLastShown) {
        for (let i = this.total - this.threshold; i < this.total; i++) {
          between.push(i);
        }
      } else {
        for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
          between.push(i);
        }
      }
      return between;
    },
  },
  methods: {
    loadPage(page) {
      this.$emit('page', page);
    },
    loadNext() {
      this.$emit('page', this.currentPage + 1);
    },
    loadPrev() {
      this.$emit('page', this.currentPage - 1);
    },
  },
};
</script>

<style lang="scss">
    @import "paginator";
</style>
