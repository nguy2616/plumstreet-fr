import { login, signup, checkEmail, forgotPassword, resetPassword } from '@/store/api/auth'
import jwt from 'jsonwebtoken'
import moment from 'moment'

const state = {
  admin: null,
  user: null,
  jwt: null,
  provider: null,
  isSaved: true,
  rememberEmail: null,
  rememberPassword: null
}

const getters = {
  jwt: state => state.jwt,
  user: state => state.user,
  expired: (state) => {
    const decoded = jwt.decode(state.jwt)
    return decoded && moment.unix(decoded.exp).isBefore(moment().format())
  }
}

const mutations = {
  setAdmin(state, admin) {
    state.admin = admin
  },
  setUser(state, user) {
    state.user = user
  },
  setJwt(state, jwt) {
    state.jwt = jwt
  },
  setProvider(state, provider) {
    state.provider = provider
  },
  save(state, isSaved) {
    state.isSaved = isSaved
  },
  setRememberEmail(state, email) {
    state.rememberEmail = email
  },
  setRememberPassword(state, password) {
    state.rememberPassword = password
  }
}

const actions = {
  signup({ commit }, signupInfo) {
    return new Promise((resolve, reject) => {
      signup(signupInfo)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  login({ commit }, loginInfo) {
    const { identifier, password } = loginInfo
    return new Promise((resolve, reject) => {
      try {
        login({ identifier: identifier.trim(), password: password })
          .then(res => {
            commit('setJwt', res.data.jwt)
            commit('setUser', res.data.user)
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
  logout({ commit }) {
    localStorage.removeItem('vuex')
    commit('setJwt', null)
    commit('setUser', null)
    commit('setAdmin', null)
  },
  checkEmail({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        checkEmail(data)
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error.message)
          })
      } catch (error) {
        reject(error)
      }
    })
  },
  saveInfo({ commit }, isSaved) {
    commit('save', isSaved)
  },
  forgotPassword({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        forgotPassword(data)
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error.message)
          })
      } catch (error) {
        reject(error)
      }
    })
  },
  resetPassword({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        resetPassword(data)
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error.message)
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
  getters,
  mutations,
  actions
}
