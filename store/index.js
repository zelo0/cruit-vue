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
        // 로그인 안 돼 있으면 빈 문자열을 받음
        commit('setMyName', res.data.name)
      })
      .catch((err) => {
        console.log('에러 발생')
      })
  },
}
