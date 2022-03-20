<template lang="">
  <div>
    <div v-if="posts.length" class="ver-gap5-grid">
      <div v-for="(post, index) in posts" :key="post.id">
        <BoardPost :post="post" @delete="deleteProceed(post)" />
      </div>
    </div>

    <div class="text-center" v-else>
      <h3>아직 글이 없어요</h3>
    </div>

    <Dialog ref="dialog" @answeredYes="deletePost" @answeredNo="hideDialog">
      <template #message>
        <h2>
        해당 게시물을 삭제하시겠습니까?
        </h2>
      </template>
    </Dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      deletingPostId: null
    }
  },
  props: ['posts'],
  methods: {
    deleteProceed(post){
      this.$refs.dialog.show()
      this.deletingPostId = post.id
    },
    hideDialog() {
      this.$refs.dialog.hide()
    },
    async deletePost() {
      await this.$axios
        .$delete(`/boards/${this.deletingPostId}`)
        .then((res) => {
          this.$refs.dialog.hide()
          this.posts.splice(this.posts.findIndex((post => post.id == this.deletingPostId)), 1)
          alert('삭제됐습니다')
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
<style lang=""></style>
