export default async function ({ store, redirect, error }) {
  const session = await store.dispatch('account/accessEnchant')
  if (!session) { return redirect('/account/sign-in') }
  if (session.role < 1) { return error('Invalid session, please contact as provider') }
}
