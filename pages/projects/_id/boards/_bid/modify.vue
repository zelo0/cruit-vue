<template lang="">
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="ver-gap5-grid" @submit.prevent="handleSubmit(onsubmit)">
        <div class="font-extrabold text-xl">게시판 글 수정</div>
        <div>
          <label class="boldAndSpace" for="title">제목</label>
          <ValidationProvider rules="required" v-slot="{ errors }" name="제목">
            <div v-if="errors" class="text-left text-sm text-red-400">
              {{ errors[0] }}
            </div>
            <input
              class="w-full mt-2"
              type="text"
              id="title"
              v-model="post.title"
            />
          </ValidationProvider>
        </div>
        <hr />

        <div>
          <label class="boldAndSpace">내용</label>
          <client-only placeholder="Loading....">
            <!-- content 데이터를 얻고 나서 컴포넌트를 렌더링 해야 초기 값을 띄워줌 -->
            <MarkEditor
              ref="editor"
              v-if="post.content"
              :initialValue="post.content"
            />
          </client-only>
        </div>
        <hr />

        <div class="my-2 text-right">
          <button class="myBtn inline-block">변경</button>
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
      post: {
        title: '',
        content: '',
      },
    }
  },
  methods: {
    async onsubmit() {
      const content = this.$refs.editor.getHtml()
      await this.$axios
        .$patch(`/boards/${this.$route.params.bid}`, {
          title: this.post.title,
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
  async fetch() {
    await this.$axios
      .$get(`/boards/${this.$route.params.bid}`)
      .then((res) => {
        this.post = res.data
      })
      .catch((err) => {
        // console.log(err)
      })
  },
}
</script>
<style lang=""></style>
