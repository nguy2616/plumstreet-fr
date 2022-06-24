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
        <h3 class="text-h3 ml-4" style="color: grey">{{ $i18n.t('admin.Users') }}</h3></v-expansion-panel-header>
      <v-expansion-panel-content  style="background-color: #2D2D2D; border: none">
        <v-list>
        <v-list-item
          v-for="item in users"
          :key="item.name"
          :to="item.path"
        >
           <v-list-item-icon>
           <img  :src="$route.path === item.path ? item.icon2 : item.icon" width="20px" height="20px">
         </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title :class="[$route.path === item.path ? 'text-h6 primary-color' : 'text-h6 tertiary-color']">{{ $i18n.t(`${item.placeholder}`) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
        </v-list-item>
         <v-list-item>
      <v-expansion-panels focusable>
    <v-expansion-panel
    >
      <v-expansion-panel-header style="background-color: #2D2D2D; border: none">
        <h3 class="text-h3 ml-4" style="color: grey">{{ $i18n.t('admin.Evenements') }}</h3></v-expansion-panel-header>
      <v-expansion-panel-content  style="background-color: #2D2D2D; border: none">
        <v-list>
        <v-list-item
          v-for="item in evenements"
          :key="item.name"
          :to="item.path"
        >
           <v-list-item-icon>
           <img  :src="$route.path === item.path ? item.icon2 : item.icon" width="20px" height="20px">
         </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title :class="[$route.path === item.path ? 'text-h6 primary-color' : 'text-h6 tertiary-color']">{{ $i18n.t(`${item.placeholder}`) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
        </v-list-item>
      </v-list>
</template>

<script>
export default {
  name: 'NavDrawerAdmin',
  data() {
    return {
      users: [
        { name: 'Foodtrucks', path: '/foodtrucks-list', placeholder: 'admin.Foodtrucks', icon: require('@/assets/image/auth/left1.svg'), icon2: require('@/assets/image/auth/buildings.svg') },
        { name: 'Clients', path: '/clients-list', placeholder: 'admin.Clients', icon: require('@/assets/image/auth/left2.svg'), icon2: require('@/assets/image/auth/money-check-dollar-pen.svg') },
        { name: 'Centres', path: '/centres', placeholder: 'admin.Centres', icon: require('@/assets/image/auth/left3.svg'), icon2: require('@/assets/image/auth/address-book.svg') }
      ],
      evenements: [
        { name: 'Foodtrucks', path: '/foodtrucks-ev', placeholder: 'auth.Menu3', icon: require('@/assets/image/auth/left2.svg'), icon2: require('@/assets/image/auth/money-check-dollar-pen.svg') },
        { name: 'CuisineType', path: '/cuisine-type-ev', placeholder: 'auth.Menu1', icon: require('@/assets/image/auth/left4.svg'), icon2: require('@/assets/image/auth/hat-chef.svg') },
        { name: 'Menus', path: '/menus-ev', placeholder: 'auth.Menu2', icon: require('@/assets/image/auth/left2.svg'), icon2: require('@/assets/image/auth/money-check-dollar-pen.svg') }
      ],
      panel: 0
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  }
}
</script>

<style>

</style>
