<template lang="">
  <div class="py-2 border-t-2 border-gray-400">
    <!-- 파트 이름 + 모집 여부 -->
    <div class="font-bold flex gap-2">
      <!-- 파트 이름 -->
      <slot name="partKind"></slot>
      <BreadCrumb></BreadCrumb>
      <!-- 모집 여부 -->
      <div
        v-if="part.status == 'RECRUITING'"
        class="text-blue-500 ring-blue-200"
      >
        모집 중
      </div>
      <div v-else class="text-gray-400">모집 완료</div>
    </div>
    <!-- 사용 스택 이미지들 -->
    <div class="pb-1">
      <div class="flex">
        <Pill>사용 스택</Pill>
        <OverlappingAvatars
          :imageList="part.stacks.map((stack) => stack.image)"
        ></OverlappingAvatars>
      </div>
    </div>

    <!-- 파트원들의 프로필 이미지들 -->
    <div class="pb-1">
      <div class="flex">
        <Pill>멤버</Pill>
        <OverlappingAvatars
          :imageList="part.partMembers.map((member) => member.profile)"
        ></OverlappingAvatars>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['part'],
}
</script>
<style lang=""></style>
