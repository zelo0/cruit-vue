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

          <div v-if="involvedParts && involvedParts.length" class="my-5">
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
              <div class="text-center text-lg my-5">
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
              </div>

              <button class="w-full-btn" @click="onProposalBtnClick">
                <h2>제안하기</h2>
              </button>
            </div>
          </div>

          <h3 class="text-center mt-5" v-else>
            제안할 수 있는 프로젝트 파트가 없습니다
          </h3>
        </div>
      </div>
    </div>

    <!-- 리더 제안할 지 여부 확인하는 다이얼로그 -->
    <Dialog ref="dialog" @answeredYes="onAnswerYes" @answeredNo="onAnswerNo">
      <template #message>
        <h2>해당 파트의 리더가 없는 상태입니다</h2>
        <h2>리더 자리를 제안하시겠습니까?</h2>
      </template>
    </Dialog>
   
  </div>
</template>
<script>
export default {
  data() {
    return {
      involvedParts: null,
      selectedPart: null,
      isLeaderProposal: false,
    }
  },
  methods: {
    onPartClick(selectedPart) {
      this.selectedPart = selectedPart
    },
    onProposalBtnClick() {
      // part에 리더 자리가 없을 때만 리더 선택 가능한 다이얼로그 띄우기
      if (!this.selectedPart.hasLeader) {
        this.$refs.dialog.show()
      } else {
        this.sendToServer(false)
      }
    },
    onAnswerYes() {
      this.isLeaderProposal = true
      this.sendToServer(true)
    },
    onAnswerNo() {
      this.isLeaderProposal = false
      this.sendToServer(false)
    },
    async sendToServer(isLeaderProposal) {
      await this.$axios
        .$post('/proposals', {
          receiverName: this.$route.params.to,
          partId: this.selectedPart.id,
          isLeaderProposal,
        })
        .then((res) => {
          this.$router.replace('/proposals/sent')
        })
        .catch((err) => {
          console.log(err)
        })
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
