<template lang="">
<div>
  <div class="ver-gap5-grid">
    <h1>프로젝트 파트 수정</h1>
    <!-- 상태 변경 -->
    <div class="ver-gap2-grid">
      <div class="boldAndSpace">상태</div>
      <label for="togleButton" class="cursor-pointer">
        <div class="flex gap-3 items-center">
          <span class="cursor-pointer"> 모집 완료 </span>

          <!-- toggle -->
          <div class="relative">
            <input
              id="togleButton"
              type="checkbox"
              class="hidden"
              @change="changeStatus"
              v-model="part.status"
              true-value="RECRUITING"
              false-value="COMPLETED"
            />
            <!-- path -->
            <div
              class="toggle-path bg-gray-200 w-9 h-5 rounded-full shadow-inner"
            ></div>
            <!-- crcle -->
            <div
              class="toggle-circle absolute w-3.5 h-3.5 bg-white rounded-full shadow inset-y-0 left-0 transition-all duration-300 ease-in-out"
            ></div>
          </div>

          <span class="cursor-pointer"> 모집 중 </span>
        </div>
      </label>
    </div>
    <hr>

    <!-- 기술 스택 변경 -->
    <div>
      <div class="boldAndSpace">기술 스택</div>
      <div class="stack-grid">
        <SelectableStackItem
          v-for="(stack, index) in part.selectableStacks"
          :key="stack.id"
          :data="stack"
          :iniSelected="isIncluded(stack)"
          @onSelectStackItem="addStackItem"
          @onUnselectStackItem="removeStackItem"
        ></SelectableStackItem>
      </div>
      <div class="text-right">
        <button class="myBtn inline-block" @click="changeStacks">변경</button>
      </div>
    </div>
    <hr>


    <!-- 파트 멤버 변경 -->
    <div class="ver-gap2-grid">
      <div class="boldAndSpace">파트 멤버</div>
      
      <!-- 파트에 멤버가 있을 때 -->
      <div v-if="part.members.length">
        <div
          class="flex justify-between items-center"
          v-for="(member, index) in part.members"
          :key="index"
        >
          <!-- 멤버 -->
          <PillBtn :name="member.name" :img="member.profile" />
          <!-- 삭제 버튼 (본인은 삭제 불가) -->
          <div
            v-if="member.name != myName"
            class="cursor-pointer"
            @click="onClickRemoveMember(member)"
          >
            <client-only>
              <unicon name="times"></unicon>
            </client-only>
          </div>
        </div>
      </div>

      <!-- 파트에 멤버가 없을 때 -->
      <div v-else>
        <h3>아직 멤버가 없어요</h3>
      </div>
    </div>

    <hr />

    <NuxtLink to="/users" class="flex justify-between">
      <h2>지금 바로 함께 할 멤버를 찾아보세요</h2>
      <client-only>
        <unicon name="angle-right-b" />
      </client-only>
    </NuxtLink>
  </div>

  <Dialog ref="dialog" @answeredYes="removeMember" @answeredNo="hideDialog">
    <template #message>
      <h2>
      <span class="text-blue-500">{{removingMember.name}}</span>을 해당 파트에서 방출시키겠습니까?
      </h2>
    </template>
  </Dialog>
</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      myName: (state) => state.myName,
    }),
  },
  data() {
    return {
      part: {
        id: '',
        position: '',
        status: '',
        selectableStacks: [],
        usingStacks: [],
        members: [],
      },
      removingMember: {
        name: ''
      },
    }
  },
  methods: {
    isIncluded(item) {
      return this.part.usingStacks.some((stack) => stack.name == item.name)
    },
    addStackItem(stack) {
      this.part.usingStacks.push(stack)
    },
    removeStackItem(stack) {
      this.part.usingStacks.splice(this.part.usingStacks.indexOf(stack), 1)
    },
    onClickRemoveMember(member) {
      this.removingMember = member
      this.$refs.dialog.show()
    },
    hideDialog() {
      this.$refs.dialog.hide()
    },
    async changeStacks() {
      await this.$axios
        .$patch(`/parts/${this.$route.params.id}/stacks`, {
          stacks: this.part.usingStacks,
        })
        .then((res) => {
          alert('변경됐습니다')
        })
        .catch((err) => {
          // console.log(err)
        })
    },
    async removeMember() {
      await this.$axios
        .$delete(`/parts/${this.$route.params.id}/members/${this.removingMember.id}`)
        .then((res) => {
          this.hideDialog()
          this.part.members.splice(this.part.members.indexOf(this.removingMember), 1)
          alert('제거됐습니다')
        })
        .catch((err) => {
          // console.log(err)
        })
    },
    async changeStatus() {
      await this.$axios
        .$patch(`/parts/${this.$route.params.id}/status`, {
          status: this.part.status,
        })
        .then((res) => {
          alert('변경됐습니다')
        })
        .catch((err) => {
          // console.log(err)
        })
    },
  },
  async fetch() {
    await this.$axios
      .$get(`/parts/${this.$route.params.id}`)
      .then((res) => {
        this.part = res.data
      })
      .catch((err) => {
        // console.log(err)
      })
  },
}
</script>
<style lang=""></style>
