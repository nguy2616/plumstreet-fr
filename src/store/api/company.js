import axios from '@/utils/request'

export function postCompany(data) {
  return axios.post('/companies', data)
}

export function getCompanies(param) {
  return axios.get(`/companies${param}`)
}

export function getCompany(id) {
  return axios.get(`/companies/${id}`)
}
export function updateCompany(data) {
  return axios.put(`/companies/${data.id}`, data)
}

export function deleteCompany(id) {
  return axios.delete(`/companies/${id}`)
}
