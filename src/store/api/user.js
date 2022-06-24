import axios from '@/utils/request'

export function createUser(data) {
  return axios.post('/users', data)
}

export function getUsers(param) {
  return axios.get(`/users${param}`)
}

export function getUser(id) {
  return axios.get(`/users/${id}`)
}

export function deleteUser(id) {
  return axios.delete(`/users/${id}`)
}

export function updateProfile(userdata) {
  return axios.put(`/users/${userdata.id}`, userdata)
}
