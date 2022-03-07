<template lang="">
  <div class="relative">
    <div class="container">
      <div class="ver-gap5-grid">
        <div class="text-center">
          <h2>
            <span class="text-blue-600">"{{ this.$route.params.to }}"</span>
            님에게 보내는 파트 제안
          </h2>
        </div>

        <div>
          <h2>아래에서 제안할 파트를 선택해주세요</h2>
          <h3>
            프로젝트 제안자는 모든 파트, 파트 리더는 해당 파트에 한해 유저에게
            제안을 보낼 수 있습니다
          </h3>
          <hr />

          <div v-if="involvedParts" class="my-5">
            <ul>
              <li v-for="(part, index) in involvedParts" :key="index">
                <PartProposalItem
                  :part="part"
                  @clicked="onPartClick"
                  :class="{
                    'bg-blue-300': selectedPart && part.id == selectedPart.id,
                  }"
                />
              </li>
            </ul>

            <div v-if="selectedPart" class="">
              <p class="text-center text-lg my-5">
                <span class="font-extrabold">{{ this.$route.params.to }}</span>
                님에게
                <span class="font-extrabold">{{
                  this.selectedPart.projectName
                }}</span>
                프로젝트의
                <span class="font-extrabold">{{
                  this.selectedPart.position
                }}</span>
                자리를 제안하시겠습니까?
              </p>

              <button class="w-full-btn" @click="onProposalBtnClick">
                <h2>제안하기</h2>
              </button>
            </div>
          </div>

          <h3 v-else>제안할 수 있는 프로젝트 파트가 없습니다</h3>
        </div>
      </div>
    </div>

    <!-- 리더 제안할 지 여부 확인하는 다이얼로그 -->
    <div
      v-show="isDialogShown"
      class="bg-black bg-opacity-50 flex z-10 fixed left-0 top-0 w-screen h-screen items-center justify-center"
      @click="isDialogShown = false"
    >
      <!-- 팝업 창 -->
      <div class="bg-white py-10 px-7 rounded-lg relative" @click.stop>
        <div class="text-right">
          <button
            class="font-bold text-xl absolute right-4 top-1.5"
            @click="onCancelProposal"
          >
            X
          </button>
        </div>

        <div>
          <h2>리더 자리를 제안하시겠습니까?</h2>
          <div class="flex justify-evenly mt-5 gap-5">
            <button
              class="bg-gray-200 hover:bg-gray-300 w-full h-10 rounded-md"
              @click="onAnswerYes"
            >
              예
            </button>
            <button
              class="bg-gray-200 hover:bg-gray-300 w-full h-10 rounded-md"
              @click="onAnswerNo"
            >
              아니오
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      involvedParts: null,
      selectedPart: null,
      isLeaderProposal: false,
      isDialogShown: false,
    }
  },
  methods: {
    onPartClick(selectedPart) {
      this.selectedPart = selectedPart
    },
    onProposalBtnClick() {
      this.isDialogShown = true
    },
    onCancelProposal() {
      this.isDialogShown = false
    },
    onAnswerYes() {
      this.isLeaderProposal = true
    },
    onAnswerNo() {
      this.isLeaderProposal = false
    },
  },
  async fetch() {
    await this.$axios
      .$get('/parts/involved')
      .then((res) => {
        this.involvedParts = res.data.involvedParts
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>
<style lang=""></style>
