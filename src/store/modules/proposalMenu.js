import { createProposalMenu, getProposalMenus, getProposalMenu, updateProposalMenu, deleteProposalMenu } from '@/store/api/proposalMenu'

const state = {
  proposalMenus: [],
  proposalMenu: null
}

const mutations = {
  setProposalMenus(state, proposalMenus) {
    state.proposalMenus = proposalMenus
  },
  setProposalMenu(state, proposalMenu) {
    state.proposalMenu = proposalMenu
  }
}

const actions = {
  createProposalMenu({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        createProposalMenu(data)
          .then(res => {
            commit('setProposalMenu', res.data)
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
  getProposalMenus({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getProposalMenus(param)
          .then(res => {
            commit('setProposalMenus', res.data)
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
  getProposalMenu({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getProposalMenu(id)
          .then(res => {
            commit('setProposalMenu', res.data)
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
  updateProposalMenu({ commit }, dataForm) {
    return new Promise((resolve, reject) => {
      try {
        updateProposalMenu(dataForm)
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
  deleteProposalMenu({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        deleteProposalMenu(id)
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
