<template lang="">
  <div>
    <!-- 파트 이름 -->
    <div class="font-bold">
      <slot name="partKind"></slot>
    </div>
    <!-- 사용 스택 이미지들 -->
    <div class="pb-1">
      <Pill>사용 스택</Pill>
      <OverlappingAvatars
        :imageList="part.stacks.map((stack) => stack.image)"
      ></OverlappingAvatars>
    </div>

    <!-- 파트원들의 프로필 이미지들 -->
    <div class="pb-1">
      <Pill>멤버</Pill>
      <OverlappingAvatars
        :imageList="part.partMembers.map((member) => member.profile)"
      ></OverlappingAvatars>
    </div>
  </div>
</template>
<script>
export default {
  props: ['part'],
}
</script>
<style lang=""></style>
