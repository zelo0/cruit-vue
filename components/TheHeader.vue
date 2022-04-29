<template lang="">
  <div
    class="bg-red-50 dark:bg-night-300 flex justify-between py-2 px-5 border-gray-300 shadow"
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
            <UserIcon class="dark:text-white text-black" />
          </nuxt-link>
        </div>

        <!-- 알림 -->
        <div
          class="relative cursor-pointer"
          @click="isShowingNotification = !isShowingNotification"
        >
          <!-- 알림 아이콘 -->
          <BellIcon class="dark:text-white text-black" />
          <!-- 알림 개수 -->
          <div
            class="absolute -right-2 -top-2 rounded-full bg-yellow-100 dark:bg-purple-400 px-1"
          >
            {{ notificationCount }}
          </div>
        </div>

        <!-- 프로젝트 바로가기 -->
        <div>
          <NuxtLink to="/projects/me">
            <DocumentTextIcon class="dark:text-white text-black" />
          </NuxtLink>
        </div>

        <!-- 로그아웃 버튼 -->
        <span class="cursor-pointer" @click="logout">로그아웃</span>
      </div>

      <!-- 알림판 -->
      <TransitionSlideUpDown>
        <div
          v-show="isShowingNotification"
          class="absolute z-40 top-9 right-7 border-2 border-black bg-white dark:bg-night-100 dark:text-white rounded-md font-normal w-1/2 drop-shadow-xl max-h-80 overflow-y-auto"
        >
          <!-- 알림 영역 -->
          <div class="">
            <div v-if="notifications.length">
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
            <div v-else class="p-10 text-center">읽지 않은 알림이 없습니다</div>
          </div>
          <!-- 전체 보기 버튼 -->
          <div class="">
            <NuxtLink to="/proposals/me">
              <div
                class="sticky bg-gray-100 dark:text-white dark:bg-night-300 bottom-0 w-full cursor-pointer p-1 text-center"
              >
                전체 보기
              </div>
            </NuxtLink>
          </div>
        </div>
      </TransitionSlideUpDown>
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
import { DocumentTextIcon, UserIcon, BellIcon } from '@vue-hero-icons/solid'

export default {
  components: {
    DocumentTextIcon,
    UserIcon,
    BellIcon,
  },
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
