<template>
<v-container fluid class="menu-detail-page " v-if="menu">
  <v-container class="menu-detail pa-2" :class="$vuetify.breakpoint.mobile || admin ? 'max-width' : 'fixed-width'">
    <div class="d-flex justify-end">
      <v-btn  color="none" @click="close">
      <v-icon >mdi-close</v-icon>
    </v-btn>
    </div>
  <v-row :class="$vuetify.breakpoint.mobile ? 'menu-header-res ma-4' :'menu-header ma-10 pa-4 pl-10'">
    <v-col cols="6" >
       <h2 class="menu-title" :class="$vuetify.breakpoint.mobile ? 'text-h4' :'text-h2'">{{ menu.name }}</h2>
    <p class="menu-des">{{ menu.description }}</p>
    </v-col>
    <v-col cols="6" class="d-flex justify-center">
      <img v-if="menu.image" :src="menu.image.url" class="menu-img">
    </v-col>
  </v-row>
  <!--contact view-->
<div v-if="admin || user.role.id === 4">
   <div :class="$vuetify.breakpoint.mobile ? 'mx-4 mt-5' :'ma-5'"  v-for="(group, i) in menuGroups" :key="i">
     <h2 class="group-title mb-5" :class="$vuetify.breakpoint.mobile ? 'text-h4' :'text-h2'">{{$i18n.t('menu.Starters')}}  </h2>
      <div>
        <draggable v-model="menu.menu_items" :group="group"  @start="drag=true" @end="drag=false" @change="onChange(menu.menu_items)">
         <template v-for="(item, i) in menu.menu_items">

              <v-hover v-if="item.menu_item_group === group.id" :key="i">
              <MenuItem  :item="item"  />
          </v-hover>

        </template>
         </draggable>
        <MenuItemForm  :add="true" :group="group" />
      </div>
    </div>
</div>
<!--client view-->
<div v-else-if="user.role.id === 5">
  <!--starters-->
  <div :class="$vuetify.breakpoint.mobile ? 'mx-4 mt-5' :'mx-16 mt-5'"  v-if="starters.length > 0" >
      <div>
        <span class="d-flex justify-space-between">
             <h2 class="group-title mb-5" :class="$vuetify.breakpoint.mobile ? 'text-h4' :'text-h2'">{{$i18n.t('menu.Starters')}}  </h2>
              <span class="d-flex align-center" ><span v-if="all === false">Select all</span>
              <span v-else>Deselect all</span>
              <v-icon v-if="all === false"  class="primary-color ml-2"  @click.prevent="addFavAll">mdi-cards-heart-outline</v-icon>
              <v-icon v-else  class="primary-color ml-2"  @click.prevent="removeFavAll">mdi-cards-heart</v-icon>
              </span>
        </span>

         <template v-for="(item, i) in starters">
           <v-row class="d-flex" :key="i" >
                       <v-col cols="11">
                       <v-hover :key="i">
              <MenuItem  :item="item"  />
          </v-hover>
                       </v-col>
 <v-col >
             <v-icon class="primary-color" v-if="item.isFav" @click.prevent="removeFav(item)">mdi-cards-heart</v-icon>
              <v-icon class="primary-color" v-else @click.prevent="addFav(item)">mdi-cards-heart-outline</v-icon>
                    </v-col>
           </v-row>

        </template>
      </div>
    </div>
<!--main dishesh-->
  <div :class="$vuetify.breakpoint.mobile ? 'mx-4 mt-5' :'mx-16 mt-5'"  v-if="maindishes.length > 0" >
      <div>
        <span class="d-flex justify-space-between">
             <h2 class="group-title mb-5" :class="$vuetify.breakpoint.mobile ? 'text-h4' :'text-h2'">{{$i18n.t('menu.Main dishes')}}  </h2>
              <span class="d-flex align-center" v-if="starters.length === 0"><span v-if="all === false">Select all</span>
              <span v-else>Deselect all</span>
              <v-icon v-if="all === false"  class="primary-color ml-2"  @click.prevent="addFavAll">mdi-cards-heart-outline</v-icon>
              <v-icon v-else  class="primary-color ml-2"  @click.prevent="removeFavAll">mdi-cards-heart</v-icon>
              </span>
        </span>

         <template v-for="(item, i) in maindishes">
           <v-row class="d-flex" :key="i" >
                       <v-col cols="11">
                       <v-hover :key="i">
              <MenuItem  :item="item"  />
          </v-hover>
                       </v-col>
 <v-col >
             <v-icon class="primary-color" v-if="item.isFav" @click.prevent="removeFav(item)">mdi-cards-heart</v-icon>
              <v-icon class="primary-color" v-else @click.prevent="addFav(item)">mdi-cards-heart-outline</v-icon>
                    </v-col>
           </v-row>

        </template>
      </div>
    </div>
<!--desserts-->
     <div :class="$vuetify.breakpoint.mobile ? 'mx-4 mt-5' :'mx-16 mt-5'"  v-if="desserts.length > 0" >
      <div>
        <span class="d-flex justify-space-between">
             <h2 class="group-title mb-5" :class="$vuetify.breakpoint.mobile ? 'text-h4' :'text-h2'">{{$i18n.t('menu.Desserts')}}  </h2>
              <span class="d-flex align-center" v-if="starters.length === 0 && maindishes.length === 0"><span v-if="all === false">Select all</span>
              <span v-else>Deselect all</span>
              <v-icon v-if="all === false"  class="primary-color ml-2"  @click.prevent="addFavAll">mdi-cards-heart-outline</v-icon>
              <v-icon v-else  class="primary-color ml-2"  @click.prevent="removeFavAll">mdi-cards-heart</v-icon>
              </span>
        </span>

         <template v-for="(item, i) in desserts">
           <v-row class="d-flex" :key="i" >
                       <v-col cols="11">
                       <v-hover :key="i">
              <MenuItem  :item="item"  />
          </v-hover>
                       </v-col>
 <v-col >
             <v-icon class="primary-color" v-if="item.isFav" @click.prevent="removeFav(item)">mdi-cards-heart</v-icon>
              <v-icon class="primary-color" v-else @click.prevent="addFav(item)">mdi-cards-heart-outline</v-icon>
                    </v-col>
           </v-row>

        </template>
      </div>
    </div>
<!--drinks-->
     <div :class="$vuetify.breakpoint.mobile ? 'mx-4 mt-5' :'mx-16 mt-5'"  v-if="drinks.length > 0" >
      <div>
        <span class="d-flex justify-space-between">
             <h2 class="group-title mb-5" :class="$vuetify.breakpoint.mobile ? 'text-h4' :'text-h2'">{{$i18n.t('menu.Drinks')}}  </h2>
              <span class="d-flex align-center"  v-if="starters.length === 0 && maindishes.length === 0 && desserts.length === 0" ><span v-if="all === false">Select all</span>
              <span v-else>Deselect all</span>
              <v-icon v-if="all === false"  class="primary-color ml-2"  @click.prevent="addFavAll">mdi-cards-heart-outline</v-icon>
              <v-icon v-else  class="primary-color ml-2"  @click.prevent="removeFavAll">mdi-cards-heart</v-icon>
              </span>
        </span>

         <template v-for="(item, i) in maindishes">
           <v-row class="d-flex" :key="i" >
                       <v-col cols="11">
                       <v-hover :key="i">
              <MenuItem  :item="item"  />
          </v-hover>
                       </v-col>
 <v-col >
             <v-icon class="primary-color" v-if="item.isFav" @click.prevent="removeFav(item)">mdi-cards-heart</v-icon>
              <v-icon class="primary-color" v-else @click.prevent="addFav(item)">mdi-cards-heart-outline</v-icon>
                    </v-col>
           </v-row>

        </template>
      </div>
    </div>
 <v-textarea
        solo
        rows="3"
          :label="$i18n.t('menu.Comment')"
          v-model="comment"
          class="mt-5"
        ></v-textarea>
</div>

</v-container>
 <v-container :class="`bottom d-flex ${$vuetify.breakpoint.mobile && 'full-width'}`" >
      <!--<v-col class="d-flex justify-end">
        <v-btn
            @click="(e) => { $router.go(-1) }"
            :class="`base-btn ${$vuetify.breakpoint.name} discard`"
          >
            <v-icon>mdi-arrow-left</v-icon>
            {{ $i18n.t('auth.Cancel')}}
          </v-btn>
      </v-col>-->
       <v-col class="d-flex justify-center">
           <v-btn
            @click="save"
            :class="`base-btn ${$vuetify.breakpoint.name} save`"
          >
            {{ $i18n.t('auth.Save')}}
          </v-btn>
      </v-col>
    </v-container>
     <!--snackbar-->
   <v-snackbar
      :timeout="2000"
      v-model="snackbar"
      centered
      top
      color="success"
    >
      {{ msg }}
    </v-snackbar>
</v-container>
</template>

<script>
import MenuItem from '@/components/Menu/MenuItem'
import MenuItemForm from '@/components/Menu/MenuItemForm'
import draggable from 'vuedraggable'
import * as func from '@/utils/function'
export default {
  name: 'MenuDetail',
  components: { MenuItem, MenuItemForm, draggable },
  data() {
    return {
      msg: '',
      snackbar: false,
      all: false,
      menuGroups: [],
      starters: [],
      maindishes: [],
      desserts: [],
      drinks: [],
      comment: ''
    }
  },
  computed: {
    company() {
      return this.$store.state.company.company
    },
    admin() {
      return this.$store.state.auth.admin
    },
    user() {
      return this.$store.state.auth.user
    },
    event() {
      return this.$store.state.event.event
    },
    menu() {
      return this.$store.state.menu.menu
    }
  },
  mounted() {
    this.getMenuGroup()
    this.getMenu()
  },
  methods: {
    getMenu() {
      this.resetGroupMenu()
      this.$store.dispatch('menu/getMenu', this.$route.params.id)
        .then(() => {
          func.checkFav(this.menu.menu_items, this.event.fav_menu_items)
          this.groupItemByGroup(this.menu.menu_items, this.starters, 4)
          this.groupItemByGroup(this.menu.menu_items, this.maindishes, 5)
          this.groupItemByGroup(this.menu.menu_items, this.desserts, 6)
          this.groupItemByGroup(this.menu.menu_items, this.drinks, 7)
          if (this.menu.note) {
            this.comment = this.menu.note.content
          }
        })
    },
    getMenuGroup() {
      this.$store.dispatch('menuItemGroup/getMenuItemGroups', '?_sort=order:asc')
        .then(res => {
          this.menuGroups = res.data
          console.log(this.menuGroups)
        })
    },
    save() {
      if (this.user.role.id !== 5) {
        this.$store.dispatch('menu/updateMenu', { id: this.menu.id, menu_items: this.menu.menu_items })
          .then(() => {
            this.$router.push('/menus')
          })
      } else {
        if (this.menu.note) { // edit current comment
          const cmt = { id: this.menu.note.id, content: this.comment }
          this.$store.dispatch('comment/updateComment', cmt)
            .then(res => {
              this.comment = ''
              this.close()
            })
        } else { // add new comment
          const commentForm = { menu: this.menu.id, content: this.comment, author: this.user }
          this.$store.dispatch('comment/createComment', commentForm)
            .then(() => {
              this.comment = ''
              this.close()
            })
        }
      }
    },
    onChange(key) {
      this.menu.menu_items = key
    },
    close() {
      this.$store.commit('menu/setMenu', null)
      this.$router.go(-1)
    },
    addFav(item) {
      this.event.fav_menu_items.push(item)
      const eventForm = { id: this.event.id, fav_menu_items: this.event.fav_menu_items }
      this.$store.dispatch('event/updateEvent', eventForm)
        .then(() => {
          this.msg = `Item ${item.name} added to favorite list!`
          this.snackbar = true
          item.isFav = true
          this.addMenuFav(this.menu.id)
        })
    },
    removeFav(item) {
      this.event.fav_menu_items = this.event.fav_menu_items.filter(fav => fav.id !== item.id)
      const eventForm = { id: this.event.id, fav_menu_items: this.event.fav_menu_items }
      this.$store.dispatch('event/updateEvent', eventForm)
        .then(() => {
          this.msg = `Item ${item.name} removed from favorite list!`
          this.snackbar = true
          item.isFav = false
          this.eventNotHaveAnyItemFromMenu(item.menu)
        })
    },
    eventNotHaveAnyItemFromMenu(menu) {
      const favMenuIds = this.event.fav_menu_items.map(function(obj) {
        return obj.menu
      })
      if (favMenuIds.includes(menu) === false) {
        this.removeFavMenu(menu)
      }
    },
    addFavAll() {
      const favItemIds = this.event.fav_menu_items.map(function(obj) {
        return obj.id
      })
      this.menu.menu_items.forEach(it => {
        if (favItemIds.includes(it.id) === false) {
          this.event.fav_menu_items.push(it)
        }
      })
      const eventForm = { id: this.event.id, fav_menu_items: this.event.fav_menu_items }
      this.$store.dispatch('event/updateEvent', eventForm)
        .then(() => {
          this.msg = 'All items added to favorite list!'
          this.addMenuFav(this.menu.id)
          this.snackbar = true
          this.all = true
          this.menu.menu_items.forEach(item => {
            item.isFav = true
          })
        })
    },
    removeFavAll() {
      const favItemIds = this.event.fav_menu_items.map(function(obj) {
        return obj.id
      })
      this.menu.menu_items.forEach(it => {
        if (favItemIds.includes(it.id) === true) {
          this.event.fav_menu_items = this.event.fav_menu_items.filter(fav => fav.id !== it.id)
        }
      })
      const eventForm = { id: this.event.id, fav_menu_items: this.event.fav_menu_items }
      this.$store.dispatch('event/updateEvent', eventForm)
        .then(() => {
          this.msg = 'All items removed from favorite list!'
          this.snackbar = true
          this.all = false
          this.menu.menu_items.forEach(item => {
            item.isFav = false
          })
          this.removeFavMenu(this.menu.id)
        })
    },
    addMenuFav(menu) {
      const favMenuIds = this.event.fav_menus.map(function(obj) {
        return obj.id
      })
      if (favMenuIds.includes(menu) === false) {
        this.event.fav_menus.push({ id: menu })
        this.$store.dispatch('event/updateEvent', { id: this.event.id, fav_menus: this.event.fav_menus })
      }
    },
    removeFavMenu(menu) {
      this.event.fav_menus = this.event.fav_menus.filter(fav => fav.id !== menu)
      this.$store.dispatch('event/updateEvent', { id: this.event.id, fav_menus: this.event.fav_menus })
    },
    groupItemByGroup(items, group, groupid) {
      items.forEach(item => {
        if (item.menu_item_group === groupid) {
          group.push(item)
        }
      })
    },
    resetGroupMenu() {
      this.starters = []
      this.maindishes = []
      this.desserts = []
      this.drinks = []
    }
  }
}
</script>

<style scoped>
.v-card:hover {
  background-color: rgba(90, 232, 170, 0.45);
}
</style>
