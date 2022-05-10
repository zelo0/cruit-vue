export default function ({ store, app, redirect }) {
  // 유저 로그인이 안 돼 있으면
  if (!store.getters.authenticated) {
    // app.router.push('/auth/login')
    return redirect('/auth/login')
  }
}
