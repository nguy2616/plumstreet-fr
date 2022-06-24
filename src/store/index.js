import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './modules/auth'
import company from './modules/company'
import categories from './modules/categories'
import cuisinetypes from './modules/cuisinetypes'
import menu from './modules/menu'
import user from './modules/user'
import upload from './modules/upload'
import legalForm from './modules/legalForm'
import specialdiets from './modules/specialdiets'
import menuItemGroup from './modules/menuItemGroup'
import menuItem from './modules/menuItem'
import foodtruck from './modules/foodtruck'
import event from './modules/event'
import eventtype from './modules/eventtype'
import eventservice from './modules/eventservice'
import comment from './modules/comment'
import proposal from './modules/proposal'
import proposalMenu from './modules/proposalMenu'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    company,
    categories,
    cuisinetypes,
    menu,
    legalForm,
    user,
    upload,
    specialdiets,
    menuItem,
    menuItemGroup,
    foodtruck,
    event,
    eventtype,
    eventservice,
    comment,
    proposal,
    proposalMenu
  },
  plugins: [createPersistedState()]
})
