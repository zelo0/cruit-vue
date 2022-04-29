<template>
  <div class="ver-gap5-grid">
    <ProjectModifyForm />
    <hr />

    <NuxtLink to="/users" class="flex justify-between">
      <h2>지금 바로 함께 할 멤버를 찾아보세요</h2>
      <ChevronRightIcon class="text-black dark:text-white" />
    </NuxtLink>
  </div>
</template>

<script>
import { ChevronRightIcon } from '@vue-hero-icons/solid'
export default {
  components: {
    ChevronRightIcon,
  },
  middleware: 'authenticated',
}
</script>
