export default function ({ $axios, app }) {
  $axios.onError((error) => {
    if (error.response.status === 401) {
      app.router.push('/auth/login')
    } else if (error.response.status == 403) {
      app.router.push('/error/403')
    }
  })
}
