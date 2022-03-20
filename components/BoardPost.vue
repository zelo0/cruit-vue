<template lang="">
  <div class="border-2 p-5 shadow-md">
    <div class="flex justify-between">
      <NuxtLink :to="{ path: `/users/${post.user.id}` }">
        <ImageAndName :image="post.user.profile" :name="post.user.name" />
      </NuxtLink>
      <!-- 글 작성자에게만 보이는 버튼들 -->
      <div v-if="myName == post.user.name" class="flex">
        <!-- 수정 버튼 -->
        <button @click="clickedModifyBtn" class="myBtn">수정</button>
        <!-- 삭제 버튼 -->
        <button @click="clickedDeleteBtn" class="red-btn">삭제</button>
      </div>
    </div>
    <div class="mt-3">
      <h2>{{ post.title }}</h2>
      <ToastViewer :initialValue="post.content" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: ['post'],
  computed: {
    ...mapState({
      myName: (state) => state.myName,
    }),
  },
  methods: {
    clickedModifyBtn() {
      this.$router.push(`${this.$route.path}/${this.post.id}/modify`)
    },
    clickedDeleteBtn() {
      this.$emit('delete')
    },
  },
}
</script>
<style lang=""></style>
