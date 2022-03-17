<template>
  <div class="h-full">
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
