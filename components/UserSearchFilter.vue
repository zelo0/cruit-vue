<template lang="">
  <div class="my-5 ver-gap5-grid">
    <h2 class="border-b-2 border-gray-100 pb-1">원하는 유저를 찾아보세요</h2>

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

    <div>
      <h2 class="pb-2">리더 가능 여부</h2>
      <div class="font-bold">
        <input
          type="radio"
          value="all"
          id="all"
          :checked="leaderFilter == 'all'"
          @change="onChangeLeaderFilter"
        />
        <label for="all">모두</label>

        <input
          type="radio"
          value="true"
          id="true"
          :checked="leaderFilter == 'true'"
          @change="onChangeLeaderFilter"
        />
        <label for="true">가능</label>

        <input
          type="radio"
          value="false"
          id="false"
          :checked="leaderFilter == 'false'"
          @change="onChangeLeaderFilter"
        />
        <label for="false">불가능</label>
      </div>
    </div>

    <div class="flex justify-start">
      <button @click="onSearch" class="myBtn">검색</button>
    </div>

    <hr class="mt-5" />
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
      stackFilters: (state) => state.users.stackFilters,
      leaderFilter: (state) => state.users.leaderFilter,
    }),
  },
  methods: {
    ...mapActions({
      getUsersByFilter: 'users/getUsersByFilter',
    }),
    ...mapMutations({
      setCurrentPage: 'users/setCurrentPage',
      addStackFilter: 'users/addStackFilter',
      removeStackFilter: 'users/removeStackFilter',
      setLeaderFilter: 'users/setLeaderFilter',
    }),
    onSearch() {
      this.setCurrentPage(0)
      this.getUsersByFilter()
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
    onChangeLeaderFilter(event) {
      this.setLeaderFilter(event.target.value)
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
