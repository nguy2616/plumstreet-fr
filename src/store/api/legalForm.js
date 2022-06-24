import axios from '@/utils/request'

export function createLegalForm(data) {
  return axios.post('categories', data)
}

export function getLegalForms() {
  return axios.get('/legal-forms')
}

export function getLegalForm(id) {
  return axios.get(`/legal-forms/${id}`)
}
