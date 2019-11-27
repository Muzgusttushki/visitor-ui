export default {
  setSession (state, commit) {
    state.session = commit
  },

  exit (state) {
    state.session = {}
  }
}
