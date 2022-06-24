import axios from '@/utils/request'

export function createCategory(data) {
  return axios.post('categories', data)
}

export function getCategories() {
  return axios.get('/categories')
}

export function getCategory(id) {
  return axios.get(`/categories/${id}`)
}
