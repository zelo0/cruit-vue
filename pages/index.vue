<template>
  <div>
    <TheHeader />
    <div class="container md:w-4/5 p-4">
      <MenuBar />
      <ProjectCreateBtn />
      <ProjectSearchFilter />
      <ProjectList />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'IndexPage',
  methods: {
    ...mapActions({
      getMyName: 'getMyName',
    }),
  },
  async fetch() {
    await this.getMyName()
  },
}
</script>
