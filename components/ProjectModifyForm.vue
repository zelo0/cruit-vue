<template lang="">
  <div>
    <form class="ver-gap5-grid" @submit.prevent="onsubmit">
      <div class="font-extrabold text-xl">프로젝트 공고</div>
      <div>
        <label class="boldAndSpace" for="title">제목</label>
        <input
          class="w-full mt-2"
          type="text"
          id="title"
          v-model="project.name"
        />
      </div>
      <hr />

      <div>
        <label class="boldAndSpace" for="title">내용</label>
        <client-only placeholder="Loading....">
          <MarkEditor
            v-if="project.description"
            ref="editor"
            :initialValue="project.description"
          />
        </client-only>
      </div>
      <hr />

      <div class="my-2 text-right">
        <button class="myBtn inline-block">변경</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      project: {
        name: '',
        description: '',
      },
    }
  },
  methods: {
    async onsubmit() {
      const description = this.$refs.editor.getHtml()
      await this.$axios
        .$patch('/projects/text', {
          id: this.$route.params.id,
          name: this.project.name,
          description,
        })
        .then((res) => {
          const savedProjectId = res.data.projectId
          this.$router.replace(`/projects/${savedProjectId}`)
        })
        .catch((err) => {
          console.log('에러 발생')
        })
    },
  },
  async fetch() {
    await this.$axios
      .$get(`/projects/simple/${this.$route.params.id}`)
      .then((res) => {
        this.project = res.data
      })
      .catch((err) => {
        console.log('에러 발생')
      })
  },
}
</script>
<style lang=""></style>
