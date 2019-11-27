export default async function ({ store, redirect, error }) {
  const session = await store.dispatch('account/accessEnchant')
  if (session) { return redirect('/') }
}
