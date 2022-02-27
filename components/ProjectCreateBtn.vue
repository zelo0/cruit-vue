<template lang="">
  <div class="my-2 text-right">
    <button @click="onclick" class="myBtn inline-block">프로젝트 생성</button>
  </div>
</template>
<script>
export default {
  methods: {
    onclick() {
      this.$router.push('/project-create')
    },
  },
}
</script>
<style lang=""></style>
