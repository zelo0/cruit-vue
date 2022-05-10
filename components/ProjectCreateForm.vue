<template lang="">
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="ver-gap5-grid" @submit.prevent="handleSubmit(onSubmit)">
        <div class="font-extrabold text-xl">프로젝트 공고</div>
        <div>
          <label class="boldAndSpace" for="title">제목</label>
          <ValidationProvider rules="required" v-slot="{ errors }" name="제목">
            <div v-if="errors" class="text-left text-sm text-red-400">
              {{ errors[0] }}
            </div>
            <input class="w-full mt-2" type="text" id="title" v-model="name" />
          </ValidationProvider>
        </div>
        <hr />

        <div>
          <label class="boldAndSpace" for="title">내용</label>
          <client-only placeholder="Loading....">
            <MarkEditor
              ref="editor"
              placeholder="이 곳에 프로젝트 모집 글을 작성해주세요"
            />
          </client-only>
        </div>
        <hr />

        <div class="my-2 text-right">
          <button class="myBtn inline-block">등록</button>
        </div>
      </form>
    </ValidationObserver>
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
    async onSubmit() {
      const description = this.$refs.editor.getHtml()
      await this.$axios
        .$post('/projects', { name: this.name, description })
        .then((res) => {
          const savedProjectId = res.data.projectId
          this.$router.push(`/projects/${savedProjectId}`)
        })
        .catch((err) => {
          // console.log('에러 발생')
        })
    },
  },
}
</script>
<style lang=""></style>
