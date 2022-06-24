import { createMenuItemGroup, getMenuItemGroups, getMenuItemGroup, updateMenuItemGroup, deleteMenuItemGroup } from '@/store/api/menuItemGroup'

const state = {
  menuItemGroups: [],
  menuItemGroup: null
}

const mutations = {
  setMenuItemGroups(state, menuItemGroups) {
    state.menuItemGroups = menuItemGroups
  },
  setMenuItemGroup(state, menuItemGroup) {
    state.menuItemGroup = menuItemGroup
  }
}

const actions = {
  createMenuItemGroup({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        createMenuItemGroup(data)
          .then(res => {
            commit('setMenuItemGroup', res.data)
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
  getMenuItemGroups({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getMenuItemGroups(param)
          .then(res => {
            commit('setMenuItemGroups', res.data)
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
  getMenuItemGroup({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getMenuItemGroup(id)
          .then(res => {
            commit('setMenuItemGroup', res.data)
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
  deleteMenuItemGroup({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        deleteMenuItemGroup(id)
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
  updateMenuItemGroup({ commit }, dataForm) {
    return new Promise((resolve, reject) => {
      try {
        updateMenuItemGroup(dataForm)
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
