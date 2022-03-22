export const state = () => ({
  myName: '',
  myPosition: '',
  notificationCount: 0,
  notifications: [],
})

export const getters = {
  authenticated(state) {
    return !!state.myName
  },
}

export const mutations = {
  setMyName(state, name) {
    state.myName = name
  },
  setMyPosition(state, position) {
    state.myPosition = position
  },
  setNotificationCount(state, count) {
    state.notificationCount = count
  },
  setNotifications(state, notifications) {
    state.notifications = notifications
  },
}

export const actions = {
  async getMyHead({ commit }) {
    await this.$axios
      .$get('/users/me/head')
      .then((res) => {
        // 로그인 안 돼 있으면 빈 문자열을 받음
        commit('setMyName', res.data.name)
        commit('setMyPosition', res.data.position)
        commit('setNotificationCount', res.data.notificationCount)
        commit('setNotifications', res.data.notifications)
      })
      .catch((err) => {
        commit('setMyName', '')
        commit('setMyPosition', '')
        // console.log(err)
      })
  },
}
