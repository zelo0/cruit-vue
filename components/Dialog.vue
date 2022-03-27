<template lang="">
  <div
    v-show="isDialogShown"
    class="bg-black bg-opacity-50 flex z-10 fixed left-0 top-0 w-screen h-screen items-center justify-center"
    @click.prevent.stop="isDialogShown = false"
  >
    <!-- 팝업 창 -->
    <div
      class="bg-white dark:bg-night-300 py-10 px-7 rounded-lg relative"
      @click.stop
    >
      <div class="text-right">
        <button class="absolute right-4 top-1.5" @click="onCancelProposal">
          <client-only>
            <unicon name="times" />
          </client-only>
        </button>
      </div>

      <div>
        <!-- 메시지 -->
        <div>
          <slot name="message"></slot>
        </div>
        <!-- 버튼들 -->
        <div class="flex justify-evenly mt-5 gap-5">
          <button
            class="bg-gray-200 hover:bg-gray-300 dark:bg-night-100 w-full h-10 rounded-md"
            @click="onAnswerYes"
          >
            예
          </button>
          <button
            class="bg-gray-200 hover:bg-gray-300 dark:bg-night-100 w-full h-10 rounded-md"
            @click="onAnswerNo"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isDialogShown: false,
    }
  },
  methods: {
    onCancelProposal() {
      this.isDialogShown = false
    },
    onAnswerYes() {
      this.$emit('answeredYes')
    },
    onAnswerNo() {
      this.$emit('answeredNo')
    },
    show() {
      this.isDialogShown = true
    },
    hide() {
      this.isDialogShown = false
    },
  },
}
</script>
<style lang=""></style>
