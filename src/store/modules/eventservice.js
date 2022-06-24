import { createEventService, getEventServices, getEventService, updateEventService, deleteEventService } from '@/store/api/eventservice'

const state = {
  eventservices: [],
  eventservice: null
}

const mutations = {
  setEventServices(state, eventservices) {
    state.eventservices = eventservices
  },
  setEventService(state, eventservice) {
    state.eventservice = eventservice
  }
}

const actions = {
  createEventService({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        createEventService(data)
          .then(res => {
            commit('setEventService', res.data)
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
  getEventServices({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getEventServices(param)
          .then(res => {
            commit('setEventServices', res.data)
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
  getEventService({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getEventService(id)
          .then(res => {
            commit('setEventService', res.data)
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
  updateEventService({ commit }, dataForm) {
    return new Promise((resolve, reject) => {
      try {
        updateEventService(dataForm)
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
  deleteEventService({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        deleteEventService(id)
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
