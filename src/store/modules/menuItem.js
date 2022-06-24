import { createMenuItem, getMenuItems, getMenuItem, updateMenuItem, deleteMenuItem } from '@/store/api/menuItem'

const state = {
  menuItems: [],
  menuItem: null,
  update: false,
  dbclick: false
}

const getters = {
  isUpdated(state) {
    if (state.update === true) {
      return true
    } else {
      return false
    }
  }
}

const mutations = {
  setMenuItems(state, menuItems) {
    state.menuItems = menuItems
  },
  setMenuItem(state, menuItem) {
    state.menuItem = menuItem
  },
  update(state, update) {
    state.update = update
  }
}

const actions = {
  createMenuItem({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        createMenuItem(data)
          .then(res => {
            commit('setMenuItem', res.data)
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
  getMenuItems({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getMenuItems(param)
          .then(res => {
            commit('setMenuItems', res.data)
            console.log(res.data)
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
  getMenuItem({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getMenuItem(id)
          .then(res => {
            commit('setMenuItem', res.data)
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
  deleteMenuItem({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        deleteMenuItem(id)
          .then(res => {
            console.log(res)
            resolve(res)
          })
      } catch (error) {
        reject(error)
        // console.log(error)
      }
    })
  },
  updateMenuItem({ commit }, dataForm) {
    return new Promise((resolve, reject) => {
      try {
        updateMenuItem(dataForm)
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
  actions,
  getters
}
