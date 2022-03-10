<template lang="">
  <div class="my-5 ver-gap5-grid">
    <h2 class="border-b-2 border-gray-100 pb-1">
      원하는 프로젝트를 찾아보세요
    </h2>

    <div>
      <h2 class="pb-2">프론트엔드</h2>
      <div class="grid gap-5 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
        <SelectableStackItem
          :iniSelected="isIncluded(item)"
          :data="item"
          v-for="(item, index) in frontendStacks"
          :key="index"
          @onSelectStackItem="onSelectStackItem"
          @onUnselectStackItem="onUnselectStackItem"
        />
      </div>
    </div>

    <div>
      <h2 class="pb-2">백엔드</h2>
      <div class="grid gap-5 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
        <SelectableStackItem
          :iniSelected="isIncluded(item)"
          :data="item"
          v-for="(item, index) in backendStacks"
          :key="index"
          @onSelectStackItem="onSelectStackItem"
          @onUnselectStackItem="onUnselectStackItem"
        />
      </div>
    </div>

    <div class="flex justify-start">
      <button @click="onSearch" class="myBtn">검색</button>
    </div>

    <hr />
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      frontendStacks: [],
      backendStacks: [],
    }
  },
  computed: {
    ...mapState({
      stackFilters: (state) => state.projects.stackFilters,
    }),
  },
  methods: {
    ...mapActions({
      getProjectsByFilter: 'projects/getProjectsByFilter',
    }),
    ...mapMutations({
      setCurrentPage: 'projects/setCurrentPage',
      addStackFilter: 'projects/addStackFilter',
      removeStackFilter: 'projects/removeStackFilter',
    }),
    onSearch() {
      /* vuex에서 currentPage 를 api 요청 parameter로 넘기기 때문에 0으로 초기화 필요 */
      this.setCurrentPage(0)
      this.getProjectsByFilter()
    },
    onSelectStackItem(stack) {
      this.addStackFilter(stack.name)
    },
    onUnselectStackItem(stack) {
      this.removeStackFilter(stack.name)
    },
    isIncluded(item) {
      return this.stackFilters.includes(item.name)
    },
  },
  async fetch() {
    await this.$axios
      .$get('/stacks')
      .then((res) => {
        const data = res.data
        for (let i = 0; i < data.length; i++) {
          if (data[i].dtype == 'FRONTEND') {
            this.frontendStacks.push(data[i])
          } else if (data[i].dtype == 'BACKEND') {
            this.backendStacks.push(data[i])
          }
        }
      })
      .catch((err) => {
        console.log('에러 발생')
      })
  },
}
</script>
<style lang=""></style>
