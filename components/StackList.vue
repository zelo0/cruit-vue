<template lang="">
  <div>
    <h2 class="p-2 font-bold">원하는 스택의 프로젝트, 팀원을 찾아보세요</h2>
    <hr />
    <div class="p-5">
      <h2 class="text-lg font-bold ml-5">프론트엔드</h2>
      <div class="grid gap-5 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 m-5">
        <StackItem
          :data="item"
          v-for="(item, index) in frontendStacks"
          :key="index"
        />
      </div>
    </div>
    <div class="p-5">
      <h2 class="text-lg font-bold ml-5">백엔드</h2>
      <div class="grid gap-5 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 m-5">
        <StackItem
          :data="item"
          v-for="(item, index) in backendStacks"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>
<script>
// import StackItem from '../components/StackItem.vue'
export default {
  data() {
    return {
      frontendStacks: [],
      backendStacks: [],
    }
  },
  async fetch() {
    await this.$axios
      .$get('/stacks')
      .then((res) => {
        const data = res.data
        for (let i = 0; i < data.length; i++) {
          if (data[i].dtype == 'frontend') {
            this.frontendStacks.push(data[i])
          } else if (data[i].dtype == 'backend') {
            this.backendStacks.push(data[i])
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>
<style lang=""></style>
