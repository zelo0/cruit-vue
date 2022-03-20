<template lang="">
  <div>
    <div v-for="(item, index) in items" :key="index">
      <BoardPost :post="post"></BoardPost>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      posts: [],
    }
  },
  async fetch() {
    await this.$axios
      .$get(
        `/projects/${this.$route.params.id}/boards/${this.$route.params.bid}`
      )
      .then((res) => {
        this.posts = res.data.posts
      })
      .catch((err) => {
        consoel.log(err)
      })
  },
}
</script>
<style lang=""></style>
