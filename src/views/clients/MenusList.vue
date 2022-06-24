<template>
<v-container class="menus" :class="$vuetify.breakpoint.mobile ? 'max-width' : 'table-width'">
    <div class="filter-ct d-flex justify-space-between">
      <div class="select-field d-flex">Filter by type:
        <v-select
     solo
      v-model="filter"
      :items="event_cs"
       :label="$i18n.t('auth.CuisineType')"
         @change="selectChange(filter)"
      item-text="name"
      item-value="name"
    ></v-select>
      </div>
      <!--<div class="select-field d-flex">Sort by:
         <v-select
     solo
      v-model="sort"
      :items="sortOptions"
         @change="sortBy(sort)"
    >
    <template #item="{ item }">
      {{item.name }}<v-icon>{{getIcon(item.val)}}</v-icon>
    </template>
    <template #selection="{ item }">
      {{item.name }}<v-icon>{{getIcon(item.val)}}</v-icon>
    </template>
    </v-select>
      </div>-->
    </div>
  <v-data-table
    :mobile-breakpoint="0"
    :headers="headers"
    :items="menus"
    :items-per-page="10"
    class="elevation-1"
  >
  <template v-slot:[`item`] = "{ item }">
    <!--hover on row to display edit/delete buttons-->
    <tr style="height: 120px !important;" @click="viewMenu(item.id)"
      >
       <td >
       <h6 class="text-h6">{{ item.company.name }}</h6></td>
       <td>
          <img v-if="item.image" :class="$vuetify.breakpoint.mobile ? 'menu-img-res' : 'menu-img'" :src="item.image.url" :alt="item.name">
       </td>
      <td  >
         <h6 class="text-h6">{{ item.name }}</h6>
        <p v-if="item.description">{{ item.description }}</p>
        </td>

           <td   v-if="item.cuisine_types.length > 0 && item.cuisine_types.length <= 3">
            <span disabled v-for="(ct, i) in item.cuisine_types" :key="i" class="cs">
            {{ ct.name }}
          </span>

        </td>
        <td v-else-if="item.cuisine_types.length > 3">
          <template v-for="(ct, i) in item.cuisine_types">
             <span disabled v-if="i < 3" :key="i" class="cs ma-1">
            {{ ct.name }}
          </span>
          </template>
            <span class="cs ma-1">...</span>
        </td>
        <td v-else></td>
                <td>€ {{Number(item.price).toFixed(2)}}</td>
        <td>
       <span
        v-if="item.isFav === false"
          >
         <v-icon class="primary-color" >mdi-cards-heart-outline</v-icon>
           </span>
             <span
        v-else
          >
        <v-icon class="primary-color">mdi-cards-heart</v-icon>
           </span>
           </td>
           <td>
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
                         :size="$vuetify.breakpoint.mobile ? '16px' : ''">mdi-dots-vertical</v-icon>
                      </v-btn>
      </template>
      <v-list class="menu-bar" v-if="user && user.role.id === 5">
         <v-list-item >
              <v-btn
        text
        @click.prevent="addFav(item)"
        v-if="item.isFav === false"
          >
          <span > <v-icon class="primary-color" >mdi-cards-heart-outline</v-icon> Add a quotation</span>
           </v-btn>
             <v-btn
        text
        @click.prevent="removeFav(item)"
        v-else
          >
          <span > <v-icon class="primary-color">mdi-cards-heart</v-icon> Remove from favorite</span>
           </v-btn>
        </v-list-item>
                 <v-list-item>
         <CommentForm :menu="item" :add="true" />
        </v-list-item>
      </v-list>
           </v-menu>
           </td>

    </tr>
  </template>

  </v-data-table>

    <v-row class="d-flex mt-3" v-if="admin || user.role.id === 5">
      <v-col class="d-flex justify-start">
        <v-btn
          :class="`base-btn ${$vuetify.breakpoint.name} discard`"
          @click="(e) => { $router.go(-1) }"
        >
          <v-icon>mdi-arrow-left</v-icon>
          {{ $i18n.t('auth.Cancel') }}
        </v-btn>
      </v-col>
  </v-row>

  <!--<div  :class="$vuetify.breakpoint.mobile || admin ? 'max-width ' : 'fixed-width'">
    <div class="filter-ct d-flex justify-space-between">
      <div class="select-field d-flex">Filter by type:
        <v-select
     solo
      v-model="filter"
      :items="event_cs"
       :label="$i18n.t('auth.CuisineType')"
         @change="selectChange(filter)"
      item-text="name"
      item-value="name"
    ></v-select>
      </div>
      <div class="sort-field d-flex">Sort by:
         <v-text-field
      v-model="searchValue"
      required
     v-on:keyup.enter="getAllMenus(searchValue)"
    ></v-text-field>
      </div>
    </div>
    <template  v-for="(comp, i) in companies" >
      <div  class="company-menus mb-4 pa-4" v-if="comp.menus.length > 0" :key="i">
         <h4 class="text-h4 mb-4">{{ comp.name }}</h4>
         <v-row class="d-flex">
           <template v-for="(item, i) in menus">
             <v-col v-if="item.company.name === comp.name" :cols="$vuetify.breakpoint.mobile ? '6' : '4'"  :key="i" >
        <v-hover >
           <Menu :menu="item"/>
        </v-hover>
             </v-col>
           </template>
    </v-row>
      </div>
    </template>
  </div>-->

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
import * as func from '@/utils/function'
import CommentForm from '@/components/Menu/CommentForm'
export default {
  name: 'MenusList',
  components: { CommentForm },
  data() {
    return {
      // page: 1,
      // lastpage: null,
      searchValue: '',
      filter: null,
      event_cs: [],
      snackbar: false,
      msg: '',
      sort: null,
      sortOptions: [
        { id: 1, name: 'Price', field: 'price', val: 'asc' },
        { id: 2, name: 'Price', field: 'price', val: 'desc' },
        { id: 3, name: 'Name', field: 'name', val: 'asc' },
        { id: 4, name: 'Name', field: 'name', val: 'desc' }
      ],
      // menus
      headers: [
        {
          text: 'FOODTRUCK',
          align: 'start',
          value: 'company',
          class: 'grey'
        },
        {
          text: 'PROPOSAL MENUS',
          align: 'start',
          value: 'image',
          class: 'grey',
          width: '10%'
        },
        {
          text: '',
          align: 'start',
          value: 'name',
          class: 'grey'
        },
        {
          text: 'TYPE OF CUISINE',
          value: 'cuisine_types',
          class: 'grey'
        },
        {
          text: 'PRICE',
          value: 'price',
          class: 'grey',
          width: '10%'
        },
        {
          text: '',
          value: 'isFav',
          class: 'grey'
        },
        {
          text: '',
          value: '',
          class: 'grey'
        }
      ]
    }
  },
  computed: {
    menus() {
      return this.$store.state.menu.menus
    },
    user() {
      return this.$store.state.user.user
    },
    admin() {
      return this.$store.state.auth.admin
    },
    event() {
      return this.$store.state.event.event
    },
    companies() {
      return this.$store.state.company.companies
    },
    cuisinetypes() {
      return this.$store.state.cuisinetypes.cuisinetypes
    }
  },
  watch: {
    $route(to) {
      if (to.name === 'MenusList') {
        this.noti()
        this.getAllMenus()
        this.getCompanies()
        this.getEvent(this.$route.params.event)
        this.searchValue = ''
        this.filter = null
      }
    }
  },
  mounted() {
    this.noti()
    this.getAllMenus()
    this.getCompanies()
    this.getEvent(this.$route.params.event)
  },
  methods: {
    getEvent(id) {
      this.event_cs = []
      this.$store.dispatch('event/getEvent', id) // get event
        .then(res => {
          if (res.data.cuisine_types.length === 0) { // if the cuisine_types of event is empty, add all the cuisine_types to the event for filter
            this.event_cs = this.cuisinetypes
          } else {
            this.event_cs = res.data.cuisine_types // return the event cuisine_types
          }
          if (this.event_cs[0].id !== -1) { // add all filter
            this.event_cs.unshift({ id: -1, name: 'All' })
          }
        })
    },
    getCompanies() {
      this.$store.dispatch('company/getCompanies', '?_where[category.id]=2&_sort=name:asc')
    },
    getAllMenus(searchValue) {
      this.$store.dispatch('menu/getMenus', `?_sort=name:asc&searchValue=${this.searchValue}`)
        .then(() => {
          func.checkFav(this.menus, this.event.fav_menus) // check if the menu is on the event's fav_menus
          this.menus.sort(function(a, b) {
            return a.id - b.id
          })
        })
    },
    selectChange(event) { // handle fiilter by cuisine type
      if (event === 'All') {
        this.$store.dispatch('menu/getMenus', '?_sort=name:asc')
      } else {
        this.$store.dispatch('menu/getMenus', `?_where[cuisine_types.name]=${event}`)
      }
    },
    sortBy(sort) { // handle sorting
      this.$store.dispatch('menu/getMenus', `?_sort=${sort.field}:${sort.val}`)
    },
    addFav(item) { // add fav menu
      this.event.fav_menus.push(item)
      const eventForm = { id: this.event.id, fav_menus: this.event.fav_menus }
      this.$store.dispatch('event/updateEvent', eventForm)
        .then(() => {
          this.msg = `Menu ${item.name} added to favorite list!`
          this.snackbar = true
          this.$store.dispatch('menu/getMenus', '?_sort=name:asc')
            .then(() => {
              func.checkFav(this.menus, this.event.fav_menus)
            })
        })
    },
    removeFav(item) { // remove fav menu
      this.event.fav_menus = this.event.fav_menus.filter(menu => menu.id !== item.id)
      const eventForm = { id: this.event.id, fav_menus: this.event.fav_menus }
      this.$store.dispatch('event/updateEvent', eventForm)
        .then(() => {
          this.msg = `Menu ${item.name} removed from favorite list!`
          this.snackbar = true
          this.$store.dispatch('menu/getMenus', '?_sort=name:asc')
            .then(() => {
              func.checkFav(this.menus, this.event.fav_menus)
            })
        })
    },
    noti() { // snackbar notification
      this.msg = 'Choose your favorite menu now!'
      this.snackbar = true
    },
    getIcon(item) { // display the icon on sorting list
      if (item === 'asc') {
        return 'mdi-arrow-up'
      } else {
        return 'mdi-arrow-down'
      }
    },
    viewMenu(id) {
      this.$router.push({ name: 'MenuDetail', params: { id: id } })
    }
  }
}
</script>

<style scoped>
.v-card:hover {
  background-color: rgba(90, 232, 170, 0.45);
 }
.menu-img {
  width: 100px;
  object-fit: cover;
  height: 100px;
  border-radius: 18px;
}

</style>
