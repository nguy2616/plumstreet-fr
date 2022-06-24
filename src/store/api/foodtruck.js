import axios from '@/utils/request'

export function createFoodtruck(data) {
  return axios.post('/foodtrucks', data)
}

export function getFoodtrucks() {
  return axios.get('/foodtrucks')
}

export function getFoodtruck(id) {
  return axios.get(`/foodtrucks/${id}`)
}

export function updateFoodtruck(data) {
  return axios.put(`/foodtrucks/${data.id}`, data)
}

export function deleteFoodtruck(id) {
  return axios.delete(`foodtrucks/${id}`)
}
