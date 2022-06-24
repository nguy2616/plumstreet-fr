import axios from '@/utils/request'

export function createProposal(data) {
  return axios.post('/proposals', data)
}

export function getProposals() {
  return axios.get('/proposals')
}

export function getProposal(id) {
  return axios.get(`/proposals/${id}`)
}

export function updateProposal(data) {
  return axios.put(`/proposals/${data.id}`, data)
}
