<template>
<div>
  <h3 class="text-h3 ml-4" style="color: grey">{{ $i18n.t('auth.Society') }}</h3>
   <v-list>
        <v-list-item
          v-for="item in infoMenus"
          :key="item.name"
        >
          <v-list-item-content>
             <v-list-item-title :class="[$route.name === item.name ? 'text-h6 primary-color' : 'text-h6']" @click="select(item)">{{ $i18n.t(`${item.placeholder}`) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <h3 class="text-h3 ml-4" style="color: grey">{{ $i18n.t('auth.Menu&Foodtruck') }}</h3>
      <v-list>
        <v-list-item
          v-for="item in menus"
          :key="item.name"
        >
          <v-list-item-content>
            <v-list-item-title :class="[$route.name === item.name ? 'text-h6 primary-color' : 'text-h6']" @click="select(item)">{{ $i18n.t(`${item.placeholder}`) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
</div>
</template>

<script>
export default {
  name: 'LeftMenu',
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
      ]
    }
  },
  methods: {
    select(val) {
      console.log(val)
    }
  }
}
</script>
``
<style>

</style>
