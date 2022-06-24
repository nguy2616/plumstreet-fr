<template>
  <v-app-bar app clipped-left  color="#434343" >
     <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
        <v-menu offset-y>
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
          to='/profile'
        >
          <v-list-item-title>
            <v-btn color="none" >
             {{ i18n.t('auth.Profile') }}
            </v-btn>
          </v-list-item-title>
        </v-list-item>
         <v-list-item
          @click="logout"
        >
          <v-list-item-title>
            <v-btn color="none" >
             {{ i18n.t('auth.Logout') }}
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-app-bar>
</template>

<script>
import logout from '@/utils/function.js'
export default {
  name: 'TopBar',
  data() {
    return {
      drawer: false,
      group: null
    }
  },
  computed: {
    jwt() {
      return this.$store.state.auth.jwt
    },
    user() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    logout() {
      logout()
    }
  }
}
</script>

<style>

</style>
