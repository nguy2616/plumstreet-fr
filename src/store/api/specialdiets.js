import axios from '@/utils/request'

export function createSpecialdiet(data) {
  return axios.post('/special-diets', data)
}

export function getSpecialdiets(param) {
  return axios.get(`/special-diets${param}`)
}

export function getSpecialdiet(id) {
  return axios.get(`/special-diets/${id}`)
}
