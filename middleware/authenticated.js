export default function ({ store, redirect }) {
  // 유저 로그인이 안 돼 있으면
  if (!store.getters.authenticated) {
    return redirect('/login')
  }
}
