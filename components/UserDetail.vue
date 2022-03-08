<template lang="">
  <div>
    <div v-if="user" class="ver-gap5-grid">
      <!-- 프로필 이미지, 이름 -->
      <div class="place-self-center">
        <img
          :src="user.profile"
          alt="유저 프로필 이미지"
          class="rounded-full w-40 h-40 object-cover shadow-xl"
        />
        <h2 class="mt-3">{{ user.name }}</h2>
      </div>
      <hr />

      <!-- 포지션 -->
      <div>
        <h2>포지션</h2>
        <p>{{ user.position }}</p>
      </div>
      <hr />

      <!-- 리더 가능 여부 -->
      <div>
        <h2>리더 가능 여부</h2>
        <p v-if="user.canBeLeader">리드 할 수 있어요</p>
        <p v-else-if="user.canBeLeader == false">리드하기는 어려워요</p>
        <p v-else>아직 리더 가능 여부를 정하지 않았어요</p>
      </div>
      <hr />

      <!-- 기술 스택 -->
      <div>
        <h2>기술 스택</h2>
        <div v-if="user.stackList.length">
          <PillBtn
            v-for="(stack, index) in user.stackList"
            :key="index"
            :name="stack.name"
            :img="stack.image"
          />
        </div>

        <div v-else><p>아직 사용할 수 있는 기술 스택이 없어요</p></div>
      </div>
      <hr />

      <!-- 깃허브 링크 -->
      <div>
        <h2>Github 링크</h2>
        <a
          v-if="user.github"
          :href="user.github"
          target="_blank"
          class="text-blue-400"
          >{{ user.github }}</a
        >
        <p v-else>None</p>
      </div>
      <hr />

      <!-- 기타 링크 -->
      <div v-if="user.linkList.length">
        <h2>기타 링크</h2>
        <div>
          <!-- 컴포넌트로 대체 -->
          <div v-for="(link, index) in user.linkList" :key="index"></div>
        </div>
      </div>
      <hr v-if="user.linkList.length" />

      <!-- 소개 -->
      <div>
        <h2>소개</h2>
        <p>
          {{
            user.introduction
              ? user.introduction
              : '아직 소개를 작성하지 않았어요'
          }}
        </p>
      </div>
      <hr />

      <!-- 참여 중인 프로젝트 -->
      <div>
        <h2>참여한 프로젝트</h2>
        <div v-if="user.projectList.length">
          <ul v-for="(project, index) in user.projectList" :key="index">
            <li>
              <NuxtLink
                :to="{ name: 'projects-id', params: { id: project.id } }"
                >{{ project.name }}</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div v-else>
          <p>아직 참여한 프로젝트가 없어요</p>
        </div>
      </div>
      <hr />

      <!-- 프로젝트 제안 버튼 -->
      <div>
        <button class="w-full-btn animate-bounce" @click="onclick">
          <h2>프로젝트 제안 보내기</h2>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    }
  },
  methods: {
    onclick() {
      this.$router.push(`/proposals/${this.user.name}`)
    },
  },
  async fetch() {
    await this.$axios
      .$get(`/users/${this.$route.params.id}`)
      .then((res) => {
        this.user = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>
<style lang=""></style>
