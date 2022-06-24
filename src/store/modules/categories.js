import { createCategory, getCategories, getCategory } from '@/store/api/categories'

const state = {
  categories: [],
  category: null
}

const mutations = {
  setCategories(state, categories) {
    state.categories = categories
  },
  setCategory(state, category) {
    state.category = category
  }
}

const actions = {
  createCategory({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        createCategory(data)
          .then(res => {
            commit('setCategory', res.data)
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
  getCategories({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getCategories(param)
          .then(res => {
            commit('setCategories', res.data)
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
  getCategory({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getCategory(id)
          .then(res => {
            commit('setCategory', res.data)
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
