<template lang="">
  <div class="ver-gap5-grid">
    <h2>참여하고 있는 프로젝트</h2>
    <div>
      프로젝트를 클릭하면 모든 프로젝트원이 볼 수 있는 공지방으로 이동합니다
    </div>
    <div class="grid xl:grid-cols-4 sm:grid-cols-2 gap-10">
      <MyProjectItem
        v-for="(project, index) in projects"
        :key="project.id"
        :project="project"
        @clicked="moveToBoard"
        @deleted="removeInPage"
      />
    </div>
  </div>
</template>
<script>
export default {
  middleware: 'authenticated',
  data() {
    return {
      projects: [],
    }
  },
  methods: {
    moveToBoard(projectId) {
      this.$router.push(`/projects/${projectId}/boards`)
    },
    removeInPage(projectId) {
      this.projects.splice(
        this.projects.findIndex((project) => project.id == projectId),
        1
      )
    },
  },
  async fetch() {
    await this.$axios
      .$get('/projects/me')
      .then((res) => {
        this.projects = res.data.projects
      })
      .catch((err) => {
        // console.log(err)
      })
  },
}
</script>
<style lang=""></style>
