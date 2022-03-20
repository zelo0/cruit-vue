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
      // window.localStorage.removeItem('vuex')
      // 이 코드로 인해 새로고침 시 vuex 날라감
    })
  },
}
</script>
