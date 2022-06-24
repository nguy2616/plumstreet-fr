import axios from '@/utils/request'

export function createEventService(data) {
  return axios.post('/event-services', data)
}

export function getEventServices() {
  return axios.get('/event-services')
}

export function getEventService(id) {
  return axios.get(`/event-services/${id}`)
}

export function updateEventService(data) {
  return axios.put(`/event-services/${data.id}`, data)
}

export function deleteEventService(id) {
  return axios.delete(`event-services/${id}`)
}
