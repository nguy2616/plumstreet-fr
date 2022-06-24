import { createLegalForm, getLegalForms, getLegalForm } from '@/store/api/legalForm'

const state = {
  legalForms: [],
  legalForm: null
}

const mutations = {
  setLegalForms(state, legalForms) {
    state.legalForms = legalForms
  },
  setLegalForm(state, legalForm) {
    state.legalForm = legalForm
  }
}

const actions = {
  createLegalForm({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        createLegalForm(data)
          .then(res => {
            commit('setLegalForm', res.data)
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
  getLegalForms({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getLegalForms(param)
          .then(res => {
            commit('setLegalForms', res.data)
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
  getLegalForm({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getLegalForm(id)
          .then(res => {
            commit('setLegalForm', res.data)
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
