import axios from '@/utils/request'

export function createProposalMenu(data) {
  return axios.post('/proposal-menus', data)
}

export function getProposalMenus(param) {
  return axios.get(`/proposal-menus${param}`)
}

export function getProposalMenu(id) {
  return axios.get(`/proposal-menus/${id}`)
}

export function updateProposalMenu(data) {
  return axios.put(`/proposal-menus/${data.id}`, data)
}

export function deleteProposalMenu(id) {
  return axios.delete(`proposal-menus/${id}`)
}
