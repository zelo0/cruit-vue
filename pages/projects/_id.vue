<template lang="">
  <div>
    <TheHeader />
    <div class="container">
      <div v-if="project" class="ver-gap5-grid">
        <!-- 제목 -->
        <h1 class="pb-4 border-b-4 border-blue-500">{{ project.name }}</h1>

        <!-- 각 스택별 정보 -->
        <PartInfo
          :stacks="frontendStacks"
          :members="frontendMembers"
          :status="frontendPart.status"
        >
          프론트엔드
        </PartInfo>
        <hr />

        <PartInfo
          :stacks="backendStacks"
          :members="backendMembers"
          :status="backendPart.status"
        >
          백엔드
        </PartInfo>
        <hr />

        <PartInfo
          :stacks="designStacks"
          :members="designMembers"
          :status="designPart.status"
        >
          디자인
        </PartInfo>
        <hr />

        <!-- 내용 -->
        <div>
          <h2>설명</h2>
          <client-only placeholder="LOADING...">
            <ToastViewer
              v-if="project.description"
              :initialValue="project.description"
            />
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      project: null,
    }
  },
  computed: {
    // 큰 객체
    frontendPart: function () {
      for (const part of this.project.parts) {
        if (part.position == 'frontend') return part
      }
    },
    backendPart: function () {
      for (const part of this.project.parts) {
        if (part.position == 'backend') return part
      }
    },
    designPart: function () {
      for (const part of this.project.parts) {
        if (part.position == 'design') return part
      }
    },
    /* stack */
    frontendStacks: function () {
      return this.frontendPart.stacks
    },
    backendStacks: function () {
      return this.backendPart.stacks
    },
    designStacks: function () {
      return this.designPart.stacks
    },
    /* partMember */
    frontendMembers: function () {
      return this.frontendPart.partMembers
    },
    backendMembers: function () {
      return this.backendPart.partMembers
    },
    designMembers: function () {
      return this.designPart.partMembers
    },
  },
  async fetch() {
    await this.$axios
      .$get(`/projects/${this.$route.params.id}`)
      .then((res) => {
        this.project = res.data
      })
      .catch((err) => {
        console.log('에러 발생')
      })
  },
}
</script>
<style lang=""></style>
