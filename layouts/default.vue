<template>
  <div>
    <TheHeader />
    <div class="container">
      <Nuxt />
    </div>
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
