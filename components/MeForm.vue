<template lang="">
  <div class="ver-gap5-grid">
    <div>
      <form method="post" @submit.prevent="changeProfile">
        <label class="boldAndSpace" for="profile">프로필 이미지</label>
        <img
          v-show="me.profile"
          :src="me.profile"
          alt="내 프로필 이미지"
          class="big-profile my-3"
        />
        <input id="profile" type="file" accept="image/*" ref="selectedFile" />
        <button class="myBtn">변경</button>
      </form>
    </div>
    <hr />

    <div>
      <div class="boldAndSpace">이메일</div>
      <span>{{ me.email }}</span>
    </div>
    <hr />

    <div>
      <div class="boldAndSpace">닉네임</div>
      <input id="name" type="text" v-model="me.name" class="w-1/2" />
      <button class="myBtn" @click="changeName">변경</button>
    </div>
    <hr />

    <div>
      <div class="boldAndSpace">포지션</div>
      <select id="position" v-model="me.position" class="w-1/2">
        <option value="FRONTEND">프론트엔드</option>
        <option value="BACKEND">백엔드</option>
        <option value="DESIGN">디자인</option>
      </select>
      <button class="myBtn" @click="changePosition">변경</button>
    </div>
    <hr />

    <div>
      <div class="boldAndSpace">리더 가능 여부</div>
      <input
        type="radio"
        :checked="me.canBeLeader"
        value="true"
        id="true"
        v-model="me.canBeLeader"
      />
      <label for="true">예</label>
      <input
        type="radio"
        :checked="!me.canBeLeader"
        value="false"
        id="false"
        v-model="me.canBeLeader"
      />
      <label for="false">아니오</label>

      <button class="myBtn" @click="changeCanBeLeader">변경</button>
    </div>
    <hr />

    <div>
      <div class="boldAndSpace">사용 가능 스택</div>
      <div class="stack-grid">
        <SelectableStackItem
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
      <div class="boldAndSpace">소개글</div>
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
      <div class="boldAndSpace">github 주소</div>
      <input id="github" type="text" v-model="me.github" class="w-1/2" />
      <button class="myBtn" n @click="changeGithub">변경</button>
    </div>
    <hr />

    <!-- <div>링크</div> -->

    <!-- <div class="boldAndSpace">나에 대한 평가</div>
    <hr /> -->
    <!-- 
    <div class="boldAndSpace flex justify-between">
      <span>참여한 프로젝트</span>
      <client-only>
        <unicon name="angle-right-b" />
      </client-only>
    </div>
    <hr />

    <div class="boldAndSpace flex justify-between">
      <span>내가 보낸 제안</span>
      <client-only>
        <unicon name="angle-right-b" />
      </client-only>
    </div>
    <hr />

    <div class="boldAndSpace flex justify-between">
      <span>내가 받은 제안</span>
      <client-only>
        <unicon name="angle-right-b" />
      </client-only>
    </div>
    <hr />

    <div class="boldAndSpace flex justify-between">
      <span>내가 쓴 질문</span>
      <client-only>
        <unicon name="angle-right-b" />
      </client-only>
    </div>
    <hr /> -->
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
        profile: '',
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
    async changeProfile() {
      const form = new FormData()
      form.append('file', this.$refs.selectedFile.files[0])
      await this.$axios
        .$patch('/users/me/profile', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          this.me.profile = res.data.profile
        })
        .catch((err) => {
          // console.log('파일 업로드 실패')
        })
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
          // console.log(err)
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
          // console.log(err)
        })
    },
    async changeCanBeLeader() {
      await this.$axios
        .$patch('/users/me/canBeLeader', { canBeLeader: this.me.canBeLeader })
        .then((res) => {
          this.me.canBeLeader = res.data.canBeLeader
        })
        .catch((err) => {
          console.error('에러')
          // console.log(err)
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
          // console.log(err)
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
          // console.log(err)
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
          // console.log(err)
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
          this.$router.push('/auth/login')
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
