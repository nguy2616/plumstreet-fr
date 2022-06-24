<template>
  <v-container class="request-detail  py-5"  :class="$vuetify.breakpoint.mobile || admin ? 'max-width ' : 'fixed-width'">
     <div class="event-info" v-if="page === 1" >
         <v-row class="d-flex">
        <v-col cols="3">
           <h4 class="text-h4">Event Information</h4>
        </v-col>
         <v-col cols="9">
            <v-form
    ref="eventInfo"
    lazy-validation
    class="page-2"
    :class="admin ? 'admin-bg' : ''"
  >
    <v-text-field
      v-model="proposal.event.event_type.name"
      disabled
    :label="$i18n.t('client.EventType')"
      required
    ></v-text-field>
   <v-text-field
      v-model="proposal.event.name"
      disabled
    :label="$i18n.t('client.EventName')"
      required
    ></v-text-field>
     <v-text-field
         disabled
      v-model.number="proposal.event.guests"
       :label="$i18n.t('client.Quantity')"
      required
    ></v-text-field>
     <v-text-field
         disabled
      v-model.number="proposal.event.budget"
       :label="$i18n.t('client.Budget')"
      required
    ></v-text-field>
      <v-text-field
         disabled
      v-model="proposal.event.location_address"
       :label="$i18n.t('client.placeName')"
      required
    ></v-text-field>
     <v-text-field
         disabled
      v-model="proposal.event.date"
       :label="$i18n.t('client.date')"
      required
    ></v-text-field>
     <v-text-field
         disabled
      v-model="services"
       label="Time"
      required
    ></v-text-field>
    <v-text-field
         disabled
      v-model="groups"
       :label="$i18n.t('client.menuGroup')"
      required
    ></v-text-field>
     <v-text-field
         disabled
      v-model="cuisine_types"
       :label="$i18n.t('auth.CuisineType')"
      required
    ></v-text-field>
      </v-form>
         </v-col>
         </v-row>

          <v-row class="d-flex">
        <v-col cols="3">
            <h4 class="text-h4">Client Information</h4>`
        </v-col>
         <v-col cols="9">
             <v-form
    ref="clientInfo"
    lazy-validation
    class="page-4 "
    :class="admin ? 'admin-bg' : ''"
  >
    <v-text-field
      v-model="proposal.event.client.fullName"
      disabled
     :label="$i18n.t('auth.FLName')"
      required
    ></v-text-field>
      <v-text-field
      v-model="proposal.event.client.email"
      disabled
     label="E-MAIL"
      required
    ></v-text-field>
          <v-text-field
      v-model="proposal.event.client.phoneNumber"
      disabled
     :label="$i18n.t('auth.PhoneNumber')"
      required
    ></v-text-field>
       <v-textarea
        solo
        rows="3"
          :label="$i18n.t('auth.Address')"
          v-model="proposal.event.client.address"
          disabled
        ></v-textarea>
         </v-form>
         </v-col>
         </v-row>
     </div>
    <!--page 2-->
        <div class="chosen-menu" v-else>
          <v-row class="d-flex">
          <v-col  cols="3" class="proposal-left d-flex">
        <h4 class="text-h4">Favorite Items</h4>
        </v-col>
      <v-col cols="9" class="d-flex justify-center">
         <div class="page-3">
        <template  v-for="(menu,i) in proposal_menus">
        <div class="menu mb-10" :key="i">
          <div class="menu-header mb-2 ">
             <h4 class="text-h4">{{menu.name}}</h4>
             <span class="d-flex"  v-if="menu.note">
                <h6 class="text-h6 primary-color mr-2">**Notes:</h6>
             <p>{{ menu.note }}</p>
             </span>

          </div>
          <!--starters-->
          <div class="mb-5" v-if="menu.starters.length > 0">
            <h4 class="text-h4 mb-5" >{{$i18n.t('menu.Starters')}} </h4>
             <template  v-for="(item, i) in menu.starters" >
            <MenuItem :item="item" :key="i"/>
        </template>
          </div>

           <!--main dishes-->
          <div class="mb-5" v-if="menu.maindishes.length > 0">
            <h4 class="text-h4 mb-5" >{{$i18n.t('menu.Main dishes')}} </h4>
             <template  v-for="(item, i) in menu.maindishes" >
            <MenuItem :item="item" :key="i"/>
        </template>
          </div>

           <!--dessertrs-->
          <div class="mb-5" v-if="menu.desserts.length > 0">
            <h4 class="text-h4 mb-5" >{{$i18n.t('menu.Desserts')}} </h4>
             <template  v-for="(item, i) in menu.desserts" >
            <MenuItem :item="item" :key="i"/>
        </template>
          </div>

           <!--drinks-->
          <div class="mb-5" v-if="menu.drinks.length > 0">
            <h4 class="text-h4 mb-5" >{{$i18n.t('menu.Drinks')}} </h4>
             <template  v-for="(item, i) in menu.drinks" >
            <MenuItem :item="item" :key="i"/>
        </template>
          </div>
        </div>
        </template>
      </div>
      </v-col>
          </v-row>
        </div>
    <!--footer page-->

    <span class="d-flex justify-end mt-4 mb-5 align-center">
      Page {{ page }}
      <v-btn text fab x-small @click="prev">      <v-icon>mdi-chevron-left</v-icon></v-btn>
         <v-btn text fab x-small @click="next">
      <v-icon>mdi-chevron-right</v-icon></v-btn>
    </span>

    <div class="d-flex justify-center justify-space-between">
       <v-btn
          :class="`base-btn ${$vuetify.breakpoint.name} discard-form`"
          @click="cancel"
        >
          <v-icon>mdi-arrow-left</v-icon>
          {{ $i18n.t('auth.Cancel') }}
        </v-btn>
       <QuotationForm v-if="proposal" :add="true" :proposal="proposal" :proposal_menus="proposal_menus" />
    </div>
  </v-container>
</template>

<script>
import MenuItem from '@/components/Menu/MenuItem'
import QuotationForm from '@/components/Foodtruck/QuotationForm'
import * as func from '@/utils/function'
export default {
  name: 'RequestDetail',
  components: { MenuItem, QuotationForm },
  data() {
    return {
      page: 1,
      services: [], // event data
      cuisine_types: [],
      groups: [],
      fav_item_groups: [],
      proposal_menus: []
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    admin() {
      return this.$store.state.auth.admin
    },
    event() {
      return this.$store.state.event.event
    },
    proposal() {
      return this.$store.state.proposal.proposal
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === 'RequestDetail' && to.params) {
        this.$store.commit('proposal/setProposal', to.params.proposal)
        this.page = 1 // page 1 default
        this.getEvent()
        this.getProposalDetail()
      }
      if (from.name === 'RequestDetail') {
        this.clearData()
      }
    }
  },
  mounted() {
    this.$store.commit('proposal/setProposal', this.$route.params.proposal)
    this.page = 1 // page 1 default
    this.getEvent()
    this.getProposalDetail()
  },
  methods: {
    cancel() {
      this.clearData()
      this.$router.go(-1)
    },
    clearData() {
      this.services = []
      this.cuisine_types = []
      this.groups = []
      this.fav_item_groups = []
      this.proposal_menus = []
    },
    getEvent() { // get data in words for the page 2 form
      this.proposal.event.date = func.formatDate(this.proposal.event.date)
      this.proposal.event.event_services.forEach(sv => {
        this.services.push(sv.name)
      })
      this.proposal.event.cuisine_types.forEach(ct => {
        this.cuisine_types.push(ct.name)
      })
      this.proposal.event.menu_item_groups.forEach(group => {
        this.groups.push(group.name)
        this.fav_item_groups.push(group)
      })
    },
    getProposalDetail() {
      this.proposal.proposal_menus.forEach(pm => {
        this.getProposalMenu(pm)
      })
    },
    getProposalMenu(menu) {
      this.$store.dispatch('proposalMenu/getProposalMenu', menu.id)
        .then(res => {
          res.data.proposal_items.forEach(item => {
            this.getItemDetail(item)
            this.asignToGroupMenu(res.data)
          })
          this.proposal_menus.push(res.data)
        })
    },
    getItemDetail(item) {
      this.$store.dispatch('menuItem/getMenuItem', item.id)
        .then(res => {
          item = res.data
        })
    },
    asignToGroupMenu(menu) {
      menu.starters = []
      menu.maindishes = []
      menu.desserts = []
      menu.drinks = []
      menu.proposal_items.forEach(item => {
        if (item.menu_item_group === 4) {
          menu.starters.push(item)
        } else if (item.menu_item_group === 5) {
          menu.maindishes.push(item)
        } else if (item.menu_item_group === 6) {
          menu.desserts.push(item)
        } else if (item.menu_item_group === 7) {
          menu.drinks.push(item)
        }
      })
    },
    prev() {
      if (this.page > 1) {
        this.page -= 1
      }
    },
    next() {
      if (this.page < 2) {
        this.page += 1
      }
    }
  }
}
</script>

<style>

</style>
