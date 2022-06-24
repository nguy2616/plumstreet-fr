<template>
<v-card
    class="mx-auto"
    tile
  >
  <v-list-item >
   <h3 class="text-h3 mt-4 " >{{ $i18n.t('admin.Users') }}</h3>
   </v-list-item>
    <v-list-item v-for="(item) in general" :key="item.name" @click="confirm(item)">
      <v-list-item-content>
        <v-list-item-title :class="$route.path === item.path ? 'primary-color' : ''">{{ $i18n.t(`${item.placeholder}`) }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
     <!--<v-list-item>
   <h3 class="text-h3 mt-4" >{{ $i18n.t('auth.Menu&Foodtruck') }}</h3>
   </v-list-item>
    <v-list-item v-for="(item) in clientmenus" :key="item.name" @click="confirm(item)">
      <v-list-item-content>
        <v-list-item-title :class="$route.path === item.path ? 'primary-color' : ''">{{ $i18n.t(`${item.placeholder}`) }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>-->
<!--popup to confirm leave page-->
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
</v-card>

</template>

<script>
export default {
  name: 'AdminContactView',
  data() {
    return {
      general: [
        { name: 'Portfolio', path: '/client', icon: require('@/assets/image/auth/briefcase 1.svg'), icon2: require('@/assets/image/auth/briefcase 1.svg') },
        { name: 'Events', path: '/events', icon: require('@/assets/image/auth/event 1.svg'), icon2: require('@/assets/image/auth/event 1.svg') }
      ],
      show: false,
      toRoute: null
    }
  },
  methods: {
    confirm(item) {
      if (this.$route.path === '/client' || this.$route.path === '/event') {
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
  },
  computed: {
    isSaved() {
      return this.$store.state.auth.isSaved
    }
  }
}
</script>

<style scoped>
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
  background-color: #F8FAFD;
}
.theme--light.v-list-item--active::before {
    opacity: 0;
}
</style>
