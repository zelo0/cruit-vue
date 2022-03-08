<template lang="">
  <div class="p-2 ver-gap2-grid border-b-2">
    <!-- 질문자 -->
    <div class="flex items-center">
      <Avatar :url="question.questioner.profile" />
      <p class="ml-1">{{ question.questioner.name }}</p>
    </div>

    <!-- 질문 내용 -->
    <div>
      <!-- 변경 아닐 때는 단순히 내용 보여주기 -->
      <p v-show="!isModifing">{{ question.content }}</p>
      <!-- 변경 원할 때 -->
      <form v-show="isModifing" @submit.prevent="onModify">
        <AutoResizingTextArea
          :initialContent="question.content"
          ref="modifingTextarea"
        />
        <div class="text-right">
          <button class="myBtn inline-block">변경</button>
        </div>
      </form>
    </div>

    <!-- 댓글 관련 버튼들 -->
    <div class="flex gap-6">
      <button class="gray-btn" @click="onClickReBtn">댓글 달기</button>
      <button
        class="gray-btn"
        v-show="question.questioner.name == myName"
        @click="onClickModifyBtn"
      >
        수정
      </button>
      <button
        class="gray-btn"
        v-show="question.questioner.name == myName"
        @click="onDelete"
      >
        삭제
      </button>
    </div>

    <!-- 대댓글 -->
    <div class="ml-5">
      <transition
        enter-active-class="duration-300 transition-opacity"
        enter-class="opacity-0"
        enter-to-class="opacity-1"
        leave-active-class="duration-300 transition-opacity"
        leave-class="opacity-1"
        leave-to-class="opacity-0"
      >
        <QuestionForm
          :parentId="question.id"
          v-show="isShownReQuestionForm"
          @createdQuestion="addQuestionToChildren"
        />
      </transition>
      <Question
        v-for="(child, index) in question.children"
        :key="index"
        :question="child"
        @deleted="onDeletedQuestion(index)"
      />
    </div>
  </div>

  <!-- 삭제 여부 확인하는 다이얼로그 -->
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['question'],
  data() {
    return {
      isShownReQuestionForm: false,
      isModifing: false,
    }
  },
  computed: {
    ...mapState({
      myName: (state) => state.myName,
    }),
  },
  methods: {
    /* 댓글 달기 버튼 클릭 시 */
    onClickReBtn() {
      this.isShownReQuestionForm = !this.isShownReQuestionForm
    },
    /* 수정 버튼 클릭 시 */
    onClickModifyBtn() {
      this.isModifing = !this.isModifing
    },
    /* question children에 추가 */
    addQuestionToChildren(question) {
      this.question.children.push(question)
    },
    onDeletedQuestion(index) {
      this.project.question.splice(index, 1)
      alert('삭제됐습니다')
    },
    /* 서버에 질문글 수정 요청 */
    async onModify() {
      const content = this.$refs.modifingTextarea.getContent()
      await this.$axios
        .$patch(`/questions/${this.question.id}`, { content })
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    },
    /* 서버에 질문글 삭제 요청 */
    async onDelete() {
      await this.$axios
        .$delete(`/questions/${this.question.id}`)
        .then((res) => {
          // 질문 리스트에서 제거해서 안 보이게 하기
          this.$emit('deleted')
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
<style lang=""></style>
