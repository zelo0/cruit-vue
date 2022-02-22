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
      .$get('/users/me/name')
      .then((res) => {
        commit('setMyName', res.data.name)
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
