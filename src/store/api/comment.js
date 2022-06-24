import axios from '@/utils/request'

export function createComment(data) {
  return axios.post('/menu-comments', data)
}

export function getComments(param) {
  return axios.get(`/menu-comments${param}`)
}

export function getComment(id) {
  return axios.get(`/menu-comments/${id}`)
}

export function updateComment(data) {
  return axios.put(`/menu-comments/${data.id}`, data)
}

export function deleteComment(id) {
  return axios.delete(`menu-comments/${id}`)
}
