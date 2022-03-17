<template>
  <div class="">
    <MenuBar />
    <UserSearchFilter />
    <span ref="anchor"></span>
    <UserList />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      currentPage: (state) => state.users.currentPage,
    }),
  },
  watch: {
    // 검색 페이지 번호가 변하면 스크롤 위로 이동시키기
    currentPage() {
      const anchor = this.$refs.anchor
      anchor.scrollIntoView({ behavior: 'smooth' })
    },
  },
}
</script>
