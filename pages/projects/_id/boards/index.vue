<template lang="">
  <div>
    <div class="ver-gap5-grid">
      <div class="flex justify-between">
        <h2>게시판</h2>
        <!-- 게시판 글 쓰기 버튼 -->
        <button class="myBtn inline-block" @click="movePage">글 쓰기</button>
      </div>

      <!-- 게시판 글 리스트 -->
      <BoardList :posts="posts" />
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
  methods: {
    movePage() {
      this.$router.push(this.$route.path + '/create')
    },
  },
  async fetch() {
    await this.$axios
      .$get(`/projects/${this.$route.params.id}/boards`)
      .then((res) => {
        this.posts = res.data.posts
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>
<style lang=""></style>
