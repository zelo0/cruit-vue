<template lang="">
  <div class="ver-gap2-grid">
    <div class="flex justify-between font-bold leading-7">
      <div class="flex gap-4">
        <h2>
          <slot></slot>
        </h2>
        <BreadCrumb />
        <!-- 상태 -->
        <div v-if="part.status == 'RECRUITING'" class="text-blue-500">
          모집 중
        </div>
        <div v-else class="text-gray-400">모집 완료</div>
      </div>
      <!-- 변경 버튼 (프로젝트 제안자 또는 파트 리더에게만 보이기) -->
      <button
        v-if="
          proposerName == myName ||
          (part.partMembers.length &&
            part.partMembers[0].isLeader &&
            part.partMembers[0].name == myName)
        "
        class="small-btn"
        @click="moveToModify"
      >
        수정
      </button>
    </div>

    <div>
      <h3>스택</h3>
      <div v-if="part.stacks.length">
        <PillBtn
          :name="item.name"
          :img="item.image"
          v-for="(item, index) in part.stacks"
          :key="index"
        />
      </div>
      <p class="font-semibold text-gray-300" v-else>미정</p>
    </div>

    <div>
      <h3>프로젝트 멤버</h3>
      <div v-if="part.partMembers.length">
        <div
          class="relative inline-flex"
          v-for="(member, index) in part.partMembers"
          :key="index"
        >
          <NuxtLink :to="{ path: `/users/${member.id}` }">
            <span
              v-if="member.isLeader"
              class="absolute -top-1 -left-2 bg-opacity-50 bg-red-400 text-white font-semibold text-xs p-0.5 rounded-full"
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
import { mapState } from 'vuex'

export default {
  props: ['part', 'proposerName'],
  created() {
    /* leader를 part에서 맨 앞으로 옮기기 */
    const leaderIdx = this.part.partMembers.findIndex(
      (member) => member.isLeader
    )
    if (leaderIdx > -1) {
      const removedArr = this.part.partMembers.splice(leaderIdx, 1)
      this.part.partMembers.unshift(removedArr[0])
    }
  },
  computed: {
    ...mapState({
      myName: (state) => state.myName,
    }),
  },
  methods: {
    moveToModify() {
      this.$router.push(`/parts/modify/${this.part.id}`)
    },
  },
}
</script>
<style lang=""></style>
