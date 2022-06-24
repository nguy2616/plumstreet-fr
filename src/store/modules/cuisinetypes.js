import { createCuisinetype, getCuisinetypes, getCuisinetype } from '@/store/api/cuisinetypes'

const state = {
  cuisinetypes: [],
  cuisinetype: null
}

const mutations = {
  setCuisinetypes(state, cuisinetypes) {
    state.cuisinetypes = cuisinetypes
  },
  setCuisinetype(state, cuisinetype) {
    state.cuisinetype = cuisinetype
  }
}

const actions = {
  createCuisinetype({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        createCuisinetype(data)
          .then(res => {
            commit('setCuisinetype', res.data)
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
  getCuisinetypes({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getCuisinetypes(param)
          .then(res => {
            commit('setCuisinetypes', res.data)
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
  getCuisinetype({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getCuisinetype(id)
          .then(res => {
            commit('setCuisinetype', res.data)
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
