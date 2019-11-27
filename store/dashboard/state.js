export default () => {
  const previewInstanceDate = new Date()
  previewInstanceDate.setDate(previewInstanceDate.getDate() - 14)
  return {
    globalFilters: {
      sources: [],
      timeInterval: {
        start: previewInstanceDate,
        end: new Date()
      }
    }
  }
}
