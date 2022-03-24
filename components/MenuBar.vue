<template lang="">
  <div class="flex gap-5 border-b-4 border-blue-500 dark:border-blue-500 mb-5">
    <NuxtLink to="/"><h2>프로젝트</h2></NuxtLink>
    <NuxtLink to="/users"><h2>유저</h2></NuxtLink>
  </div>
</template>
<script>
export default {}
</script>
<style lang="css" scoped>
a.nuxt-link-exact-active {
  @apply text-blue-700 dark:text-blue-300;
}
</style>
