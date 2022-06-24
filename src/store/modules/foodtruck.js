import { createFoodtruck, getFoodtrucks, getFoodtruck, updateFoodtruck, deleteFoodtruck } from '@/store/api/foodtruck'

const state = {
  foodtrucks: [],
  foodtruck: null
}

const mutations = {
  setFoodtrucks(state, foodtrucks) {
    state.foodtrucks = foodtrucks
  },
  setFoodtruck(state, foodtruck) {
    state.foodtruck = foodtruck
  }
}

const actions = {
  createFoodtruck({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        createFoodtruck(data)
          .then(res => {
            commit('setFoodtruck', res.data)
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
  getFoodtrucks({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getFoodtrucks(param)
          .then(res => {
            commit('setFoodtrucks', res.data)
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
  getFoodtruck({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getFoodtruck(id)
          .then(res => {
            commit('setFoodtruck', res.data)
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
  updateFoodtruck({ commit }, dataForm) {
    return new Promise((resolve, reject) => {
      try {
        updateFoodtruck(dataForm)
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
  deleteFoodtruck({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        deleteFoodtruck(id)
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
