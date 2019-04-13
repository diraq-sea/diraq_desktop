export default async ({ store, redirect }) => {
  const isLogin = await store.dispatch('login/checkLogin')
  if (!isLogin) {
    return redirect('/login')
  }
}
