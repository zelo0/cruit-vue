<template lang="">
  <div class="flex justify-between my-5">
    <button
      @click="prevClicked"
      :disabled="!hasPrevious"
      class="float-left text-2xl"
      :class="{ grey: !hasPrevious, black: hasPrevious }"
    >
      <
    </button>
    <div class="flex gap-5">
      <button
        @click="pageClicked"
        class="text-lg p-1"
        v-for="(item, index) in pageNums"
        :key="index"
        :class="{ grey: item != pageIndicator, black: item == pageIndicator }"
      >
        {{ item }}
      </button>
    </div>
    <button
      @click="nextClicked"
      :disabled="!hasNext"
      class="float-right text-2xl"
      :class="{ grey: !hasNext, black: hasNext }"
    >
      >
    </button>
  </div>
</template>
<script>
export default {
  props: ['hasPrevious', 'hasNext', 'totalPage', 'currentPage'],
  computed: {
    firstPage() {
      return 5 * parseInt(this.currentPage / 5) + 1
    },
    pageNums() {
      return Array.from(new Array(5), (x, i) => i + this.firstPage).filter(
        (x, i) => x <= this.totalPage
      )
    },
    pageIndicator() {
      return this.currentPage + 1
    },
  },
  methods: {
    pageClicked(event) {
      this.$emit('onPageClick', parseInt(event.target.textContent) - 1)
    },
    prevClicked(event) {
      this.$emit('onPrevClick')
    },
    nextClicked(event) {
      this.$emit('onNextClick')
    },
  },
}
</script>
<style lang="css">
.grey {
  color: #d1d5db;
}
.black {
  color: black;
}
</style>
