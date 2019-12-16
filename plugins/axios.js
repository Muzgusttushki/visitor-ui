export default async function ({ $axios, store }) {
  const webToken = await store.dispatch('account/accessEnchant', true);

  $axios.onRequest((config) => {
    // console.log(config, 'axios')
    if (webToken) {
      config.headers.common = {
        Authorization: `Bearer ${webToken}`,
        'Access-Control-Allow-Origin': config.baseURL
      }
    }
  })
}
