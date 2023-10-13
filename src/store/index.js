import { createStore } from 'vuex'

export default createStore({
  state: {
    filters:[],
    search: '',
  },
  getters: {
  },
  mutations: {
    setFilters(state, filters){
      // clean unique values
      filters = filters.filter((v, i, a) => a.indexOf(v) === i)
      state.filters = filters
    },
    setSearch(state, search){
      state.search = search
    }
  },
  actions: {
    setFilters({commit}, filters){
      commit('setFilters', filters)
    },
    resetFilters({commit}){
      commit('setFilters', [])
    },
    setSearch({commit}, search){
      commit('setSearch', search)
    },
  },
  modules: {
  }
})
