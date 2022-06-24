<template>
<v-card
    class="mx-auto"
    tile
  >
  <v-list-item >
   <h3 class="text-h3 mt-4 " >{{ $i18n.t('auth.Society') }}</h3>
   </v-list-item>
    <v-list-item v-for="(item) in infoMenus" :key="item.name" @click="confirm(item)">
      <v-list-item-content>
        <v-list-item-title :class="$route.path === item.path ? 'primary-color' : ''">{{ $i18n.t(`${item.placeholder}`) }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
     <v-list-item>
   <h3 class="text-h3 mt-4" >{{ $i18n.t('auth.Menu&Foodtruck') }}</h3>
   </v-list-item>
    <v-list-item v-for="(item) in menus" :key="item.name" @click="confirm(item)">
      <v-list-item-content>
        <v-list-item-title :class="$route.path === item.path ? 'primary-color' : ''">{{ $i18n.t(`${item.placeholder}`) }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
   <v-list-item>
    <h3 class="text-h3 mt-4" >{{ $i18n.t('auth.Requests') }}</h3>
   </v-list-item>
    <v-list-item v-for="(item) in requests" :key="item.name" @click="confirm(item)">
      <v-list-item-content>
        <v-list-item-title :class="$route.path === item.path ? 'primary-color' : ''">{{ $i18n.t(`${item.placeholder}`) }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
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
      infoMenus: [
        { name: 'Company', path: '/company', placeholder: 'auth.Step1', icon: require('@/assets/image/auth/left1.svg'), icon2: require('@/assets/image/auth/buildings.svg') },
        { name: 'Bank', path: '/bank', placeholder: 'auth.Step2', icon: require('@/assets/image/auth/left2.svg'), icon2: require('@/assets/image/auth/money-check-dollar-pen.svg') },
        { name: 'Contact', path: '/contact', placeholder: 'auth.Step3', icon: require('@/assets/image/auth/left3.svg'), icon2: require('@/assets/image/auth/address-book.svg') }
      ],
      menus: [
        { name: 'Foodtrucks', path: '/foodtrucks', placeholder: 'auth.Menu3', icon: require('@/assets/image/auth/left2.svg'), icon2: require('@/assets/image/auth/money-check-dollar-pen.svg') },
        { name: 'CuisineType', path: '/cuisine-type', placeholder: 'auth.Menu1', icon: require('@/assets/image/auth/left4.svg'), icon2: require('@/assets/image/auth/hat-chef.svg') },
        { name: 'Menus', path: '/menus', placeholder: 'auth.Menu2', icon: require('@/assets/image/auth/left2.svg'), icon2: require('@/assets/image/auth/money-check-dollar-pen.svg') }
      ],
      requests: [
        { name: 'Proposal requests', path: '/requests', placeholder: 'auth.Request', icon: require('@/assets/image/auth/left2.svg'), icon2: require('@/assets/image/auth/money-check-dollar-pen.svg') }
      ],
      show: false,
      toRoute: null
    }
  },
  methods: {
    confirm(item) {
      if (this.$route.path === '/company' || this.$route.path === '/bank' || this.$route.path === '/cuisine-type') {
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
