import axios from '@/utils/request'

export function login(data) {
  return axios.post('/auth/local', data)
}

export function signup(data) {
  return axios.post('/auth/local/register', data)
}

export function checkEmail(data) {
  return axios.post('/email-check', data)
}

export function forgotPassword(data) {
  return axios.post('/auth/forgot-password', data)
}

export function resetPassword(data) {
  return axios.post('/auth/reset-password', data)
}
