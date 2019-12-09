export async function getDashboardStats({ commit }) {
  try {
    const request = (await this.$axios.post(`${process.env.address}/v1/dashboard`, {
      ...this.getters['dashboard/globalFilters']
    })).data

    return request
  } catch {
    return {}
  }
}

export async function getDevicesGraphics() {
  try {
    const request = await this.$axios.post(`${process.env.address}/v1/dashboard/graphics/devices`,
      this.getters['dashboard/globalFilters'])

    return request.data
  } catch (e) {
    return null
  }
}

export async function getSalesGraphics() {
  try {
    const graphics = await this.$axios.post(`${process.env.address}/v1/dashboard/graphics/sales`,
      this.getters['dashboard/globalFilters'])

    return graphics
  } catch (e) {
    return null
  }
}

export async function getLocationsGraphics() {
  try {
    const graphics = await this.$axios.post(`${process.env.address}/v1/dashboard/graphics/locations`,
      this.getters['dashboard/globalFilters'])

    return graphics.data
  } catch (e) {
    return null
  }
}

export async function getEventRankingGraphics() {
  try {
    const request = await this.$axios.post(`${process.env.address}/v1/dashboard/graphics/eventsTop`,
      this.getters['dashboard/globalFilters'])
    return request.data
  } catch (e) {
    return null
  }
}

export async function getBuyersStats() {
  try {
    const request = await this.$axios.post(`${process.env.address}/v1/dashboard/graphics/buyersNewOld`,
      this.getters['dashboard/globalFilters'])
    return request.data
  } catch (e) {
    return null
  }
}

export async function getSalesTicketGraphics() {
  try {
    const graphics = await this.$axios.post(`${process.env.address}/v1/dashboard/graphics/tickets`,
      this.getters['dashboard/globalFilters'])

    return graphics.data
  } catch (e) {
    return null
  }
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


export async function getPaymentsFilters({ commit }, filters) {
  try {
    const request = await this.$axios.post(`${process.env.address}/v1/reports/payments.filters`, {
      ...this.getters['dashboard/globalFilters']
    })

    return request.data
  } catch (e) {
    return null
  }
}

export async function getOperationsFilters({ commit }) {
  try {
    const globalFilters = this.getters['dashboard/globalFilters'].timeInterval;

    const hash = JSON.stringify({
      start: `${(new Date(globalFilters.start)).getFullYear}:${(new Date(globalFilters.start)).getMonth()}:${(new Date(globalFilters.start)).getDate()}`,
      end: `${new Date(globalFilters.end).getFullYear}:${new Date(globalFilters.end).getMonth()}:${new Date(globalFilters.end).getDate()}`,
    }).split('')
      .reduce((a, b) => (((a << 5) - a) + b
        .charCodeAt(0)) | 0, 0)

    const state = await new Promise(function (callback) {
      commit('cacheActionsFilters', {
        hash,
        callback
      });
    })

    if (state) return state;

    const request = await this.$axios.post(`${process.env.address}/v1/operations/filters`, {
      ...this.getters['dashboard/globalFilters']
    })

    return await new Promise(function (callback) {
      commit('cacheActionsFilters', {
        hash,
        filters: request.data,
        callback
      });
    })
  } catch (e) {
    console.log(e);
    return null
  }
}

export async function getOperations({ commit }, filters) {
  try {
    const request = await this.$axios.post(`${process.env.address}/v1/operations/get`, {
      ...this.getters['dashboard/globalFilters'],
      ...filters
    })

    return request.data
  } catch (e) {
    return null
  }
}
