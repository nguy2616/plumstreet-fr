import { createUser, getUsers, getUser, updateProfile, deleteUser } from '@/store/api/user'

const state = {
  users: [],
  user: null
}

const mutations = {
  setUsers(state, users) {
    state.users = users
  },
  setUser(state, user) {
    state.user = user
  }
}

const actions = {
  createUser({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        createUser(data)
          .then(res => {
            commit('setUser', res.data)
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
  getUsers({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getUsers(param)
          .then(res => {
            commit('setUsers', res.data)
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
  getUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getUser(id)
          .then(res => {
            // commit('setUser', res.data)
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
  updateProfile({ commit }, dataForm) {
    return new Promise((resolve, reject) => {
      try {
        updateProfile(dataForm)
          .then(res => {
            // console.log(res)
            commit('setUser', res.data)
            resolve(res)
          })
      } catch (error) {
        reject(error)
        // console.log(error)
      }
    })
  },
  deleteUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        deleteUser(id)
          .then(res => {
            // console.log(res)
            resolve(res)
          })
      } catch (error) {
        reject(error)
        // console.log(error)
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
