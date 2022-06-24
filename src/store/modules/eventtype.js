import { createEventType, getEventTypes, getEventType, updateEventType, deleteEventType } from '@/store/api/eventtype'

const state = {
  eventtypes: [],
  eventtype: null
}

const mutations = {
  setEventTypes(state, eventtypes) {
    state.eventtypes = eventtypes
  },
  setEventType(state, eventtype) {
    state.eventtype = eventtype
  }
}

const actions = {
  createEventType({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        createEventType(data)
          .then(res => {
            commit('setEventType', res.data)
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
  getEventTypes({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getEventTypes(param)
          .then(res => {
            commit('setEventTypes', res.data)
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
  getEventType({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getEventType(id)
          .then(res => {
            commit('setEventType', res.data)
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
  updateEventType({ commit }, dataForm) {
    return new Promise((resolve, reject) => {
      try {
        updateEventType(dataForm)
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
  deleteEventType({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        deleteEventType(id)
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
