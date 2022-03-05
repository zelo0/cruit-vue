export const state = () => ({
  stackFilters: [],
  leaderFilter: 'all',
  users: [],
  hasError: false,
  hasPrevious: false,
  hasNext: false,
  totalPage: 0,
  currentPage: 0,
})

export const mutations = {
  addStackFilter(state, text) {
    state.stackFilters.push(text)
  },
  removeStackFilter(state, text) {
    state.stackFilters.splice(state.stackFilters.indexOf(text), 1)
  },
  setUsers(state, users) {
    state.users = users
  },
  setHasError(state, hasError) {
    state.hasError = hasError
  },
  setHasPrevious(state, hasPrevious) {
    state.hasPrevious = hasPrevious
  },
  setHasNext(state, hasNext) {
    state.hasNext = hasNext
  },
  setTotalPage(state, totalPage) {
    state.totalPage = totalPage
  },
  setCurrentPage(state, currentPage) {
    state.currentPage = currentPage
  },
  increaseCurrentPage(state) {
    state.currentPage += 1
  },
  decreaseCurrentPage(state) {
    state.currentPage -= 1
  },
  setLeaderFilter(state, val) {
    state.leaderFilter = val
  },
}

export const actions = {
  async getUsersByFilter({ commit, state }) {
    await this.$axios
      .$get(
        `/users?q=${state.stackFilters.join(';')}&page=${
          state.currentPage
        }&leader=${state.leaderFilter}`
      )
      .then((res) => {
        commit('setUsers', res.data)
        commit('setHasPrevious', res.hasPrevious)
        commit('setHasNext', res.hasNext)
        commit('setTotalPage', res.totalPage)
        commit('setCurrentPage', res.currentPage)
        commit('setHasError', false)
      })
      .catch((err) => {
        commit('setHasError', true)
      })
  },
}
