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
    const globalFilters = this.getters['dashboard/globalFilters'].timeInterval;
    const start = new Date(globalFilters.start), end = new Date(globalFilters.end);

    const hash = JSON.stringify({
      start: `${start.getFullYear}:${start.getMonth()}:${start.getDate()}`,
      end: `${end.getFullYear}:${end.getMonth()}:${end.getDate()}`,
    }).split('')
      .reduce((a, b) => (((a << 5) - a) + b
        .charCodeAt(0)) | 0, 0)
    console.log('test1')

    const state = await new Promise(function (callback) {
      commit('cachePaymentFilters', {
        hash,
        callback
      });
    })
    console.log('test2')
    if (state) {
      console.log({...state}, 'state')
      return state
    } else {
      const request = await this.$axios.post(`${process.env.address}/v1/reports/payments.filters`, {
        ...this.getters['dashboard/globalFilters']
      }).then(( r ) => {
        console.log('asdfjlksdjfshdfhdsjbfvjvuidsvubuvbuwebviubeiuwbvuwebv')
        return r
      })
      return await new Promise(function (callback) {
        commit('cachePaymentFilters', {
          hash,
          filters: request.data,
          callback
        });
      })
    }


    console.log('test3')
    
  } catch (e) {
    return null
  } finally {
    console.log('test4')
  }
}

export async function getOperationsFilters({ commit }) {
  try {
    const globalFilters = this.getters['dashboard/globalFilters'].timeInterval;
    const start = new Date(globalFilters.start), end = new Date(globalFilters.end);

    const hash = JSON.stringify({
      start: `${start.getFullYear}:${start.getMonth()}:${start.getDate()}`,
      end: `${end.getFullYear}:${end.getMonth()}:${end.getDate()}`,
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
