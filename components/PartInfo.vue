<template lang="">
  <div class="ver-gap2-grid">
    <div class="flex gap-4 font-bold leading-7">
      <h2>
        <slot></slot>
      </h2>
      <BreadCrumb />
      <div v-if="status == 'RECRUITING'" class="text-blue-500">모집 중</div>
      <div v-else class="text-gray-400">모집 완료</div>
    </div>

    <div>
      <h3>스택</h3>
      <div v-if="stacks.length">
        <PillBtn
          :name="item.name"
          :img="item.image"
          v-for="(item, index) in stacks"
          :key="index"
        />
      </div>
      <p class="font-semibold text-gray-300" v-else>미정</p>
    </div>

    <div>
      <h3>프로젝트 멤버</h3>
      <div v-if="members.length">
        <div
          class="relative inline-flex"
          v-for="(member, index) in members"
          :key="index"
        >
          <NuxtLink :to="{ path: `/users/${member.id}` }">
            <span
              v-if="member.isLeader"
              class="absolute -top-1 -left-2 bg-opacity-50 bg-red-400 text-white font-semibold text-xs p-1 rounded-full"
              >LEADER
            </span>
            <PillBtn :name="member.name" :img="member.profile" />
          </NuxtLink>
        </div>
      </div>
      <p class="font-semibold text-gray-300" v-else>미정</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['status', 'stacks', 'members'],
  created() {
    /* leader를 part에서 맨 앞으로 옮기기 */
    const leaderIdx = this.members.findIndex((member) => member.isLeader)
    if (leaderIdx > -1) {
      this.members.unshift(this.members.splice(leaderIdx, 1))
    }
  },
}
</script>
<style lang=""></style>
