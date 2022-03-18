<template lang="">
  <div>
    <div v-if="!hasError">
      <div class="grid xl:grid-cols-4 sm:grid-cols-2 gap-10">
        <ProjectItem
          v-for="(item, index) in projects"
          :key="item.id"
          :project="item"
          @clicked="movePage"
        />
      </div>
    </div>
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
    ></Paging>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      stackFilters: (state) => state.projects.stackFilters,
      projects: (state) => state.projects.projects,
      hasError: (state) => state.projects.hasError,
      hasPrevious: (state) => state.projects.hasPrevious,
      hasNext: (state) => state.projects.hasNext,
      totalPage: (state) => state.projects.totalPage,
      currentPage: (state) => state.projects.currentPage,
    }),
  },
  methods: {
    ...mapActions({
      getProjectsByFilter: 'projects/getProjectsByFilter',
    }),
    ...mapMutations({
      setCurrentPage: 'projects/setCurrentPage',
      increaseCurrentPage: 'projects/increaseCurrentPage',
      decreaseCurrentPage: 'projects/decreaseCurrentPage',
    }),
    movePage(projectId) {
      this.$router.push(`/projects/${projectId}`)
    },
  },
  watch: {
    currentPage: function (newVal) {
      this.getProjectsByFilter()
    },
  },
  async fetch() {
    await this.getProjectsByFilter()
  },
}
</script>
<style lang=""></style>
