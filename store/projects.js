export const state = () => ({
  stackFilters: [],
  projects: [],
  hasError: false,
})

// export const getters = {
//   projects(state) {
//     return state.projects
//   },
// }

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
}

export const actions = {
  async getProjectsByFilter({ commit, state }) {
    await this.$axios
      .$get(`/projects?q=${state.stackFilters.join(';')}`)
      .then((res) => {
        commit('setProjects', res.data)
      })
      .catch((err) => {
        commit('setHasError', true)
      })
  },
  async getProjectsByNoFilter({ commit }) {
    await this.$axios
      .$get('/projects')
      .then((res) => {
        commit('setProjects', res.data)
      })
      .catch((err) => {
        commit('setHasError', true)
      })
  },
}
