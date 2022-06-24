import axios from '@/utils/request'

export function createMenuItemGroup(data) {
  return axios.post('/menu-item-groups', data)
}

export function getMenuItemGroups() {
  return axios.get('/menu-item-groups')
}

export function getMenuItemGroup(id) {
  return axios.get(`/menu-item-groups/${id}`)
}

export function updateMenuItemGroup(data) {
  return axios.put(`menu-item-groups/${data.id}`, data)
}

export function deleteMenuItemGroup(id) {
  return axios.delete(`menu-item-groups/${id}`)
}
