import Department from '../models/department'

export default {
  state: {
    index: []
  },
  actions: {
    fetchDepartments ({ commit }) {
      return fetch(Department.url).then(res => res.json()).then(data => {
        let departments = data.feed.entry.map(x => new Department(x))
        commit('setDepartments', departments)
      })
    }
  },
  mutations: {
    setDepartments (state, data) {
      state.index = data
    }
  },
  getters: {
    prsOf: (state, getters, rootState) => department => {
      let person = rootState.staff.index.find(x => x.name === department.prsName)
      return (person && person.ooo) ? person.oooBackup : person
    },
    mrsOf: (state, getters, rootState) => department => {
      let person = rootState.staff.index.find(x => x.name === department.mrsName)
      return (person && person.ooo) ? person.oooBackup : person
    }
  }
}
