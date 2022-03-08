<template lang="">
  <div class="px-5 py-1 border-b-2 ver-gap1-grid" @click="onclick">
    <div>
      <h3>프로젝트명</h3>
      <p>{{ part.projectName }}</p>
    </div>

    <div>
      <h3>파트</h3>
      <p>{{ part.position }}</p>
    </div>

    <div>
      <h3>모집 공개 상태</h3>
      <p>{{ part.status }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['part'],
  methods: {
    onclick() {
      this.$emit('clicked', this.part)
    },
  },
}
</script>
<style lang=""></style>
