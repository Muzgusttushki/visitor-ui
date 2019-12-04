export async function signIn ({ commit }, { username, password, access }) {
  try {
    const request = await this.$axios.post(
      `${process.env.address}/v1/account/sign-up`,
      {
        username,
        password,
        code: access
      }
    ).catch((resolve) => {
    })


    if (!request.data) {
      return { type: 'error', message: 'Ошибка при обработки ключа.' }
    }

    const expires = new Date()
    expires.setTime(JSON.parse(window.atob(request.data.split('.')[1])).exp * 1000)

    this.$cookies.set('vst', request.data, {
      path: '/',
      expires
    });

    await this.dispatch('account/accessEnchant')
    this.$router.replace('/')
    return { type: 'success', message: 'Успешно.' }
  } catch (e) {
    return { type: 'error', message: 'Ошибка авторизации.' }
  }
}

export function accessEnchant ({ commit }, skip) {
  try {
    const vst = this.$cookies.get('vst');
    if (!vst) {
      return null
    }

    console.log('call');
    this.$axios.defaults.headers.common = { 'Authorization': `Bearer ${vst}` };

    if (skip) { return vst }
    const session = JSON.parse(window.atob(vst.split('.')[1]));

    commit('setSession', session);
    return session
  } catch {
    this.$cookies.remove('vst');
    throw new Error({
      message: 'Ошибка при обработке кука'
    })
  }
}

export function exit ({ commit }) {
  this.$cookies.remove('vst')
  commit('exit')
}
