import Vue from 'vue'
import VueRouter from 'vue-router'
import PageView from '@/components/Layout/View'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: PageView,
    children: [
      // authentication
      {
        path: '',
        name: 'Login',
        invisible: true,
        component: () => import('@/views/auth/Login'),
        meta: {
          viewComponent: 'Login'
        }
      },
      {
        path: '/fotgot-password',
        name: 'ForgotPassword',
        invisible: true,
        component: () => import('@/views/auth/ForgotPassword'),
        meta: {
          viewComponent: 'Login'
        }
      },
      {
        path: '/reset-password',
        name: 'ResetPassword',
        component: () => import('@/views/auth/ResetPassword'),
        meta: {
          viewComponent: 'Login'
        }
      },
      //
      {
        path: '/cuisine-type',
        name: 'CuisineType',
        invisible: true,
        component: () => import('@/views/menu/CuisineType'),
        meta: {
          viewComponent: 'AuthView',
          roleView: 'Contact'
        }
      },
      {
        path: '/menus',
        name: 'Menus',
        invisible: true,
        component: () => import('@/views/menu/Menus'),
        meta: {
          viewComponent: 'AuthView',
          roleView: 'Contact'
        }
      },
      {
        path: '/company',
        name: 'Company',
        invisible: true,
        component: () => import('@/views/foodtruck/Company'),
        meta: {
          viewComponent: 'AuthView',
          roleView: 'Contact'
        }
      },
      {
        path: '/bank',
        name: 'Bank',
        invisible: true,
        component: () => import('@/views/foodtruck/Bank'),
        meta: {
          viewComponent: 'AuthView',
          roleView: 'Contact'
        }
      },
      {
        path: '/contact',
        name: 'Contact',
        invisible: true,
        component: () => import('@/views/foodtruck/Contact'),
        meta: {
          viewComponent: 'AuthView',
          roleView: 'Contact'
        }
      },
      {
        path: '/foodtrucks',
        name: 'Foodtrucks',
        invisible: true,
        component: () => import('@/views/foodtruck/Foodtrucks'),
        meta: {
          viewComponent: 'AuthView',
          roleView: 'Contact'
        }
      },
      {
        path: '/requests',
        name: 'Requests',
        invisible: true,
        component: () => import('@/views/foodtruck/Requests'),
        meta: {
          viewComponent: 'AuthView',
          roleView: 'Contact'
        }
      },
      {
        path: '/request/:id',
        name: 'RequestDetail',
        invisible: true,
        component: () => import('@/views/foodtruck/RequestDetail'),
        meta: {
          viewComponent: 'AuthView',
          roleView: 'Contact'
        }
      },
      // client
      {
        path: '/client',
        name: 'Client',
        invisible: true,
        component: () => import('@/views/clients/Client'),
        meta: {
          viewComponent: 'AuthView',
          roleView: 'Client'
        }
      },
      {
        path: '/events',
        name: 'EventsList',
        invisible: true,
        component: () => import('@/views/clients/EventsList'),
        meta: {
          viewComponent: 'AuthView',
          roleView: 'Client'
        }
      },
      {
        path: '/event/:id',
        name: 'Event',
        invisible: true,
        component: () => import('@/views/clients/Event'),
        meta: {
          viewComponent: 'AuthView',
          roleView: 'Client'
        }
      },
      {
        path: '/menus-list',
        name: 'MenusList',
        invisible: true,
        component: () => import('@/views/clients/MenusList'),
        meta: {
          viewComponent: 'AuthView',
          roleView: 'Client'
        }
      },
      {
        path: '/proposal-request',
        name: 'Proposal',
        invisible: true,
        component: () => import('@/views/clients/Proposal'),
        meta: {
          viewComponent: 'AuthView',
          roleView: 'Client'
        }
      },
      {
        path: '/menu/:id',
        name: 'MenuDetail',
        invisible: true,
        component: () => import('@/views/menu/MenuDetail'),
        meta: {
          viewComponent: 'AuthView'
        }
      },
      // admin
      {
        path: '/foodtrucks-list',
        name: 'FoodtrucksAdmin',
        invisible: true,
        component: () => import('@/views/admin/FoodtrucksAdmin'),
        meta: {
          viewComponent: 'AdminView'
        }
      },
      {
        path: '/clients-list',
        name: 'Clients',
        invisible: true,
        component: () => import('@/views/admin/Clients'),
        meta: {
          viewComponent: 'AdminView'
        }
      },
      {
        path: '/centres',
        name: 'Centres',
        invisible: true,
        component: () => import('@/views/admin/Clients'),
        meta: {
          viewComponent: 'AdminView'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
