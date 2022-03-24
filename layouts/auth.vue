<template>
  <div
    class="h-screen bg-gradient-to-t from-green-200 dark:from-night-300 to-green-50 dark:to-night-100"
  >
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
