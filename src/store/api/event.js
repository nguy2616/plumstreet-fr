import axios from '@/utils/request'

export function createEvent(data) {
  return axios.post('/events', data)
}

export function getEvents() {
  return axios.get('/events')
}

export function getEvent(id) {
  return axios.get(`/events/${id}`)
}

export function updateEvent(data) {
  return axios.put(`/events/${data.id}`, data)
}

export function deleteEvent(id) {
  return axios.delete(`events/${id}`)
}
