<template>
<v-app>
  <v-card v-if="$vuetify.breakpoint.mobile">
    <v-navigation-drawer class="login"  v-model="drawer"  v-if="$route.meta.viewComponent === 'Login'" app clipped :width="$vuetify.breakpoint.mobile ? '90vw' : '20vw'">
  </v-navigation-drawer>
    <v-navigation-drawer v-model="drawer" v-else class="info pt-16"  app clipped  :width="$vuetify.breakpoint.mobile  ? '90vw' : '20vw'">
       <NavDrawerAdmin v-if="admin"/>
    <NavDrawer v-else-if="user && user.role.id === 4"/>
      <NavDrawerClient v-else-if="user && user.role.id === 5"/>
  </v-navigation-drawer>
  </v-card>
  <v-card v-else>
    <v-navigation-drawer class="login" v-if="$route.meta.viewComponent === 'Login'" app clipped width="20vw">
  </v-navigation-drawer>
    <v-navigation-drawer  v-else class="info pt-16"  app clipped  width="20vw">
       <NavDrawerAdmin v-if="admin"/>
      <NavDrawer v-else-if="user && user.role.id === 4"/>
      <NavDrawerClient v-else-if="user && user.role.id === 5"/>

  </v-navigation-drawer>
  </v-card>
   <v-app-bar hide-on-scroll  v-if="$route.meta.viewComponent !== 'Login'"  app clipped-left color="#434343" >
     <img width="60px" :src="require('@/assets/image/logo-plumstreet.png')" alt="">
       <v-app-bar-nav-icon v-if="$vuetify.breakpoint.mobile" color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
        <v-menu offset-y v-if="jwt !== null">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="user-menu"
          v-bind="attrs"
          v-on="on"
        >
           <v-avatar>
          <img v-if="user && user.image" :src="user.image.url"  style="width: 36px; height: 36px"/>
          <v-icon color="white" v-else>mdi-account-circle</v-icon>
        </v-avatar>
        </v-btn>
      </template>
      <v-list class="menu-bar">
         <v-list-item
          to="/profile"
        >
          <v-list-item-title>
            <v-btn color="none" >
             {{ $i18n.t('auth.Profile') }}
            </v-btn>
          </v-list-item-title>
        </v-list-item>
         <v-list-item
          @click="logout"
        >
          <v-list-item-title>
            <v-btn color="none" >
             {{ $i18n.t('auth.Logout') }}
            </v-btn>
          </v-list-item-title>
        </v-list-item>
         <v-list-item
        >
          <v-list-item-title>
            <v-btn color="none" >
             {{ releaseDate }}
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-app-bar>
      <v-main >
  <!--admin view-->
  <v-container fluid v-if="admin && $route.name !== 'Login' && $route.meta.viewComponent === 'AuthView'" class="main admin-bg pa-10" >
    <SessionExpire v-if="jwt"/>
      <div class="mb-4 d-flex">
        <v-btn text> <h5 class="text-h5 primary-color" v-if="admin && $route.meta.roleView === 'Contact'" @click="(e) => { $router.push('/foodtrucks-list') }">Liste des foodtrucks > {{ company.name }}</h5>
        <h5 class="text-h5 primary-color" v-else-if="admin && $route.meta.roleView === 'Client'" @click="(e) => { $router.push('/clients-list') }">Liste des clients > {{ user.fullName }}</h5></v-btn>
      </div>

    <v-row class="d-flex">
      <v-col cols="4">
        <AdminClientView v-if="this.$route.meta.roleView === 'Client'" />
        <AdminContactView v-else/>
      </v-col>
       <v-col cols="8"  class="d-flex justify-center">
         <keep-alive exclude="MenuDetail, MenuItem, Event">
              <router-view/>
         </keep-alive>
       </v-col>
    </v-row>
  </v-container>
  <!--authentication-->
   <v-container v-else-if="$route.meta.viewComponent === 'Login'" fluid  class="main d-flex justify-center">
        <keep-alive>
              <router-view/>
         </keep-alive>
        </v-container>
        <!--contact viewing requests-->
        <!--<v-container v-else-if="user.role.id === 4 && $route.meta.roleView === 'Client'" fluid  class="main d-flex justify-center">
             <SessionExpire v-if="jwt"/>
             <v-row class="d-flex">
               <v-col cols="4">
                 <RequestsContactView />
               </v-col>
                <v-col cols="8">
                  <keep-alive exclude="MenuDetail, MenuItem, Event, RequestDetail">
              <router-view/>
         </keep-alive>
                </v-col>
             </v-row>
        </v-container>-->
  <!--contact & client view-->
        <v-container v-else fluid  class="main  d-flex justify-center">
             <SessionExpire v-if="jwt"/>
        <keep-alive exclude="MenuDetail, MenuItem, Event">
              <router-view/>
         </keep-alive>
        </v-container>
      </v-main>
</v-app>
</template>

<script>
import * as func from '@/utils/function.js'
import AdminContactView from '@/components/Layout/AdminContactView.vue'
import AdminClientView from '@/components/Layout/AdminClientView.vue'
// import RequestsContactView from '@/components/Layout/RequestsContactView.vue'
export default {
  name: 'PageView',
  data() {
    return {
      releaseDate: '06-21-a',
      menus: [
        { name: 'Profil', path: '/profile' },
        { name: 'Logout', path: '/' }
      ],
      drawer: false,
      // service worker
      refreshing: false,
      registration: null,
      updateExists: false
    }
  },
  watch: {
    updateExists(newvalue) {
      if (newvalue === true) {
        this.refreshApp()
      }
    }
  },
  components: {
    SessionExpire: () => import('@/components/Auth/SessionExpire'), // check session expire
    NavDrawer: () => import('@/components/Layout/NavDrawer'), // contact left menu
    NavDrawerClient: () => import('@/components/Layout/NavDrawerClient'), // client left menu
    NavDrawerAdmin: () => import('@/components/Layout/NavDrawerAdmin'), // admin left menu
    AdminContactView,
    AdminClientView
  },
  created() {
    // serviced worker
    // Listen for our custom event from the SW registration
    document.addEventListener('swUpdated', this.updateAvailable, { once: true })

    // Prevent multiple refreshes
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return
      this.refreshing = true
      // Here the actual reload of the page occurs
      window.location.reload()
    })
  },
  computed: {
    jwt() {
      return this.$store.state.auth.jwt
    },
    user() {
      return this.$store.state.auth.user
    },
    admin() {
      return this.$store.state.auth.admin
    },
    company() {
      return this.$store.state.company.company
    }
  },
  methods: {
    logout() {
      func.logout()
    },
    // service worker
    // Store the SW registration so we can send it a message
    // We use `updateExists` to control whatever alert, toast, dialog, etc we want to use
    // To alert the user there is an update they need to refresh for
    updateAvailable(event) {
      this.registration = event.detail
      this.updateExists = true
    },

    // Called when the user accepts the update
    refreshApp() {
      this.updateExists = false
      // Make sure we only send a 'skip waiting' message if the SW is waiting
      if (!this.registration || !this.registration.waiting) return
      // send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  }
}
</script>

<style>

</style>
