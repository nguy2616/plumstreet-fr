import store from '../store'
import router from '../router'

export function logout() {
  store.dispatch('auth/logout')
  store.dispatch('company/logout')
  store.commit('user/setUser', null)
  store.commit('auth/save', false)
  router.push('/')
}
export function checkIncluded(item, group) {
  if (group) {
    if (group.some(cui => cui.id === item.id)) {
      item.isCheck = true
    } else {
      item.isCheck = false
    }
  }
}

export function checkFavorite(item, group) {
  if (group) {
    if (group.some(cui => cui.id === item.id)) {
      item.isFav = true
    } else {
      item.isFav = false
    }
  }
}

export function checkFav(items, favList) {
  const favIds = favList.map(function(obj) {
    return obj.id
  })
  items.forEach(it => {
    if (favIds.includes(it.id)) {
      it.isFav = true
    }
  })
}

export function rndStr(len) {
  let text = ''
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*'
  for (let i = 0; i < len; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return text
}

export function compareTimestamp(date) {
  try {
    var nowDate = new Date()
    date = date.split('-')
    var newDate = new Date(date[2], date[1] - 1, date[0])
    if (nowDate.getTime() < newDate.getTime()) {
      return true
    } else {
      return false
    }
  } catch (error) {
    return error
  }
}

export function getToday() {
  var nowDate = new Date()
  var month = nowDate.getMonth() + 1
  var day = nowDate.getDate()
  if (day < 10) {
    day = '0' + day.toString()
  }
  if (month < 10) {
    month = '0' + month.toString()
  }
  var date = nowDate.getFullYear() + '-' + month + '-' + day
  return date
}

export function formatDate(date) {
  date = date.split('-')
  return `${date[2]}-${date[1]}-${date[0]}`
}
