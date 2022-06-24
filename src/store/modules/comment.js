import { createComment, getComments, getComment, updateComment, deleteComment } from '@/store/api/comment'

const state = {
  comments: [],
  comment: null
}

const mutations = {
  setComments(state, comments) {
    state.comments = comments
  },
  setComment(state, comment) {
    state.comment = comment
  }
}

const actions = {
  createComment({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        createComment(data)
          .then(res => {
            commit('setComment', res.data)
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
  getComments({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getComments(param)
          .then(res => {
            commit('setComments', res.data)
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
  getComment({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getComment(id)
          .then(res => {
            commit('setComment', res.data)
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
  updateComment({ commit }, dataForm) {
    return new Promise((resolve, reject) => {
      try {
        updateComment(dataForm)
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
  deleteComment({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        deleteComment(id)
          .then(res => {
            console.log(res)
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
