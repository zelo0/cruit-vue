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
      // 이 코드로 인해 새로고침 시 vuex 날라감
      // 이게 없으면 생기는 문제는 종료 후 다시 켰을 때 페이지 번호가 1이 아니라는거
      window.localStorage.removeItem('vuex')
    })
  },
}
</script>
