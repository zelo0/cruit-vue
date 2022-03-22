<template lang="">
  <div
    class="bg-red-50 flex justify-between py-2 px-5 border-b-2 border-gray-300 shadow"
  >
    <nuxt-link to="/" class="basis-1/4 mr-2"><h2>CRUIT</h2></nuxt-link>

    <!-- <div
      class="ring-1 ring-red-500 ring-offset-1 ring-offset-red-100 flex-initial w-1/2"
    >
      검색
    </div> -->

    <div>
      <!-- 로그인 했을 시 -->
      <div class="flex gap-5 font-bold" v-show="myName">
        <!-- 내 정보로 가는 링크 -->
        <div>
          <!-- <nuxt-link to="/users/me">{{ myName }}</nuxt-link> -->
          <!-- 유저 아이콘 보여주기 -->
          <nuxt-link to="/users/me">
            <client-only>
              <unicon name="user-circle"></unicon>
            </client-only>
          </nuxt-link>
        </div>

        <!-- 알림 -->
        <div
          class="relative"
          @click="isShowingNotification = !isShowingNotification"
        >
          <!-- 알림 아이콘 -->
          <client-only>
            <unicon name="bell" fill="black"></unicon>
          </client-only>
          <!-- 알림 개수 -->
          <div class="absolute -right-2 -top-2 rounded-full bg-yellow-100 px-1">
            {{ notificationCount }}
          </div>

          <!-- 알림판 -->
          <TransitionSlideUpDown>
            <div
              v-show="isShowingNotification"
              class="absolute z-40 top-7 right-2 border-2 border-black bg-white rounded-md font-normal w-60 drop-shadow-xl h-80 overflow-y-auto"
            >
              <!-- 알림 영역 -->
              <div>
                <div
                  v-for="(notification, index) in notifications"
                  :key="index"
                  class="border-b-2 p-2 cursor-pointer"
                  @click="setToRead(notification)"
                >
                  <NuxtLink
                    :to="{
                      path:
                        notification.type == 'question'
                          ? `/projects/${notification.relatedId}`
                          : '/proposals/me',
                    }"
                  >
                    <span>
                      {{ notification.message }}
                    </span>
                  </NuxtLink>
                </div>
              </div>
              <!-- 전체 보기 버튼 -->
              <div>
                <NuxtLink to="/proposals/me">
                  <div
                    class="bg-gray-100 absolute bottom-0 w-full cursor-pointer p-1 text-center"
                  >
                    전체 보기
                  </div>
                </NuxtLink>
              </div>
            </div>
          </TransitionSlideUpDown>
        </div>

        <!-- 프로젝트 바로가기 -->
        <div>
          <NuxtLink to="/projects/me">
            <client-only>
              <unicon name="file-alt" />
            </client-only>
          </NuxtLink>
        </div>

        <!-- 로그아웃 버튼 -->
        <span class="cursor-pointer" @click="logout">로그아웃</span>
      </div>

      <!-- 로그인 전 -->
      <div class="flex gap-5" v-show="!myName">
        <nuxt-link to="/auth/login" class="font-bold">로그인</nuxt-link>
        <nuxt-link to="/auth/join" class="font-bold">회원가입</nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      isShowingNotification: false,
    }
  },
  computed: {
    ...mapState({
      myName: (state) => state.myName,
      notificationCount: (state) => state.notificationCount,
      notifications: (state) => state.notifications,
    }),
  },
  methods: {
    ...mapMutations({
      setMyName: 'setMyName',
    }),
    async logout() {
      await this.$axios
        .post('/logout')
        .then((res) => {
          this.setMyName('')
          this.$router.push('/')
        })
        .catch((err) => {
          // console.log(err)
        })
    },
    async setToRead(notification) {
      await this.$axios
        .$patch(`/notifications/read/${notification.id}`)
        .then((res) => {
          if (notification.type == 'question') {
            this.$router.push(`/projects/${notification.relatedId}`)
          } else if (notification.type == 'proposal') {
            this.$router.push(`/proposals/me`)
          }
        })
        .catch((err) => {
          // console.log(err)
        })
    },
  },
}
</script>
<style lang=""></style>
