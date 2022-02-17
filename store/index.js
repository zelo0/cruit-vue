export const state = () => ({
  myName: '',
})

export const mutations = {
  setMyName(state, name) {
    state.myName = name
  },
}

export const actions = {
  async getMyName({ commit }) {
    await this.$axios
      .$get('/users/me/nickname')
      .then((res) => {
        commit('setMyName', res.data.nickname)
      })
      .catch((err) => {})
  },
}
