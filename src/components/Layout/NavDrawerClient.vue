<template>
<!--left menu for admin-->
      <v-list
        dense
        nav
        class="left-menu "
      >
        <v-list-item>
      <v-expansion-panels focusable v-model="panel">
    <v-expansion-panel
    >
      <v-expansion-panel-header style="background-color: #2D2D2D; border: none">
        <!--<h3 class="text-h3 ml-4" style="color: grey">{{ $i18n.t('admin.Users') }}</h3></v-expansion-panel-header>-->
         <h3 class="text-h3 ml-4" style="color: grey">General</h3></v-expansion-panel-header>
      <v-expansion-panel-content  style="background-color: #2D2D2D; border: none">
        <v-list>
        <v-list-item
          v-for="item in general"
          :key="item.name"
            @click="confirm(item)"
        >
           <v-list-item-icon>
           <img  :src="item.icon" width="20px" height="20px" :class="$route.path === item.path ? 'primary-color' : ''">
         </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title :class="[$route.path === item.path ? 'text-h6 primary-color' : 'text-h6 tertiary-color']">{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
        </v-list-item>
        <v-dialog
    v-model="show"
    :width="$vuetify.breakpoint.mobile ? '100vw' : '50vw'"
     >
      <v-card  class="d-flex justify-center align-center pa-8" >
        <v-row class="d-flex justify-center">
          <v-col cols="12" class="d-flex justify-center">
            <h4 class="text-h4 text-center">{{ $i18n.t('admin.Confirm')}}</h4>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn :class="`base-btn ${$vuetify.breakpoint.name} discard-form mr-4`" @click.prevent="show = false">Cancel</v-btn>
             <v-btn :class="`base-btn ${$vuetify.breakpoint.name} save ml-4`" @click="changeRoute">Leave this page</v-btn>
          </v-col>
        </v-row>
      </v-card>
</v-dialog>
      </v-list>
</template>

<script>
export default {
  name: 'NavDrawerClient',
  data() {
    return {
      general: [
        { name: 'Portfolio', path: '/client', icon: require('@/assets/image/auth/briefcase 1.svg'), icon2: require('@/assets/image/auth/briefcase 1.svg') },
        { name: 'Events', path: '/events', icon: require('@/assets/image/auth/event 1.svg'), icon2: require('@/assets/image/auth/event 1.svg') }
      ],
      show: false,
      toRoute: null,
      panel: 0
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    isSaved() {
      return this.$store.state.auth.isSaved
    }
  },
  methods: {
    confirm(item) {
      if (this.$route.path === '/client') {
        if (this.isSaved === false) {
          this.show = true
          this.toRoute = item.path
        } else {
          this.$router.push(item.path)
        }
      } else {
        this.$router.push(item.path)
      }
    },
    changeRoute() {
      this.show = false
      this.$router.push(this.toRoute)
    }
  }
}
</script>

<style>

</style>
