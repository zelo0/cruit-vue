<template lang="">
  <div v-if="!hasError" class="grid md:grid-cols-2 gap-5">
    <ProjectItem
      v-for="(item, index) in projects"
      :key="index"
      :project="item"
    />
  </div>
  <div v-else class="text-red-400 font-bold text-2xl text-center">
    에러가 발생했습니다
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      projects: (state) => state.projects.projects,
      hasError: (state) => state.projects.hasError,
    }),
  },
  methods: {
    ...mapActions({
      getProjectsByNoFilter: 'projects/getProjectsByNoFilter',
    }),
  },
  created() {
    this.getProjectsByNoFilter()
  },
}
</script>
<style lang=""></style>
