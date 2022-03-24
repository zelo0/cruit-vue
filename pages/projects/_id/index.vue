<template lang="">
  <div>
    <div>
      <div v-if="project" class="ver-gap5-grid">
        <!-- 제목 -->
        <div
          class="flex flex-wrap justify-between items-center pb-3 border-b-4 border-blue-500"
        >
          <!-- 프로젝트 제목 -->
          <h1 class="">{{ project.name }}</h1>

          <!-- 프로젝트 제안자에게 보이는 버튼들 -->
          <div
            v-if="myName == project.proposer.name"
          >
            <!-- 프로젝트 수정 버튼 -->
            <button
              @click="clickedProjectModifyBtn"
              class="myBtn"
            >
              수정
            </button>
            <!-- 프로젝트 삭제 버튼 -->
            <button
              @click="clickedProjectDeleteBtn"
              class="red-btn"
            >
              삭제
            </button>
          </div>

          <!-- 프로젝트 제안자가 아닌 이들에게 보이는 버튼들 -->
          <div
          v-else
          >
            <button class="myBtn" @click="onClickJoinBtn">
              참여 요청
            </button>
          </div>
        </div>

        <!-- 각 스택별 정보 -->
        <div class="ver-gap2-grid">
          <PartInfo
            :part="frontendPart"
            :proposerName="project.proposer.name"
          >
            프론트엔드
          </PartInfo>
          <hr />

          <PartInfo
            :part="backendPart"
            :proposerName="project.proposer.name"
          >
            백엔드
          </PartInfo>
          <hr />

          <PartInfo
            :part="designPart"
            :proposerName="project.proposer.name"
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

    <Dialog ref="deleteDialog" @answeredYes="deleteProject" @answeredNo="hideDeleteDialog">
      <template #message>
        <h2>해당 프로젝트를 삭제하시겠습니까?</h2>
      </template>
    </Dialog>

    <Dialog ref="joinDialog" @answeredYes="joinLeaderRequest" @answeredNo="joinNonLeaderRequest">
      <template #message>
        <h2>해당 파트의 리더가 없는 상태입니다<br>리더 자리에 지원하시겠습니까?</h2>
      </template>
    </Dialog>
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
      this.$router.push(`/projects/${this.$route.params.id}/modify`)
    },
    hideDeleteDialog() {
      this.$refs.deleteDialog.hide()
    },
    clickedProjectDeleteBtn() {
      this.$refs.deleteDialog.show()
    },
    async deleteProject() {
      /* 삭제 후 back */
      await this.$axios
        .$delete(`/projects/${this.$route.params.id}`)
        .then((res) => {
          this.hideDeleteDialog()
          alert('삭제됐습니다')
          this.$router.back()
        })
        .catch((err) => {
          // console.log(err)
        })
    },
    addQuestion(question) {
      this.project.questions.push(question)
    },
    onDeletedQuestion(index) {
      this.project.questions.splice(index, 1)
    },
    async joinLeaderRequest() {
      await this.$axios.$post(`/proposals/project`, {
        projectId: this.$route.params.id,
        isLeaderProposal: true
      }).then(res=>{
        this.$refs.joinDialog.hide()
        alert("프로젝트 참여 요청을 보냈습니다")
      }).catch(err=>{
        // console.log(err)
      })
    },
    async joinNonLeaderRequest() {
      await this.$axios.$post(`/proposals/project`, {
        projectId: this.$route.params.id,
        isLeaderProposal: false
      }).then(res=>{
        this.$refs.joinDialog.hide()
        alert("프로젝트 참여 요청을 보냈습니다")
      }).catch(err=>{
        // console.log(err)
        })
    },
    async onClickJoinBtn() {
      // 로그인 상태가 아니면 로그인 페이지로 리다이렉트
      if (!this.$store.getters.authenticated) {
        this.$router.push('/auth/login')
        return
      }

      // 내 포지션의 파트에 리더가 없으면 
      // 리더 자리 들어갈 지 결정하는 다이얼로그 띄움
      if (!this.hasLeaderOfMyPosition) {
        this.$refs.joinDialog.show()
      } else {
        await this.joinNonLeaderRequest()
      }
    },
  },
  computed: {
    ...mapState({
      myName: (state) => state.myName,
      myPosition: (state) => state.myPosition
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

    // 내 포지션의 파트의 리더 자리가 비었는지
    hasLeaderOfMyPosition: function() {
      if (this.myPosition == "FRONTEND") {
        return this.frontendPart.hasPartLeader
      } else if (this.myPosition == "BACKEND") {
        return this.backendPart.hasPartLeader
      } else {
        return this.designPart.hasPartLeader
      }
    }
  },
  async fetch() {
    await this.$axios
      .$get(`/projects/${this.$route.params.id}`)
      .then((res) => {
        this.project = res.data
      })
      .catch((err) => {
        // console.log('에러 발생')
      })
  },
}
</script>
<style lang=""></style>
