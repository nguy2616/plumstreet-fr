import axios from '@/utils/request'

export function createMenuItem(data) {
  return axios.post('/menu-items', data)
}

export function getMenuItems() {
  return axios.get('/menu-items')
}

export function getMenuItem(id) {
  return axios.get(`/menu-items/${id}`)
}

export function deleteMenuItem(id) {
  return axios.delete(`menu-items/${id}`)
}

export function updateMenuItem(data) {
  return axios.put(`menu-items/${data.id}`, data)
}
