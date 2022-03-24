<template lang="">
  <div
    class="relative ring-2 p-2 rounded-md cursor-pointer shadow-lg"
    :class="{
      'ring-green-400 active:bg-green-50': user.position == 'BACKEND',
      'ring-purple-400 active:bg-purple-50': user.position == 'FRONTEND',
      'ring-yellow-400 active:bg-yellow-50': user.position == 'DESIGN',
    }"
    @click="onclick"
  >
    <div class="flex">
      <Avatar :url="user.profile" />
      <p class="font-bold leading-10 ml-1">{{ user.name }}</p>
    </div>

    <div>
      <h3>
        {{ user.position }}
      </h3>
    </div>

    <div>
      <OverlappingAvatars :imageList="user.stacks" />
    </div>

    <!-- 오버레이 (대표 url) -->
    <div
      class="absolute right-0 top-0 bg-opacity-30 bg-gray-700 rounded-tr-md text-white p-1"
      @click.stop
      v-if="user.github"
    >
      <a :href="user.github" target="_blank">LINK</a>
    </div>

    <!-- 리더 가능 여부 -->
    <div
      class="absolute left-0 top-0 bg-opacity-30 rounded-tl-md bg-red-400 text-white p-1"
      v-if="user.canBeLeader"
    >
      <p>LEADER</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['user'],
  methods: {
    onclick() {
      this.$router.push(`/users/${this.user.id}`)
    },
  },
}
</script>
<style lang=""></style>
