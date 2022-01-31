export const state = () => ({
  stackFilters: [],
})

export const mutations = {
  addStackFilter(state, text) {
    state.stackFilters.push(text)
  },
  removeStackFilter(state, text) {
    state.stackFilters.splice(state.stackFilters.indexOf(text), 1)
  },
}
