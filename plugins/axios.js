export default async function ({ $axios, store }) {
  const webToken = await store.dispatch('account/accessEnchant', true);

  $axios.onRequest((config) => {
    if (webToken) {
      config.headers.common = {
        Authorization: `Bearer ${webToken}`
      }
    }
  })
}
