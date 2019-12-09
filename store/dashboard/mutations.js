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
  }
}
