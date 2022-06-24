import axios from '@/utils/request'

export function createCuisinetype(data) {
  return axios.post('/cuisine-types', data)
}

export function getCuisinetypes(param) {
  return axios.get(`/cuisine-types${param}`)
}

export function getCuisinetype(id) {
  return axios.get(`/cuisine-types/${id}`)
}
