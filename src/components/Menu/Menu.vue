<template>
<v-card class="menu-item" :class="$vuetify.breakpoint.mobile ? 'pa-2' : 'pa-4' || {'on-hover' : 'hover'}"  style="border-radius: 8px" :height="$vuetify.breakpoint.mobile ? '220px' : '370px'"
@click="(e) => { $router.push({ name: 'MenuDetail', params: { id: menu.id } }) }">
              <v-menu offset-y bottom left :close-on-content-click="true">
      <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="none"
                        icon
                        :height="$vuetify.breakpoint.mobile ? '20px' : ''"
                  v-bind="attrs"
                  v-on="on"
                  class="options"
                      >
                        <v-icon
                          color="white"
                         :size="$vuetify.breakpoint.mobile ? '16px' : ''">mdi-dots-vertical</v-icon>
                      </v-btn>
      </template>
      <v-list class="menu-bar" v-if="user && user.role.id === 5">
         <v-list-item >
              <v-btn
        text
        v-if="menu.isFav === false"
          >
          <span > <v-icon class="primary-color" >mdi-cards-heart-outline</v-icon> Add a quotation</span>
           </v-btn>
             <v-btn
        text
        v-else
          >
          <span > <v-icon class="primary-color">mdi-cards-heart</v-icon> Remove from favorite</span>
           </v-btn>
        </v-list-item>
                 <v-list-item>
         <CommentForm :menu="menu" :add="true" />
        </v-list-item>
      </v-list>
      <v-list class="menu-bar" v-else>
         <v-list-item>
                <v-btn
        text
      @click="(e) => { $router.push({ name: 'MenuDetail', params: { id: menu.id } }) }"
          >
        <span > <v-icon >mdi-plus</v-icon> Add menu items</span>
           </v-btn>
        </v-list-item>
        <v-list-item>
            <MenuForm :edit="true" :editmenu="menu"/>
        </v-list-item>
        <v-list-item>
              <v-btn
        text
        @click.prevent="deleteMenu(menu.id)"
          >
          <span > <v-icon >mdi-delete-outline</v-icon> Delete</span>
           </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <h6 v-if="$route.name === 'FavMenus'" class="text-h6 mb-3">{{ menu.company.name }}</h6>
    <div class="d-flex justify-center">
       <img v-if="menu.image" :class="$vuetify.breakpoint.mobile ? 'menu-img-res' : 'menu-img'" :src="menu.image.url" :alt="menu.name">
    </div>
    <div>
      <div class="d-flex justify-space-between" v-if="user && user.role.id === 5">
         <h4 class="menu-title mt-2" :class="$vuetify.breakpoint.mobile ? 'text-h6' : 'text-h4'"> {{ menu.name }}</h4>
         <v-icon v-if="menu.isFav" class="d-flex align-center primary-color" >mdi-cards-heart</v-icon>
          <v-icon v-else class="d-flex align-center primary-color" >mdi-cards-heart-outline</v-icon>
      </div>
       <div class="d-flex justify-space-between" v-else>
         <h4 class="menu-title mt-2" :class="$vuetify.breakpoint.mobile ? 'text-h6' : 'text-h4'"> {{ menu.name }}</h4>
      </div>
          <p class="text-content menu-des">{{ menu.description }}</p>
    </div>
        </v-card>
</template>

<script>
import MenuForm from '@/components/Menu/MenuForm'
import CommentForm from '@/components/Menu/CommentForm'
import * as func from '@/utils/function'
export default {
  name: 'Menu',
  props: ['menu'],
  components: { MenuForm, CommentForm },
  data() {
    return {
      close: true
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    event() {
      return this.$store.state.event.event
    },
    menus() {
      return this.$store.state.menu.menus
    }
  },
  methods: {
    deleteMenu(id) {
      this.$store.dispatch('menu/deleteMenu', id)
        .then(() => {
          this.$store.dispatch('company/getCompany', this.$store.state.company.company.id)
        })
    },
    addFav(item) {
      this.event.fav_menus.push(item)
      const eventForm = { id: this.event.id, fav_menus: this.event.fav_menus }
      this.$store.dispatch('event/updateEvent', eventForm) // handle add favorites menu
        .then(() => {
          this.$store.dispatch('menu/getMenus', '?_sort=name:asc') // reload the menus list
            .then(() => {
              func.checkFav(this.menus, this.event.fav_menus)
            })
        })
    },
    removeFav(item) { // handle remove the item form the fav list
      this.event.fav_menus = this.event.fav_menus.filter(menu => menu.id !== item.id)
      const eventForm = { id: this.event.id, fav_menus: this.event.fav_menus }
      this.$store.dispatch('event/updateEvent', eventForm)
        .then(() => {
          this.$store.dispatch('menu/getMenus', '?_sort=name:asc')
            .then(() => {
              func.checkFav(this.menus, this.event.fav_menus)
            })
        })
    }
  }
}
</script>

<style>

</style>
