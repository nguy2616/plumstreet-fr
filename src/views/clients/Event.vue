<template>
  <v-row v-if="$vuetify.breakpoint.name !== 'xs' && 'sm'"  class="event-detail pa-4 d-flex">
    <v-col cols="7" class="pa-5">
       <!--fav Menus-->
    <h4 class="menu-cuisinetype text-h4 mb-3">{{ $i18n.t('client.FavFT') }}</h4>
    <v-data-table
      :mobile-breakpoint="0"
    :headers="headers"
    :items="favMenus"
    :items-per-page="10"
    class="elevation-1"
  >
   <template v-slot:[`header.isSelect`] = "{ select }" >
     {{ select }}
       <v-checkbox class="pt-4" v-model="selectAll" @change="onChange(selectAll)"></v-checkbox>

      </template>
  <template v-slot:[`item`] = "{ item }">
    <!--hover on row to display edit/delete buttons-->
    <tr style="height: 120px !important;" @click="viewMenu(item.id)"
      >
       <td >
       <h6 class="text-h6">{{ item.company.name }}</h6></td>
       <td>
          <img v-if="item.image" class="menu-img" :src="item.image.url" :alt="item.name" @click.prevent="viewMenu(item.id)">
       </td>
      <td  >
       <h6 class="text-h6">{{ item.name }}</h6>
        <p v-if="item.description">{{ item.description }}</p>
        </td>
           <!--<td   v-if="item.cuisine_types.length > 0 && item.cuisine_types.length <= 3">
            <span disabled v-for="(ct, i) in item.cuisine_types" :key="i" class="cs ma-1">
            {{ ct.name }}
          </span>

        </td>
        <td   v-else-if="item.cuisine_types.length > 3">
          <template v-for="(ct, i) in item.cuisine_types">
             <span disabled v-if="i < 3" :key="i" class="cs ma-1">
            {{ ct.name }}
          </span>
          </template>
            <span class="cs ma-1">...</span>
        </td>
        <td v-else></td>-->
               <td>€ {{ Number(item.sumOfFav).toFixed(2) }}</td>
        <td >
                <v-checkbox
          v-model="selectedMenus"
        :value="item"
          @click.stop=""
      >
      </v-checkbox>
           </td>
        <td >
       <span
      :class="item.status ? 'status old' : 'status new'"
      height="40px"
    >
         {{ item.status ? 'sent' : 'new'}}
    </span></td>

    </tr>
  </template>

   <template v-slot:[`footer`] = "{ footer }">
     {{footer}}
      <div class="d-flex align-end mt-5 mb-2 mr-5">
  <v-col></v-col>
   <v-btn  :class="`base-btn ${$vuetify.breakpoint.name} save text-none`"
      @click.prevent="sendRequest">
      Send the request</v-btn></div>
    </template>
  </v-data-table>

     <v-btn
        :class="`base-btn ${$vuetify.breakpoint.name} add text-none mt-5 mb-5`"
          block
          @click="(e) => { $router.push({ name: 'MenusList', params: { event: $route.params.id}}) }"
        >
          <v-icon large >
            mdi-plus
          </v-icon>
          {{ $i18n.t("client.AddFavMenu")}}
        </v-btn>

          <!--popup success-->
    <v-dialog
      eager
      v-model="visible"
      :width="$vuetify.breakpoint.mobile ? '100%' : '50%'"
    >
     <v-card class="d-flex justify-center align-center pa-10" style="overflow: hidden">
       <v-card-text>
         <div class="text-center">
             <h6 class="text-h6 mb-5">Please select at least 1 menu</h6>
        <v-btn @click="visible = false"  :class="`base-btn ${$vuetify.breakpoint.name} save text-none`">Return</v-btn>
         </div>

       </v-card-text>
     </v-card>
    </v-dialog>
    </v-col>
    <v-col cols="5">
       <v-form
    ref="eventForm"
    lazy-validation
    class="auth-form max-width "
     :class="admin ? 'admin-bg' : ''"
  >

  <h4 class="text-h4 mb-4">{{ $i18n.t('client.EventInfo') }}</h4>
   <v-select
     solo
      v-model="eventtype"
      :items="eventtypes"
       :label="$i18n.t('client.EventType')"
         @change="selectChange"
      item-text="name"
      item-value="id"
    ></v-select>
    <v-text-field
      v-model="name"
    :label="$i18n.t('client.EventName')"
      required
    ></v-text-field>
       <v-text-field
      v-model.number="quantity"
      :rules="quantityRules"
       :label="$i18n.t('client.Quantity')"
      required
    ></v-text-field>
     <v-text-field
      v-model.number="budget"
       :label="$i18n.t('client.Budget')"
      :rules="budgetRules"
      required
    ></v-text-field>
      <v-textarea
        solo
        rows="3"
          :label="$i18n.t('client.placeName')"
          v-model="address"
        ></v-textarea>
          <v-text-field
      v-model="date"
      type="date"
      required
      :label="$i18n.t('client.date')"
      :rules="dateRules"
    ></v-text-field>
       <v-select
          v-model="selectedServices"
          :items="services"
          :menu-props="{ maxHeight: '400' }"
          label="Services"
          multiple
          :hint="$i18n.t('client.menuGroupHint')"
          persistent-hint
          item-text="name"
          @change="selectChange"
          item-value="id"
        ></v-select>
    <v-select
          v-model="selectGroups"
          :items="menuGroups"
          :menu-props="{ maxHeight: '400' }"
          :label="$i18n.t('client.menuGroup')"
          multiple
          :hint="$i18n.t('client.menuGroupHint')"
          persistent-hint
          item-text="name"
          @change="selectChange"
          item-value="id"
        ></v-select>

     <h4 class="menu-cuisinetype text-h4 mt-5 mb-3">{{ $i18n.t('auth.CuisineType') }}*</h4>
 <v-row class="d-flex">
     <v-col class="cuisinetypes" :cols="$vuetify.breakpoint.mobile ? 6 : 6">
            <v-checkbox
            v-model="any"
        label="Any"
        @change="selectAny(any)"
      >
            </v-checkbox>
            </v-col>
    <v-col class="cuisinetypes" :cols="$vuetify.breakpoint.mobile ? 6 : 6" v-for="(item, i) in cuisinetypes" :key="i">
      <v-checkbox
      :disabled="any"
        v-model="selectedCT"
        :label="item.name"
        :value="item.id"
        @change="select"
      >
      </v-checkbox>
    </v-col>
   </v-row>

    <v-row class="d-flex mt-5">
      <v-col class="d-flex justify-start">
        <v-btn
          :class="`base-btn ${$vuetify.breakpoint.name} discard`"
          @click="(e) => { $router.go(-1) }"
        >
          <v-icon>mdi-arrow-left</v-icon>
          {{ $i18n.t('auth.Cancel') }}
        </v-btn>
      </v-col>
       <v-col class="d-flex justify-end">
       <v-btn
       :disabled="disable"
      :class="`base-btn ${$vuetify.breakpoint.name} save`"
      @click.prevent="submit"
    >

      {{ $i18n.t('auth.Save')}}
          <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
       </v-col>
  </v-row>
  </v-form>
    </v-col>
  </v-row>

  <!--mobile display-->
  <v-row v-else class="event-detail pa-4">
    <h4 class="menu-cuisinetype text-h4 mb-3">{{ $i18n.t('client.FavFT') }}</h4>
    <v-data-table
      :mobile-breakpoint="0"
    :headers="headers"
    :items="favMenus"
    :items-per-page="10"
    class="elevation-1"
  >
   <template v-slot:[`header.isSelect`] = "{ select }" >
     {{ select }}
       <v-checkbox class="pt-4" v-model="selectAll" @change="onChange(selectAll)"></v-checkbox>

      </template>
  <template v-slot:[`item`] = "{ item }">
    <!--hover on row to display edit/delete buttons-->
    <tr style="height: 120px !important;" @click="viewMenu(item.id)"
      >
       <td >
       <h6 class="text-h6">{{ item.company.name }}</h6></td>
       <td>
          <img v-if="item.image" class="menu-img" :src="item.image.url" :alt="item.name" @click.prevent="viewMenu(item.id)">
       </td>
      <td  >
       <h6 class="text-h6">{{ item.name }}</h6>
        <p v-if="item.description">{{ item.description }}</p>
        </td>
           <!--<td   v-if="item.cuisine_types.length > 0 && item.cuisine_types.length <= 3">
            <span disabled v-for="(ct, i) in item.cuisine_types" :key="i" class="cs ma-1">
            {{ ct.name }}
          </span>

        </td>
        <td   v-else-if="item.cuisine_types.length > 3">
          <template v-for="(ct, i) in item.cuisine_types">
             <span disabled v-if="i < 3" :key="i" class="cs ma-1">
            {{ ct.name }}
          </span>
          </template>
            <span class="cs ma-1">...</span>
        </td>
        <td v-else></td>-->
               <td>€ {{ Number(item.sumOfFav).toFixed(2) }}</td>
        <td >
                <v-checkbox
          v-model="selectedMenus"
        :value="item"
          @click.stop=""
          multiple
      >
      </v-checkbox>
           </td>
        <td >
       <span
      :class="item.status ? 'status old' : 'status new'"
      height="40px"
    >
         {{ item.status ? 'sent' : 'new'}}
    </span></td>

    </tr>
  </template>

   <template v-slot:[`footer`] = "{ footer }">
     {{footer}}
      <div class="d-flex align-end mt-5 mb-2 mr-5">
  <v-col></v-col>
   <v-btn  :class="`base-btn ${$vuetify.breakpoint.name} save text-none`"
      @click.prevent="sendRequest">
      Send the request</v-btn></div>
    </template>
  </v-data-table>

     <v-btn
        :class="`base-btn ${$vuetify.breakpoint.name} add text-none mt-5 mb-5`"
          block
          @click="(e) => { $router.push({ name: 'MenusList', params: { event: $route.params.id}}) }"
        >
          <v-icon large >
            mdi-plus
          </v-icon>
          {{ $i18n.t("client.AddFavMenu")}}
        </v-btn>

    <!--event detail-->
    <v-form
    ref="eventForm"
    lazy-validation
    class="auth-form max-width"
     :class="admin ? 'admin-bg' : ''"
  >

  <h4 class="text-h4 mb-4">{{ $i18n.t('client.EventInfo') }}</h4>
   <v-select
     solo
      v-model="eventtype"
      :items="eventtypes"
       :label="$i18n.t('client.EventType')"
         @change="selectChange"
      item-text="name"
      item-value="id"
    ></v-select>
    <v-text-field
      v-model="name"
    :label="$i18n.t('client.EventName')"
      required
    ></v-text-field>
       <v-text-field
      v-model.number="quantity"
      :rules="quantityRules"
       :label="$i18n.t('client.Quantity')"
      required
    ></v-text-field>
     <v-text-field
      v-model.number="budget"
       :label="$i18n.t('client.Budget')"
      :rules="budgetRules"
      required
    ></v-text-field>
      <v-textarea
        solo
        rows="3"
          :label="$i18n.t('client.placeName')"
          v-model="address"
        ></v-textarea>
          <v-text-field
      v-model="date"
      type="date"
      required
      :label="$i18n.t('client.date')"
      :rules="dateRules"
    ></v-text-field>
    <v-select
          v-model="selectedServices"
          :items="services"
          :menu-props="{ maxHeight: '400' }"
          label="Services"
          multiple
          :hint="$i18n.t('client.menuGroupHint')"
          persistent-hint
          item-text="name"
          @change="selectChange"
          item-value="id"
        ></v-select>
    <v-select
          v-model="selectGroups"
          :items="menuGroups"
          :menu-props="{ maxHeight: '400' }"
          :label="$i18n.t('client.menuGroup')"
          multiple
          :hint="$i18n.t('client.menuGroupHint')"
          persistent-hint
          item-text="name"
          @change="selectChange"
          item-value="id"
        ></v-select>

     <h4 class="menu-cuisinetype text-h4 mt-5 mb-3">{{ $i18n.t('auth.CuisineType') }}*</h4>
 <v-row class="d-flex">
     <v-col class="cuisinetypes" :cols="$vuetify.breakpoint.mobile ? 6 : 6">
            <v-checkbox
            v-model="any"
        label="Any"
        @change="selectAny(any)"
      >
            </v-checkbox>
            </v-col>
    <v-col class="cuisinetypes" :cols="$vuetify.breakpoint.mobile ? 6 : 6" v-for="(item, i) in cuisinetypes" :key="i">
      <v-checkbox
      :disabled="any"
        v-model="selectedCT"
        :label="item.name"
        :value="item.id"
        @change="select"
      >
      </v-checkbox>
    </v-col>
   </v-row>

    <v-row class="d-flex mt-5">
      <v-col class="d-flex justify-start">
        <v-btn
          :class="`base-btn ${$vuetify.breakpoint.name} discard`"
          @click="(e) => { $router.go(-1) }"
        >
          <v-icon>mdi-arrow-left</v-icon>
          {{ $i18n.t('auth.Cancel') }}
        </v-btn>
      </v-col>
       <v-col class="d-flex justify-end">
       <v-btn
       :disabled="disable"
      :class="`base-btn ${$vuetify.breakpoint.name} save`"
      @click.prevent="submit"
    >

      {{ $i18n.t('auth.Save')}}
          <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
       </v-col>
  </v-row>
  </v-form>

       <!--popup success-->
    <v-dialog
      eager
      v-model="visible"
      :width="$vuetify.breakpoint.mobile ? '100%' : '50%'"
    >
     <v-card class="d-flex justify-center align-center pa-10" style="overflow: hidden">
       <v-card-text>
         <div class="text-center">
             <h6 class="text-h6 mb-5">Please select at least 1 menu</h6>
        <v-btn @click="visible = false"  :class="`base-btn ${$vuetify.breakpoint.name} save text-none`">Return</v-btn>
         </div>

       </v-card-text>
     </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import * as func from '@/utils/function'
export default {
  name: 'Event',
  data() {
    return {
      any: false, // if true the selectedCT is empty
      disable: true, // disable the save button
      visible: false, // popup the notification after send request
      eventtype: null,
      name: '',
      quantity: '',
      budget: '',
      address: '',
      date: '',
      selectedServices: [],
      selectGroups: [],
      selectedCT: [],
      dateRules: [
        v => !!v || 'Date is required'
      ],
      quantityRules: [
        v => !!v || 'Quantity of guests is required',
        v => (!isNaN(parseFloat(v))) || 'Must be number'
      ],
      budgetRules: [
        v => !!v || 'Budget is required',
        v => (!isNaN(parseFloat(v))) || 'Budget must be number'
      ],
      // fav menus
      selectedMenus: [],
      selectAll: false,
      favMenus: [],
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
          text: 'PRICE',
          align: 'start',
          value: 'sumOfFav',
          class: 'grey'
        },
        {
          text: 'SELECT ALL',
          align: 'start',
          value: 'isSelect',
          class: 'grey',
          sortable: false
        },
        {
          text: 'STATUS',
          align: 'start',
          value: 'status',
          class: 'grey'
        }
      ]
    }
  },
  watch: { // watch if the form is changed, unlock the save button
    disable(val) {
      this.$store.commit('auth/save', val)
    },
    eventtype(newval) {
      if (newval !== this.event.event_type) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    name(newval) {
      if (newval !== this.event.name) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    quantity(newval) {
      if (newval !== this.event.guests) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    budget(newval) {
      if (newval !== this.event.budget) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    address(newval) {
      if (newval !== this.event.location_name) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    date(newval) {
      if (newval !== this.event.date) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    $route(to, from) {
      if (from.name === 'Event') {
        this.clearData()
      }
      if (to.name === 'Event' && to.params.id) {
        this.loadEvent(to.params.id)
      }
    }
  },
  computed: {
    event() {
      return this.$store.state.event.event
    },
    eventtypes() {
      return this.$store.state.eventtype.eventtypes
    },
    cuisinetypes() {
      return this.$store.state.cuisinetypes.cuisinetypes
    },
    menuGroups() {
      return this.$store.state.menuItemGroup.menuItemGroups
    },
    services() {
      return this.$store.state.eventservice.eventservices
    },
    user() {
      return this.$store.state.auth.user
    },
    admin() {
      return this.$store.state.auth.admin
    }
  },
  mounted() {
    this.loadEvent(this.$route.params.id)
    this.$store.commit('auth/save', this.disable)
  },
  created() {
    this.getEventTypes()
    this.getCuisinetypes()
    this.getMenuGroups()
    this.getEventServices()
  },
  methods: {
    clearData() {
      this.eventtype = null
      this.name = ''
      this.quantity = ''
      this.budget = ''
      this.address = ''
      this.date = ''
      this.selectGroups = []
      this.selectedCT = []
      this.favMenus = []
      this.selectedMenus = []
      this.disable = true
      this.$store.commit('auth/save', this.disable)
    },
    loadEvent(id) {
      this.getEvent(id)
    },
    getEventTypes() {
      this.$store.dispatch('eventtype/getEventTypes', '?_sort=name:asc')
    },
    getCuisinetypes() {
      this.$store.dispatch('cuisinetypes/getCuisinetypes', '?_sort=name:asc')
    },
    getMenuGroups() {
      this.$store.dispatch('menuItemGroup/getMenuItemGroups')
    },
    getEventServices() {
      this.$store.dispatch('eventservice/getEventServices', '?_sort=id:asc')
    },
    getEvent(id) {
      this.$store.dispatch('event/getEvent', id)
        .then(res => {
          this.eventtype = res.data.event_type
          this.name = res.data.name
          this.quantity = res.data.guests
          this.budget = res.data.budget
          this.address = res.data.location_name
          this.date = res.data.date
          this.selectGroups = res.data.menu_item_groups
          this.selectedServices = res.data.event_services
          this.selectedCT = res.data.cuisine_types.map(function(obj) {
            return obj.id
          })
          this.disable = true
          this.$store.commit('auth/save', this.disable)
          this.getFavMenu()
        })
    },
    getFavMenu() { // check if the menu in fav_menus
      this.event.fav_menus.forEach(menu => {
        this.$store.dispatch('menu/getMenu', menu.id)
          .then(res => {
            res.data.isSelect = false
            this.checkMenuStatus(res.data, this.event.sent_proposals) // check if the menu is already sent request
            this.favMenus.push(res.data)
            this.favMenus.sort(function(a, b) {
              return a.name.localeCompare(b.name)
            })
          })
      })
      this.onChange(false)
    },
    selectAny(item) {
      this.disable = false
      if (item === true) { // if any = true, empty the selectedCT
        this.selectedCT = []
      }
    },
    selectChange() {
      this.disable = false
    },
    submit() {
      if (this.$refs.eventForm.validate()) {
        const eventForm = {
          id: this.event.id,
          name: this.name,
          event_type: this.eventtype,
          date: this.date,
          quantity: this.quantity,
          budget: this.budget,
          location_address: this.address,
          menu_item_groups: this.selectGroups,
          cuisine_types: this.selectedCT
        }
        this.$store.dispatch('event/updateEvent', eventForm) // handle update event
          .then(() => {
            this.disable = true
          })
          .catch(err => {
            return err
          })
      }
    },
    onChange(val) { // check all the fav menus
      if (val === true) {
        this.selectedMenus = []
        this.favMenus.forEach(menu => {
          this.selectedMenus.push(menu)
        })
      } else {
        this.selectedMenus = []
      }
    },
    sendRequest() { // go to the request page with the chosen menus
      if (this.selectedMenus.length > 0) {
        this.$router.push({ name: 'Proposal', params: { event: this.event, req_menus: this.selectedMenus } })
      } else {
        this.visible = true
      }
    },
    viewMenu(id) {
      this.$router.push({ name: 'MenuDetail', params: { id: id } })
    },
    checkMenuStatus(menu, proposals) { // check if the menu is already sent request
      proposals.forEach(req => {
        if (req.company === menu.company.id) {
          menu.status = true
        }
      })
      this.calSumOfFavItems(menu)
      return menu
    },
    calSumOfFavItems(menu) {
      menu.sumOfFav = 0
      func.checkFav(menu.menu_items, this.event.fav_menu_items)
      menu.menu_items.forEach(item => {
        if (item.isFav) {
          menu.sumOfFav += item.cost
        }
      })
    },
    select() {
      this.disable = false
    }
  }
}
</script>

<style scoped>
.menu-img {
  width: 100px;
  object-fit: cover;
  height: 100px;
  border-radius: 18px;
}

</style>
