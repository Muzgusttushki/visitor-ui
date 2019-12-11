export default {
  setGlobalFilters(state, { key, value }) {
    state.globalFilters[key] = value
  },


  cacheActionsFilters(state, {
    hash,
    filters,
    callback
  }) {
    const cache = state.cacheActions.find(function (document) {
      if (document.hash == hash) {
        return true;
      }

      return false;
    });

    if (cache) {
      return callback(cache.filters);
    }

    if (!cache && !filters) return callback(false);
    else if (filters) {
      if (state.cacheActions.length >= 10) {
        delete state.cacheActions[0];
      }

      state.cacheActions.push({
        hash,
        filters
      })

      return callback(filters);
    } else {
      return callback(false)
    };
  },

  cachePaymentFilters(state, {
    hash,
    filters,
    callback
  }) {
    const cache = state.cachePaymentFilter.find(function (document) {
      if (document.hash == hash) {
        return true;
      }

      return false;
    });

    if (cache) {
      return callback(cache.filters);
    }

    if (!cache && !filters) return callback(false);
    else if (filters) {
      if (state.cachePaymentFilter.length >= 10) {
        delete state.cachePaymentFilter[0];
      }

      state.cachePaymentFilter.push({
        hash,
        filters
      })

      return callback(filters);
    } else {
      return callback(false)
    };
  },

  cachePaymentFilterState({ cachePaymentFilterState }, { write, state, callback }) {
    const globalFilters = this.getters['dashboard/globalFilters'].timeInterval;
    const start = new Date(globalFilters.start), end = new Date(globalFilters.end);
    const hash = JSON.stringify({
      start: `${start.getFullYear}:${start.getMonth()}:${start.getDate()}`,
      end: `${end.getFullYear}:${end.getMonth()}:${end.getDate()}`,
    }).split('')
      .reduce((a, b) => (((a << 5) - a) + b
        .charCodeAt(0)) | 0, 0)
      console.log(hash)
  

    if (write) {
     // if (cachePaymentFilterState.length)

      cachePaymentFilterState[0] = {
        hash,
        state
      }

      return callback && callback(state);
    }
    else {
      const cache = cachePaymentFilterState.find(function (document) {
        if (document.hash == hash) {
          return true;
        }
  
        return false;
      });

      if (cache) return callback && callback(cache)
      else return callback && callback(false)
    }
  }
}
