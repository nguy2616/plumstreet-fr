import { createEvent, getEvents, getEvent, updateEvent, deleteEvent } from '@/store/api/event'

const state = {
  events: [],
  event: null,
  isSaved: false
}

const mutations = {
  setEvents(state, events) {
    state.events = events
  },
  setEvent(state, event) {
    state.event = event
  },
  save(state, isSaved) {
    state.isSaved = isSaved
  }
}

const actions = {
  createEvent({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        createEvent(data)
          .then(res => {
            commit('setEvent', res.data)
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
  getEvents({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getEvents(param)
          .then(res => {
            commit('setEvents', res.data)
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
  getEvent({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getEvent(id)
          .then(res => {
            commit('setEvent', res.data)
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
  updateEvent({ commit }, dataForm) {
    return new Promise((resolve, reject) => {
      try {
        updateEvent(dataForm)
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
  deleteEvent({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        deleteEvent(id)
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
