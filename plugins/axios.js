export default function ({ $axios, redirect, store, route }) {
  $axios.onError((error) => {
    if (error.response.status === 401) {
      // 첫 화면에서 세션 만료인 경우 userName 초기화
      console.log(route.path)
      if (route.path == '/') {
        store.commit('setMyName', '')
        return
      }
      redirect('/login')
    }
  })
}
