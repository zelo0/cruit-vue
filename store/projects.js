export const state = () => ({
  stackFilters: [],
  projects: [],
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
  setProjects(state, projects) {
    state.projects = projects
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
}

export const actions = {
  async getProjectsByFilter({ commit, state }) {
    await this.$axios
      .$get(
        `/projects?q=${state.stackFilters.join(';')}&page=${state.currentPage}`
      )
      .then((res) => {
        commit('setProjects', res.data)
        commit('setHasPrevious', res.hasPrevious)
        commit('setHasNext', res.hasNext)
        commit('setTotalPage', res.totalPage)
        commit('setCurrentPage', res.currentPage)
        commit('setHasError', false)
      })
      .catch((err) => {
        commit('setHasError', true)
        console.log(err)
      })
  },
  // async getProjectsByNoFilter({ commit, state }) {
  //   await this.$axios
  //     .$get(`/projects?page=${state.currentPage}`)
  //     .then((res) => {
  //       commit('setProjects', res.data)
  //       commit('setHasPrevious', res.hasPrevious)
  //       commit('setHasNext', res.hasNext)
  //       commit('setTotalPage', res.totalPage)
  //       commit('setCurrentPage', res.currentPage)
  //     })
  //     .catch((err) => {
  //       commit('setHasError', true)
  //     })
  // },
}
