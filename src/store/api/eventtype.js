import axios from '@/utils/request'

export function createEventType(data) {
  return axios.post('/event-types', data)
}

export function getEventTypes() {
  return axios.get('/event-types')
}

export function getEventType(id) {
  return axios.get(`/event-types/${id}`)
}

export function updateEventType(data) {
  return axios.put(`/event-types/${data.id}`, data)
}

export function deleteEventType(id) {
  return axios.delete(`event-types/${id}`)
}
