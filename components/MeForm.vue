<template lang="">
  <div class="gap-5 grid grid-flow-row">
    <div>
      <span class="boldAndSpace">이메일</span>
      <span>{{ me.email }}</span>
    </div>
    <hr />

    <div>
      <label class="boldAndSpace" for="name">닉네임</label>
      <input id="name" type="text" v-model="me.name" />
      <button class="myBtn" @click="changeName">변경</button>
    </div>
    <hr />

    <div>
      <label class="boldAndSpace" for="position">포지션</label>
      <select id="position" v-model="me.position">
        <option value="FRONTEND">프론트엔드</option>
        <option value="BACKEND">백엔드</option>
        <option value="DESIGN">디자인</option>
      </select>
      <button class="myBtn" @click="changePosition">변경</button>
    </div>
    <hr />

    <div>
      <div class="boldAndSpace" for="canBeLeader">리더 가능 여부</div>
      <input
        type="radio"
        :checked="me.canBeLeader"
        name="canBeLeader"
        id="canBeLeader"
        v-model="me.canBeLeader"
      />
      <label for="true">예</label>
      <input
        type="radio"
        :checked="!me.canBeLeader"
        name="canBeLeader"
        id="canBeLeader"
        v-model="me.canBeLeader"
      />
      <label for="true">아니오</label>

      <button class="myBtn" @click="changeCanBeLeader">변경</button>
    </div>
    <hr />

    <div>
      <div class="boldAndSpace">사용 가능 스택</div>
      <div class="grid gap-5 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 my-3">
        <StackItem
          :data="item"
          v-for="(item, index) in me.selectableStacks"
          :key="item.name"
          :iniSelected="isIncluded(item)"
          @onSelectStackItem="addStackItem"
          @onUnselectStackItem="removeStackItem"
        />
      </div>
      <button class="myBtn" @click="changeStacks">변경</button>
    </div>
    <hr />

    <div>
      <label class="boldAndSpace" for="introducton">소개글</label>
      <textarea
        name="introduction"
        id="introduction"
        cols="30"
        rows="10"
        v-model="me.introduction"
      ></textarea>
      <button class="myBtn" @click="changeIntroduction">변경</button>
    </div>
    <hr />

    <div>
      <label class="boldAndSpace" for="github">github 주소</label>
      <input id="github" type="text" v-model="me.github" />
      <button class="myBtn" n @click="changeGithub">변경</button>
    </div>
    <hr />

    <!-- <div>링크</div> -->
    <div class="boldAndSpace">나에 대한 평가</div>
    <hr />

    <div class="boldAndSpace">참여했던 파트</div>
    <hr />

    <div class="boldAndSpace">내가 쓴 질문</div>
    <hr />
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      me: {
        email: '',
        name: '',
        position: '',
        canBeLeader: false,
        availableStacks: [],
        selectableStacks: [],
        introduction: '',
        github: '',
        profile: '',
        links: [],
      },
    }
  },
  watch: {
    // me.position이 바뀌면 vue에서 관리하던 기존 스택의 availableStacks 비우기
    'me.position': function (newVal, oldVal) {
      if (oldVal != '' && oldVal != newVal) {
        this.me.availableStacks = []
      }
    },
  },
  methods: {
    ...mapMutations({
      setMyName: 'setMyName',
    }),
    addStackItem(stack) {
      this.me.availableStacks.push(stack)
    },
    removeStackItem(stack) {
      this.me.availableStacks.splice(this.me.availableStacks.indexOf(stack), 1)
    },
    isIncluded(item) {
      return this.me.availableStacks.some((stack) => stack.name == item.name)
    },

    async changeName() {
      await this.$axios
        .$patch('/users/me/name', { name: this.me.name })
        .then((res) => {
          this.me.name = res.data.name
          this.setMyName(this.me.name)
        })
        .catch((err) => {
          console.error('에러')
          console.log(err)
        })
    },
    async changePosition() {
      await this.$axios
        .$patch('/users/me/position', { position: this.me.position })
        .then((res) => {
          this.me.posiiton = res.data.posiiton
          this.me.selectableStacks = res.data.selectableStacks
        })
        .catch((err) => {
          console.error('에러')
          console.log(err)
        })
    },
    async changeCanBeLeader() {
      await this.$axios
        .$patch('/users/me/canBeLeader', { canBeLeaer: this.me.canBeLeaer })
        .then((res) => {
          this.me.canBeLeaer = res.data.canBeLeaer
        })
        .catch((err) => {
          console.error('에러')
          console.log(err)
        })
    },
    async changeStacks() {
      await this.$axios
        .$patch('/users/me/stacks', { stacks: this.me.availableStacks })
        .then((res) => {
          this.me.availableStacks = res.data.availableStacks
        })
        .catch((err) => {
          console.error('에러')
          console.log(err)
        })
    },
    async changeIntroduction() {
      await this.$axios
        .$patch('/users/me/introduction', {
          introduction: this.me.introduction,
        })
        .then((res) => {
          this.me.introduction = res.data.introduction
        })
        .catch((err) => {
          console.error('에러')
          console.log(err)
        })
    },
    async changeGithub() {
      await this.$axios
        .$patch('/users/me/github', { github: this.me.github })
        .then((res) => {
          this.me.github = res.data.github
        })
        .catch((err) => {
          console.error('에러')
          console.log(err)
        })
    },
  },
  async fetch() {
    await this.$axios
      .$get('/users/me')
      .then((res) => {
        this.me = res.data
      })
      .catch((err) => {
        if (err.response.status == 401) {
          this.$router.push('/login')
          alert('로그인이 필요합니다')
        }
      })
  },
}
</script>
<style lang="css">
.bg_blue {
  background-color: #dbeafe;
}
</style>
