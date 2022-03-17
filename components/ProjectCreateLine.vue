<template lang="">
  <div class="my-2 flex items-center justify-between">
    <h2>어떤 프로젝트든 좋아요</h2>
    <button @click="onclick" class="myBtn inline-block">프로젝트 생성</button>
  </div>
</template>
<script>
export default {
  methods: {
    onclick() {
      this.$router.push('/projects/create')
    },
  },
}
</script>
<style lang=""></style>
