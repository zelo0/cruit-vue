<template lang="">
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="ver-gap5-grid" @submit.prevent="handleSubmit(onSubmit)">
        <div class="font-extrabold text-xl">게시판 글</div>
        <div>
          <label class="boldAndSpace" for="title">제목</label>
          <ValidationProvider rules="required" v-slot="{ errors }" name="제목">
            <div v-if="errors" class="text-left text-sm text-red-400">
              {{ errors[0] }}
            </div>
            <input class="w-full mt-2" type="text" id="title" v-model="title" />
          </ValidationProvider>
        </div>
        <hr />

        <div>
          <label class="boldAndSpace">내용</label>
          <client-only placeholder="Loading....">
            <MarkEditor
              ref="editor"
              placeholder="이 곳에 게시판 글을 작성해주'/auth/login'세요"
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
  middleware: 'authenticated',
  data() {
    return {
      title: '',
      content: '',
    }
  },
  methods: {
    async onSubmit() {
      const content = this.$refs.editor.getHtml()
      await this.$axios
        .$post('/boards', {
          projectId: this.$route.params.id,
          title: this.title,
          content,
        })
        .then((res) => {
          this.$router.back()
        })
        .catch((err) => {
          // console.log('에러 발생')
        })
    },
  },
}
</script>
<style lang=""></style>
