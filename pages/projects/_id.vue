<template lang="">
  <div>
    <div class="container">
      <div v-if="project" class="ver-gap5-grid">
        <!-- 제목 -->
        <div
          class="flex justify-between items-center pb-3 border-b-4 border-blue-500"
        >
          <h1 class="">{{ project.name }}</h1>
          <button
            @click="clickedProjectModifyBtn"
            class="myBtn"
            v-show="myName == project.proposer.name"
          >
            수정
          </button>
        </div>

        <!-- 각 스택별 정보 -->
        <div class="ver-gap2-grid">
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
        </div>

        <!-- 내용 -->
        <div>
          <h2>설명</h2>
          <!-- <client-only placeholder="LOADING..."> -->
          <ToastViewer
            v-if="project.description"
            :initialValue="project.description"
          />
          <!-- </client-only> -->
        </div>
        <hr />

        <!-- 댓글(질문) -->
        <div>
          <h2>댓글</h2>
          <!-- 댓글 작성 폼 -->
          <div>
            <QuestionForm @createdQuestion="addQuestion" />
          </div>

          <!-- 댓글들 -->
          <div>
            <Question
              v-for="(question, index) in project.questions"
              :key="index"
              :question="question"
              @deleted="onDeletedQuestion(index)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'ProjectDetailPage',
  data() {
    return {
      project: null,
    }
  },
  methods: {
    clickedProjectModifyBtn() {
      this.$router.push(`/project-modify/${this.$route.params.id}`)
    },
    addQuestion(question) {
      this.project.questions.push(question)
    },
    onDeletedQuestion(index) {
      this.project.questions.splice(index, 1)
    },
  },
  computed: {
    ...mapState({
      myName: (state) => state.myName,
    }),

    // 큰 객체
    frontendPart: function () {
      for (const part of this.project.parts) {
        if (part.position == 'FRONTEND') return part
      }
    },
    backendPart: function () {
      for (const part of this.project.parts) {
        if (part.position == 'BACKEND') return part
      }
    },
    designPart: function () {
      for (const part of this.project.parts) {
        if (part.position == 'DESIGN') return part
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
