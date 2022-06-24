<template>
<v-dialog
    v-model="show"
    :width="$vuetify.breakpoint.mobile ? '100vw' : '50vw'"
     >
      <v-card  class="d-flex justify-center align-center pa-8" style="overflow: hidden">
         <v-row class="text-center">
           <v-col cols="12">
             <v-icon  class="text-h1 primary-color">mdi-timer-off-outline</v-icon>
           </v-col>
    <v-col cols="12">
      <h2 class="text-h2">
      Your session has expired
    </h2>
    </v-col>
     <v-col cols="12">
       <p>Please refresh the page.</p>
       <p>Dont't worry, we kept all of your filters and breakdowns in place.</p>
     </v-col>
      <v-col  cols="12">
         <v-btn color="auth" @click="logout">Refresh</v-btn>
      </v-col>
  </v-row>
      </v-card>
</v-dialog>
</template>

<script>
import * as func from '@/utils/function.js'
export default {
  name: 'SessionExpire',
  data() {
    return {
      show: false // shoe the popup
    }
  },
  computed: {
    session() {
      return this.$store.getters['auth/expired'] // check if the session is expired true/false
    }
  },
  watch: {
    $route(to) {
      this.checkSession() // check session everytime change the page
      if (to.name === 'Login') {
        this.show = false
      }
    }
  },
  created() {
    this.checkSession()
  },
  methods: {
    logout() {
      func.logout() // do all the stuff regarding to logout
    },
    checkSession() {
      if (this.session === true) { // if session is expired
        this.show = true // show the pop up
      }
    }
  }
}
</script>

<style>

</style>
