<template lang="">
  <div class="ring-2 rounded-xl p-4 cursor-pointer shadow-lg" @click="onclick">
    <div class="flex flex-wrap items-center p-1">
      <div class="table table-fixed w-full">
      <h2 class="overflow-ellipsis table-cell overflow-hidden whitespace-nowrap">{{ project.name }}</h2>
      </div>

      <div>
        <button
          @click.stop="clickedProjectModifyBtn"
          class="myBtn"
        >
          수정
        </button>
        <!-- 프로젝트 삭제 버튼 -->
        <button
          @click.stop="clickedProjectDeleteBtn"
          class="red-btn"
        >
          삭제
        </button>
      </div>
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

    <Dialog ref="deleteDialog" @answeredYes="deleteProject" @answeredNo="hideDeleteDialog">
      <template #message>
        <h2>해당 프로젝트를 삭제하시겠습니까?</h2>
      </template>
    </Dialog>
  </div>
</template>
<script>
export default {
  props: ['project'],
  methods: {
    onclick() {
      this.$emit('clicked', this.project.id)
    },
    clickedProjectModifyBtn() {
      this.$router.push(`/projects/${this.project.id}/modify`)
    },
    hideDeleteDialog() {
      this.$refs.deleteDialog.hide()
    },
    clickedProjectDeleteBtn() {
      this.$refs.deleteDialog.show()
    },
    async deleteProject() {
      await this.$axios
        .$delete(`/projects/${this.project.id}`)
        .then((res) => {
          this.hideDeleteDialog()
          alert('삭제됐습니다')
          this.$emit('deleted', this.project.id)
        })
        .catch((err) => {
          // console.log(err)
        })
    },
  }
}
</script>
<style lang=""></style>
