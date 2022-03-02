<template lang="">
  <div class="ver-gap2-grid">
    <div class="flex gap-4 font-bold leading-7">
      <h2>
        <slot></slot>
      </h2>
      <BreadCrumb />
      <div v-if="status == 'RECRUITING'" class="text-blue-500 ring-blue-200">
        모집 중
      </div>
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
        <PillBtn
          :name="item.name"
          :img="item.profile"
          v-for="(item, index) in members"
          :key="index"
        />
      </div>
      <p class="font-semibold text-gray-300" v-else>미정</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['status', 'stacks', 'members'],
}
</script>
<style lang=""></style>
