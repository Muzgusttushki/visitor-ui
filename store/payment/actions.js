export async function getUserDetails({ commit }, phone) {
  try {
    const request = await this.$axios.post(
      `${process.env.address}/v1/reports/getDetailsUserInformation`,
      {
        ...this.getters["dashboard/globalFilters"],
        phone
      }
    );

    return request.data;
  } catch (e) {
    return null;
  }
}

export function setPreviousSettings({ commit }, {settings}) {
  try {
    // commit('setPreviousSettings', settings)
    console.log('success commit', settings)
  } catch(err) {
    console.log(err)
    return null
  }
}

export function deletePreviousSettings({ commit }) {
  commit('deletePreviousSettings')
}

export async function getPayments({ commit }, filters) {
  try {
    const request = await this.$axios.post(`${process.env.address}/v1/reports/payments.get`, {
      ...this.getters['dashboard/globalFilters'],
      ...filters
    })

    return request.data
  } catch (e) {
    return null
  }
}
