<template>
  <div class="h-screen bg-gradient-to-t from-green-200 to-green-50">
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
