<template lang="">
  <div>
    <div class="font-extrabold text-xl">프로젝트 공고</div>
    <form class="gap-5 grid grid-flow-row mt-5">
      <div>
        <label class="boldAndSpace" for="title">제목</label>
        <input class="w-full mt-2" type="text" id="title" />
      </div>
      <hr />

      <div>
        <label class="boldAndSpace" for="title">내용</label>
        <client-only placeholder="Loading....">
          <MarkEditor />
        </client-only>
      </div>
      <hr />

      <label for="desc"></label>
    </form>
  </div>
</template>
<script>
export default {}
</script>
<style lang=""></style>
