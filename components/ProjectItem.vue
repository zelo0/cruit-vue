<template lang="">
  <div class="ring-2 rounded-xl p-4">
    <h2 class="text-lg font-black">{{ project.name }}</h2>

    <div class="my-2">
      <div v-if="project.status == 'RECRUITING'" class="font-bold text-blue-500">
        {{ project.status }}
      </div>
      <div v-else class="font-bold text-gray-700">{{ project.status }}</div>
    </div>

    <!-- 프론트엔드 파트 -->
    <ProjectPart :part="project.frontendPart">
      <template v-slot:partKind>
        <div>프론트엔드</div>
      </template>
    </ProjectPart>

    <!-- 백엔드 파트 -->
    <ProjectPart :part="project.backendPart">
      <template v-slot:partKind>
        <div>백엔드</div>
      </template>
    </ProjectPart>

    <!-- 디자인 파트 -->
    <ProjectPart :part="project.designPart">
      <template v-slot:partKind>
        <div>디자인</div>
      </template>
    </ProjectPart>

    <!-- <div class="my-2">
      <div class="font-bold">설명</div>
      <div>
        {{ project.description }}
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  props: ['project'],
}
</script>
<style lang=""></style>
