<template>
<v-card
    class="mx-auto"
    tile
  >
  <v-list-item >
   <h3 class="text-h3 mt-4 " >{{ $i18n.t('admin.Users') }}</h3>
   </v-list-item>
    <v-list-item v-for="(item) in general" :key="item.name" :to="item.path">
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
</v-card>

</template>

<script>
export default {
  name: 'RequestsContactView',
  data() {
    return {
      general: [
        { name: 'Contact Information', path: '/client', placeholder: 'client.ClientInfo', icon: require('@/assets/image/auth/left3.svg'), icon2: require('@/assets/image/auth/address-book.svg') },
        { name: 'Event information', path: '/events', placeholder: 'client.EventInfo', icon: require('@/assets/image/auth/left1.svg'), icon2: require('@/assets/image/auth/buildings.svg') },
        { name: 'Favorite menus', path: '/fav-menus', placeholder: 'client.FavMenu', icon: require('@/assets/image/auth/left2.svg'), icon2: require('@/assets/image/auth/money-check-dollar-pen.svg') }
      ]
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
