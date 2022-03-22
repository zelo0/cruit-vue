<template lang="">
  <div class="ver-gap8-grid">
    <!-- 받은 제안 -->
    <div>
      <h2>받은 제안</h2>
      <div class="ver-gap5-grid" v-if="receivedProposals.length">
        <div
          class="border-2 rounded-md p-5"
          v-for="(proposal, index) in receivedProposals"
          :key="proposal.id"
        >
          <section class="">
            <div>
              <!-- 프로젝트에 참여하고 싶다는 제안이면 -->
              <div
                v-if="proposal.type == 'TOP'"
                class="flex justify-between items-center"
              >
                <!-- 유저 정보 -->
                <NuxtLink :to="{ path: `/users/${proposal.user.id}` }">
                  <div class="flex items-center">
                    <Avatar :url="proposal.user.profile" />
                    <span class="align-middle">{{ proposal.user.name }}</span>
                  </div>
                </NuxtLink>
                <!-- 화살표 -->
                <div>
                  <unicon name="arrow-right" />
                </div>
                <!-- 프로젝트 -->
                <div>
                  <NuxtLink :to="{ path: `/projects/${proposal.projectId}` }">
                    {{ proposal.projectName }}
                  </NuxtLink>
                </div>
              </div>

              <!-- 나에게 프로젝트 참여하라고 보낸 제안이면 -->
              <div v-else class="flex justify-between items-center">
                <!-- 프로젝트 -->
                <div>
                  <NuxtLink :to="{ path: `/projects/${proposal.projectId}` }">
                    {{ proposal.projectName }}
                  </NuxtLink>
                </div>
                <!-- 화살표 -->
                <div>
                  <unicon name="arrow-right" />
                </div>
                <!-- 유저 정보 -->
                <div class="flex">
                  <span>나</span>
                </div>
              </div>
            </div>

            <!-- 포지션 -->
            <div>{{ proposal.position }}</div>
            <!-- 리더 제안인지 -->
            <div>
              <div v-if="proposal.isLeaderProposal" class="text-red-400">
                리더 제안
              </div>
              <div v-else>일반 멤버 제안</div>
            </div>
            <!-- waiting 상태인 제안만 수락, 거절 선택 가능 -->
            <div
              v-if="proposal.status == 'WAITING'"
              class="flex justify-between p-5 gap-8"
            >
              <button class="myBtn w-full" @click="acceptProposal(proposal)">
                수락
              </button>
              <button class="red-btn w-full" @click="denyProposal(proposal)">
                거절
              </button>
            </div>

            <div v-else-if="proposal.status == 'ACCEPTED'">
              <h3>수락했습니다</h3>
            </div>

            <div v-else-if="proposal.status == 'REFUSED'">
              <h3>거절했습니다</h3>
            </div>
          </section>
        </div>
      </div>

      <!-- 받은 제안이 없으면 -->
      <div v-else>
        <h3>아직 받은 제안이 없습니다</h3>
      </div>
    </div>

    <!-- 보낸 제안 -->
    <div>
      <h2>보낸 제안</h2>
      <div class="ver-gap5-grid" v-if="sentProposals">
        <section
          class="border-2 rounded-md p-5"
          v-for="(proposal, index) in sentProposals"
          :key="proposal.id"
        >
          <div>
            <!-- 내가 프로젝트에 참여하고자 보낸 제안이면 -->
            <div
              v-if="proposal.type == 'TOP'"
              class="flex justify-between items-center"
            >
              <!-- 유저 정보 -->
              <div class="flex">
                <span>나</span>
              </div>
              <!-- 화살표 -->
              <div>
                <unicon name="arrow-right" />
              </div>
              <!-- 프로젝트 -->
              <div>
                <NuxtLink :to="{ path: `/projects/${proposal.projectId}` }">
                  {{ proposal.projectName }}
                </NuxtLink>
              </div>
            </div>

            <!-- 내가 유저에게 프로젝트 함꼐 하겠냐고 보낸 제안이면 -->
            <div v-else class="flex justify-between items-center">
              <!-- 프로젝트 -->
              <div>
                <NuxtLink :to="{ path: `/projects/${proposal.projectId}` }">
                  {{ proposal.projectName }}
                </NuxtLink>
              </div>
              <!-- 화살표 -->
              <div>
                <unicon name="arrow-right" />
              </div>
              <!-- 유저 정보 -->
              <NuxtLink :to="{ path: `/users/${proposal.user.id}` }">
                <div class="flex items-center">
                  <Avatar :url="proposal.user.profile" />
                  <span class="align-middle">{{ proposal.user.name }}</span>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- 포지션 -->
          <div>{{ proposal.position }}</div>
          <!-- 리더 제안인지 -->
          <div>
            <div v-if="proposal.isLeaderProposal" class="text-red-400">
              리더 제안
            </div>
            <div v-else>일반 멤버 제안</div>
          </div>
          <!-- 보낸 제안이 어떻게 처리됐는지 표시 -->
          <div>
            <span class="text-gray-300" v-if="proposal.status == 'WAITING'"
              >대답을 기다리는 중입니다</span
            >

            <span
              class="text-blue-300"
              v-else-if="proposal.status == 'ACCEPTED'"
              >수락되었습니다</span
            >
            <span class="text-red-300" v-else>거절되었습니다</span>
          </div>
        </section>
      </div>

      <!-- 보낸 제안이 없으면 -->
      <div v-else>
        <h3>아직 보낸 제안이 없습니다</h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sentProposals: [],
      receivedProposals: [],
    }
  },
  methods: {
    async acceptProposal(proposal) {
      await this.$axios
        .$patch(`/proposals/approved/${proposal.id}`)
        .then((res) => {
          alert('제안을 수락했습니다')
          proposal.status = 'ACCEPTED'
        })
        .catch((err) => {
          // console.log(err.response.data.message)
        })
    },
    async denyProposal(proposal) {
      await this.$axios
        .$patch(`/proposals/refused/${proposal.id}`)
        .then((res) => {
          alert('제안을 거절했습니다')
          proposal.status = 'REFUSED'
        })
        .catch((err) => {
          // console.log(err.response.data.message)
        })
    },
  },
  async fetch() {
    await this.$axios
      .$get('/proposals/me')
      .then((res) => {
        this.sentProposals = res.data.sentProposals
        this.receivedProposals = res.data.receivedProposals
      })
      .catch((err) => {
        // console.log(err)
      })
  },
}
</script>
<style lang=""></style>
