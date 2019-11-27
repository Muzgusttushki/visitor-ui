export default {
  setActivityUser(state, info) {
   state.userInfo = info;
  },
  
  setPreviousSettings(state, settings) {
    state.previousSettings = settings
    console.log('success mutation', state, settings)
  },

  deletePreviousSettings(state) {
    state.previousSettings = null
  }
}
