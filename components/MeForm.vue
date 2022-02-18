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
      <lable class="boldAndSpace" for="position">포지션</lable>
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
        value="true"
      />
      <label for="true">예</label>
      <input
        type="radio"
        :checked="!me.canBeLeader"
        name="canBeLeader"
        id="canBeLeader"
        value="false"
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
          :key="index"
        />
      </div>
      <button class="myBtn" @click="changeCanBeLeader">변경</button>
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
      <butto class="myBtn" @click="changeIntroduction">변경</butto>
    </div>
    <hr />

    <div>
      <label class="boldAndSpace" for="github">github 주소</label>
      <input id="github" type="text" v-model="me.github" />
      <butto class="myBtn" n @click="changeGithub">변경</butto>
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
export default {
  data() {
    return {
      me: {
        email: '',
        name: '',
        position: '',
        canBeLeader: false,
        userStacks: [],
        selectableStacks: [],
        introduction: '',
        github: '',
        profile: '',
        links: [],
      },
      editable: {
        nickname: false,
      },
    }
  },
  methods: {},
  async fetch() {
    await this.$axios
      .$get('users/me')
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
<style lang="css"></style>
