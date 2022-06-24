import { createMenu, getMenus, getMenu, updateMenu, deleteMenu } from '@/store/api/menu'

const state = {
  menus: [],
  menu: null
}

const mutations = {
  setMenus(state, menus) {
    state.menus = menus
  },
  setMenu(state, menu) {
    state.menu = menu
  }
}

const actions = {
  createMenu({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        createMenu(data)
          .then(res => {
            commit('setMenu', res.data)
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
  getMenus({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getMenus(param)
          .then(res => {
            commit('setMenus', res.data)
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
  getMenu({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getMenu(id)
          .then(res => {
            commit('setMenu', res.data)
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
  updateMenu({ commit }, dataForm) {
    return new Promise((resolve, reject) => {
      try {
        updateMenu(dataForm)
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
  deleteMenu({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        deleteMenu(id)
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
