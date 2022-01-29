<template lang="">
  <div class="grid md:grid-cols-2 gap-5 p-5">
    <ProjectItem
      v-for="(item, index) in projectList"
      :key="index"
      :project="item"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      projectList: [],
    }
  },
  async fetch() {
    await this.$axios
      .$get('/projects')
      .then((res) => {
        this.projectList = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>
<style lang=""></style>
