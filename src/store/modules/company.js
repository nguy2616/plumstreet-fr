import { postCompany, getCompanies, getCompany, updateCompany, deleteCompany } from '@/store/api/company'

const state = {
  companies: [],
  company: null
}

const mutations = {
  setCompanies(state, companies) {
    state.companies = companies
  },
  setCompany(state, company) {
    state.company = company
  }
}

const actions = {
  createCompany({ commit }, data) {
    return new Promise((resolve, reject) => {
      postCompany(data).then(res => {
        commit('setCompany', res.data)
        // console.log(res.data)
        resolve(res)
      })
        .catch(err => {
          reject(err)
        })
    })
  },
  getCompanies({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getCompanies(param)
          .then(res => {
            commit('setCompanies', res.data)
            // console.log(res)
          })
      } catch (error) {
        reject(error)
        // console.log(error)
      }
    })
  },
  getCompany({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getCompany(id)
          .then(res => {
            commit('setCompany', res.data)
            // console.log(res.data)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      } catch (error) {
        reject(error)
      }
    })
  },
  updateCompany({ commit }, data) {
    return new Promise((resolve, reject) => {
      updateCompany(data).then(res => {
        commit('setCompany', res.data)
        // console.log('company', res.data)
        resolve(res)
      })
        .catch(err => {
          reject(err)
        })
    })
  },
  deleteCompany({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        deleteCompany(id)
          .then(res => {
            // console.log(res)
            resolve(res)
          })
      } catch (error) {
        reject(error)
        // console.log(error)
      }
    })
  },
  logout({ commit }) {
    localStorage.removeItem('vuex')
    commit('setCompany', null)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
