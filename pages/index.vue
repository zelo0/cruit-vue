<template>
  <div>
    <div class="container">
      <MenuBar />
      <ProjectCreateLine />
      <ProjectSearchFilter />
      <span ref="anchor"></span>
      <ProjectList />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'IndexPage',
  computed: {
    ...mapState({
      currentPage: (state) => state.projects.currentPage,
    }),
  },
  watch: {
    // 검색 페이지 번호가 변하면 스크롤 위로 이동시키기
    currentPage() {
      const anchor = this.$refs.anchor
      anchor.scrollIntoView({ behavior: 'smooth' })
    },
  },
  methods: {
    ...mapActions({
      getMyHead: 'getMyHead',
    }),
  },
  async fetch() {
    await this.getMyHead()
  },
}
</script>
