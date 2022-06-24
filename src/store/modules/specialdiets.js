import { createSpecialdiet, getSpecialdiets, getSpecialdiet } from '@/store/api/specialdiets'

const state = {
  specialdiets: [],
  specialdiet: null
}

const mutations = {
  setSpecialdiets(state, specialdiets) {
    state.specialdiets = specialdiets
  },
  setSpecialdiet(state, specialdiet) {
    state.specialdiet = specialdiet
  }
}

const actions = {
  createSpecialdiet({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        createSpecialdiet(data)
          .then(res => {
            commit('setSpecialdiet', res.data)
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
  getSpecialdiets({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getSpecialdiets(param)
          .then(res => {
            commit('setSpecialdiets', res.data)
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
  getSpecialdiet({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getSpecialdiet(id)
          .then(res => {
            commit('setSpecialdiet', res.data)
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
