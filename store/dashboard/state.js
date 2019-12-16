export default () => {
  const previewInstanceDate = new Date()
  previewInstanceDate.setDate(previewInstanceDate.getDate() - 14)
  // const formatApi2 = (prevDate, currDate) => {

  // };
  return {
    globalFilters: {
      sources: [],
      timeInterval: {
        start: previewInstanceDate,
        end: new Date()
      }
    },
    // globalFiltersV2: {

    // },

    cacheActions: [],
    cachePaymentFilter: [],
    cachePaymentFilterState: []
  }
}
