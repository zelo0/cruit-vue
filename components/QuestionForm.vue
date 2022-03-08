<template lang="">
  <div>
    <form @submit.prevent="onSubmit">
      <div class="text-right">
        <AutoResizingTextArea ref="textarea" />
        <button class="inline-block myBtn">등록</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  props: ['parentId'],
  methods: {
    async onSubmit() {
      if (this.parentId) {
        /* 프로젝트의 질문 */
        await this.$axios
          .$post('/questions', {
            projectId: this.$route.params.id,
            content: this.$refs.textarea.getContent(),
          })
          .then((res) => {
            this.$refs.textarea.clearContent()
            this.$emit('createdQuestion', res.data)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        /* 질문의 질문 */
        await this.$axios
          .$post('/questions/sub', {
            projectId: this.$route.params.id,
            parentId: this.parentId,
            content: this.$refs.textarea.getContent(),
          })
          .then((res) => {
            this.$refs.textarea.clearContent()
            this.$emit('createdQuestion', res.data)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
  },
}
</script>
<style lang=""></style>
