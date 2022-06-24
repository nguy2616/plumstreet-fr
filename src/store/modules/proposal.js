import { createProposal, getProposals, getProposal, updateProposal } from '@/store/api/proposal'

const state = {
  proposals: [],
  proposal: null
}

const mutations = {
  setProposals(state, proposals) {
    state.proposals = proposals
  },
  setProposal(state, proposal) {
    state.proposal = proposal
  }
}

const actions = {
  createProposal({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        createProposal(data)
          .then(res => {
            commit('setProposal', res.data)
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
  getProposals({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getProposals(param)
          .then(res => {
            commit('setProposals', res.data)
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
  getProposal({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getProposal(id)
          .then(res => {
            commit('setProposal', res.data)
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
  updateProposal({ commit }, dataForm) {
    return new Promise((resolve, reject) => {
      try {
        updateProposal(dataForm)
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
