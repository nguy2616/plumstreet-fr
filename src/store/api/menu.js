import axios from '@/utils/request'

export function createMenu(data) {
  return axios.post('/menus', data)
}

export function getMenus(param) {
  return axios.get(`/menus${param}`)
}

export function getMenu(id) {
  return axios.get(`/menus/${id}`)
}

export function updateMenu(data) {
  return axios.put(`/menus/${data.id}`, data)
}

export function deleteMenu(id) {
  return axios.delete(`menus/${id}`)
}
