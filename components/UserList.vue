<template lang="">
  <div>
    <div v-if="!hasError">
      <!-- 검색 결과 있으면 -->
      <div
        v-if="users.length"
        class="grid xl:grid-cols-4 sm:grid-cols-2 gap-10"
      >
        <UserCard v-for="(item, index) in users" :key="index" :user="item" />
      </div>

      <!-- 검색 결과 없으면 -->
      <div v-else class="text-center">
        <h2>검색결과가 없습니다</h2>
      </div>
    </div>

    <!-- 에러 발생 시 -->
    <div v-else class="text-red-400 font-bold text-2xl text-center">
      에러가 발생했습니다
    </div>

    <!-- 페이징 -->
    <Paging
      :hasPrevious="hasPrevious"
      :hasNext="hasNext"
      :totalPage="totalPage"
      :currentPage="currentPage"
      @onPageClick="setCurrentPage"
      @onPrevClick="decreaseCurrentPage"
      @onNextClick="increaseCurrentPage"
    />
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      stackFilters: (state) => state.users.stackFilters,
      users: (state) => state.users.users,
      hasError: (state) => state.users.hasError,
      hasPrevious: (state) => state.users.hasPrevious,
      hasNext: (state) => state.users.hasNext,
      totalPage: (state) => state.users.totalPage,
      currentPage: (state) => state.users.currentPage,
    }),
  },
  methods: {
    ...mapActions({
      getUsersByFilter: 'users/getUsersByFilter',
    }),
    ...mapMutations({
      setCurrentPage: 'users/setCurrentPage',
      increaseCurrentPage: 'users/increaseCurrentPage',
      decreaseCurrentPage: 'users/decreaseCurrentPage',
    }),
  },
  watch: {
    currentPage: function (newVal) {
      this.getUsersByFilter()
    },
  },
  async fetch() {
    await this.getUsersByFilter()
  },
}
</script>
<style lang=""></style>
