<template>
  <div class="h-full dark:bg-night-200 dark:text-white">
    <Nuxt />
  </div>
</template>
<script>
export default {
  mounted() {
    window.addEventListener('beforeunload', (event) => {
      window.localStorage.removeItem('vuex')
    })
  },
}
</script>
