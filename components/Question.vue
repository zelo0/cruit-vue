<template lang="">
<div class="relative">
  <!-- 대댓글이 아닌 질문만 border-b-2 -->
  <div
    class="p-2 ver-gap2-grid"
    :class="{ 'border-b-2': question.parentId == -1 }"
  >
    <!-- 질문자 -->
    <div class="flex items-center">
      <ImageAndName :image="question.questioner.profile" :name="question.questioner.name"/>
    </div>

    <!-- 질문 내용 -->
    <div>
      <!-- 변경 아닐 때는 단순히 내용 보여주기 -->
      <p v-show="!isModifing">{{ question.content }}</p>
      <!-- 변경 원할 때 -->
      <TransitionSlideUpDown>
        <form v-show="isModifing" @submit.prevent="onModify">
          <AutoResizingTextArea
            :initialContent="question.content"
            ref="modifingTextarea"
          />
          <div class="text-right">
            <button class="myBtn inline-block">변경</button>
          </div>
        </form>
      </TransitionSlideUpDown>
    </div>

    <!-- 댓글 관련 버튼들 -->
    <div class="flex gap-6">
      <!-- 대댓글이 아닐 때만 댓글 달기 가능 -->
      <button
        class="gray-btn"
        @click="onClickReBtn"
        v-if="question.parentId == -1"
      >
        댓글 달기
      </button>
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
        @click="onClickDeleteBtn"
      >
        삭제
      </button>
    </div>

    <!-- 대댓글 -->
    <div class="ml-5">
      <!-- 대댓글 작성 폼 -->
      <TransitionSlideUpDown>
        <QuestionForm
          :parentId="question.id"
          v-show="isShownReQuestionForm"
          @createdSubQuestion="addSubQuestionToChildrenAndHideForm"
        />
      </TransitionSlideUpDown>

      <!-- 대댓글들 -->
      <div>
        <Question
          v-for="(child, index) in question.children"
          :key="index"
          :question="child"
          @deletedSub="onDeletedSubQuestion(index)"
        />
      </div>
    </div>
  </div>

  <!-- 삭제 여부 확인하는 다이얼로그 -->
  <Dialog ref="dialog" @answeredYes="onYes" @answeredNo="onNo">
    <template #message>
      <h2>해당 댓글을 삭제하시겠습니까?</h2>
    </template>
  </Dialog>
</div>

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
    /* 삭제 버튼 클릭 시 */
    onClickDeleteBtn() {
      this.$refs.dialog.show()
    },
    /* 다이얼로그에서 "예" 버튼 클릭 시 (삭제 원함)*/
    onYes() {
      this.deleteQuestion()
    },
    /* 다이얼로그에서 "아니오" 버튼 클릭 시 */
    onNo() {
      this.$refs.dialog.hide()
    },
    /* question children에 추가 */
    addSubQuestionToChildrenAndHideForm(question) {
      this.question.children.push(question)
      this.isShownReQuestionForm = false
    },
    // 질문의 질문이 제거되면 
    onDeletedSubQuestion(index) {
      this.question.children.splice(index, 1)
    },
    /* 서버에 질문글 수정 요청 */
    async onModify() {
      const content = this.$refs.modifingTextarea.getContent()
      // 화면에서 글씨 변경
      this.question.content = content
      // modify 아닌 상태로 변경
      this.isModifing = false
      // 서버에 수정 요청
      await this.$axios
        .$patch(`/questions/${this.question.id}`, { content })
        .then((res) => {})
        .catch((err) => {
          // console.log(err)
        })
    },
    /* 서버에 질문글 삭제 요청 */
    async deleteQuestion() {
      await this.$axios
        .$delete(`/questions/${this.question.id}`)
        .then((res) => {
          if (this.question.parentId == -1) {
            // 프로젝트의 직접 질문이면
            this.$emit('deleted')
          } else {
            // 질문의 질문 제거면
            this.$emit('deletedSub')
          }
          // 삭제 후 프론트 처리
          this.$refs.dialog.hide()
          alert('삭제됐습니다')
        })
        .catch((err) => {
          // console.log(err)
        })
    },
  },
}
</script>
<style lang=""></style>
