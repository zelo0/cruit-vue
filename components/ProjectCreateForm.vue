<template lang="">
  <div>
    <form class="ver-gap5-grid" @submit.prevent="onsubmit">
      <div class="font-extrabold text-xl">프로젝트 공고</div>
      <div>
        <label class="boldAndSpace" for="title">제목</label>
        <input class="w-full mt-2" type="text" id="title" v-model="name" />
      </div>
      <hr />

      <div>
        <label class="boldAndSpace" for="title">내용</label>
        <client-only placeholder="Loading....">
          <MarkEditor ref="editor" />
        </client-only>
      </div>
      <hr />

      <div class="my-2 text-right">
        <button class="myBtn inline-block">등록</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
    }
  },
  methods: {
    onsubmit() {
      const description = this.$refs.editor.getHtml()
      this.$axios
        .$post('/projects', { name: this.name, description })
        .then((res) => {
          const savedProjectId = res.data.projectId
          this.$router.push(`/projects/${savedProjectId}`)
        })
        .catch((err) => {
          console.log('에러 발생')
        })
    },
  },
}
</script>
<style lang=""></style>
