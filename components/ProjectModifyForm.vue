<template lang="">
  <div>
    <form class="ver-gap5-grid" @submit.prevent>
      <h1>프로젝트 공고</h1>

      <!-- 이름 변경 -->
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

      <!-- 설명 변경 -->
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

      <div class="my-2 text-right">
        <button class="myBtn inline-block" @click="changeContent">변경</button>
      </div>

      <hr />

      <!-- 상태 변경 -->
      <div class="ver-gap2-grid">
        <div class="boldAndSpace">상태</div>
        <label for="togleButton" class="cursor-pointer">
          <div class="flex gap-3 items-center">
            <span class="cursor-pointer"> 비공개 </span>

            <!-- toggle -->
            <div class="relative">
              <input
                id="togleButton"
                type="checkbox"
                class="hidden"
                @change="changeStatus"
                v-model="project.status"
                true-value="PUBLIC"
                false-value="PRIVATE"
              />
              <!-- path -->
              <div
                class="toggle-path bg-gray-200 w-9 h-5 rounded-full shadow-inner"
              ></div>
              <!-- crcle -->
              <div
                class="toggle-circle absolute w-3.5 h-3.5 bg-white rounded-full shadow inset-y-0 left-0 transition-all duration-300 ease-in-out"
              ></div>
            </div>

            <span class="cursor-pointer"> 공개 </span>
          </div>
        </label>
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
        status: 'PUBLIC',
      },
    }
  },
  methods: {
    async changeContent() {
      const description = this.$refs.editor.getHtml()
      await this.$axios
        .$patch('/projects/text', {
          id: this.$route.params.id,
          name: this.project.name,
          description,
        })
        .then((res) => {
          alert('변경됐습니다')
        })
        .catch((err) => {
          // console.log('에러 발생')
        })
    },
    async changeStatus() {
      await this.$axios
        .$patch('/projects/status', {
          id: this.$route.params.id,
          status: this.project.status,
        })
        .then((res) => {
          alert('변경됐습니다')
        })
        .catch((err) => {
          // console.log('에러')
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
        // console.log('에러 발생')
      })
  },
}
</script>
<style lang="css" scoped></style>
