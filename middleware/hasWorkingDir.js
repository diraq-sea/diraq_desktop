export default async ({ store, redirect }) => {
  const hasWorkingDir = await store.dispatch('workingDir/checkHaving')
  if (!hasWorkingDir) {
    return redirect('/directory')
  }
}
