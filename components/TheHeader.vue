<template lang="">
  <div
    class="bg-red-50 flex justify-between py-2 px-5 border-b-2 border-gray-300 shadow"
  >
    <div class="basis-1/4 mr-2">로고</div>

    <div
      class="ring-1 ring-red-500 ring-offset-1 ring-offset-red-100 flex-initial w-1/2"
    >
      검색
    </div>

    <div class="flex gap-5">
      <nuxt-link to="/login" class="font-bold">로그인</nuxt-link>
      <nuxt-link to="/join" class="font-bold">회원가입</nuxt-link>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang=""></style>
