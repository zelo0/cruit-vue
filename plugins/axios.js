export default function ({ $axios, redirect, store, route }) {
  $axios.onError((error) => {
    if (error.response.status === 401) {
      redirect('/login')
    } else if (error.response.status == 403) {
      redirect('/error/403')
    }
  })
}
