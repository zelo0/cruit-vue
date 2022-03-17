export default function ({ $axios, app }) {
  $axios.onError((error) => {
    if (error.response.status === 401) {
      app.router.replace('/auth/login')
    } else if (error.response.status == 403) {
      app.router.replace('/error/403')
    }
  })
}
