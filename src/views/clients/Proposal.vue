<template>
  <v-container class="proposals py-5"  :class="$vuetify.breakpoint.mobile || admin ? 'max-width ' : 'fixed-width'">
    <!--page 2-->
    <div class="proposal-info" v-if="page === 1" >
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
      v-model="event.event_type.name"
      disabled
    :label="$i18n.t('client.EventType')"
      required
    ></v-text-field>
   <v-text-field
      v-model="event.name"
      disabled
    :label="$i18n.t('client.EventName')"
      required
    ></v-text-field>
     <v-text-field
         disabled
      v-model.number="event.guests"
       :label="$i18n.t('client.Quantity')"
      required
    ></v-text-field>
     <v-text-field
         disabled
      v-model.number="event.budget"
       :label="$i18n.t('client.Budget')"
      required
    ></v-text-field>
      <v-text-field
         disabled
      v-model="event.location_address"
       :label="$i18n.t('client.placeName')"
      required
    ></v-text-field>
     <v-text-field
         disabled
      v-model="event.date"
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
    class="page-4"
    :class="admin ? 'admin-bg' : ''"
  >
    <v-text-field
      v-model="user.fullName"
      disabled
     :label="$i18n.t('auth.FLName')"
      required
    ></v-text-field>
      <v-text-field
      v-model="user.email"
      disabled
     label="E-MAIL"
      required
    ></v-text-field>
          <v-text-field
      v-model="user.phoneNumber"
      disabled
     :label="$i18n.t('auth.PhoneNumber')"
      required
    ></v-text-field>
       <v-textarea
        solo
        rows="3"
          :label="$i18n.t('auth.Address')"
          v-model="user.address"
          disabled
        ></v-textarea>
        <!--<v-row class="d-flex justify-center">
           <v-btn  :class="`base-btn ${$vuetify.breakpoint.name} save text-none`"
      @click.prevent="sendRequest(foodtruck)">
      Make a proposal</v-btn>
        </v-row>-->
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
        <template v-for="(menu,i) in req_menus">
        <div class="menu mb-10"  :key="i" v-if="selectedFTIds.includes(menu.company.id)">
          <div class="menu-header mb-2" >
             <h4 class="text-h4">{{menu.name}}</h4>
             <span class="d-flex">
                <h6 class="text-h6 primary-color mr-2">**Notes:</h6>
             <p v-if="menu.note">{{ menu.note.content }}</p>
             </span>
          </div>
          <div v-for="(group, i) in menu.favGroups" :key="i">
            <h4 class="text-h4" >{{ group.name }}</h4>
             <template  v-for="(item, i) in menu.menu_items" >
            <MenuItem :item="item" :key="i" v-if="item.menu_item_group === group.id && item.isFav === true"/>
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
    <v-row class="d-flex justify-space-between">
      <v-col cols="8">
    <v-row class="d-flex justify-space-between align-center">
       <v-col cols="4"  v-for="(com, i) in FTList"
        :key="i">
        <v-checkbox :label="com.name" :value="com" v-model="selectedFT"></v-checkbox>
    </v-col>
    </v-row>
      </v-col>
       <v-col class="d-flex align-center justify-end">
         <v-btn  :class="`base-btn ${$vuetify.breakpoint.name} save text-none`"
      @click.prevent="sendRequest(selectedFT)">
      Send the request</v-btn>
       </v-col>
    </v-row>

     <v-row class="d-flex mt-5">
      <v-col class="d-flex justify-start">
        <v-btn
          @click="(e) => { $router.go(-1) }"
          :class="`base-btn ${$vuetify.breakpoint.name} discard`"
        >
          <v-icon>mdi-arrow-left</v-icon>
     {{ $i18n.t('auth.Cancel')}}
    </v-btn>
      </v-col>
       <v-col class="d-flex justify-end">
       </v-col>
  </v-row>

    <!--popup success-->
    <v-dialog
      eager
      v-model="visible"
      :width="$vuetify.breakpoint.mobile ? '100%' : '50%'"
    >
     <v-card class="d-flex justify-center align-center pa-10" style="overflow: hidden">
       <v-card-text>
         <div class="text-center">
             <h6 class="text-h6">Your request has been sent to foodtrucks!</h6>
         <p>Please check your email inbox to see our best proposals</p>
        <v-btn @click="visible = false, page = 1"  :class="`base-btn ${$vuetify.breakpoint.name} save text-none`">Return</v-btn>
         </div>

       </v-card-text>
     </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import MenuItem from '@/components/Menu/MenuItem'
import emailjs from 'emailjs-com'
import { SIB_USERID, SIB_SERVICEID } from '@/utils/constant'
import * as func from '@/utils/function'
emailjs.init(SIB_USERID)
export default {
  name: 'Proposal',
  components: { MenuItem },
  data() {
    return {
      page: 1,
      selectedFT: [], // the selected company/ft
      selectedFTIds: [],
      FTList: [], // list of the chosen FT from the mnu
      FTList_ids: [], // list id ...
      services: [], // event data
      cuisine_types: [],
      groups: [],
      req_menus: [],
      visible: false,
      chosenMenus: []
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
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === 'Proposal' && to.params) {
        this.getEvent()
        this.getFavMenu()
      }
      if (from.name === 'Proposal') {
        this.cleanData()
      }
    },
    selectedFT(val) {
      this.selectedFTIds = val.map(function(obj) {
        return obj.id
      })
    }
  },
  mounted() {
    this.getEvent()
    this.getFavMenu()
  },
  methods: {
    cleanData() {
      this.page = 1
      this.selectedFT = []
      this.selectedFTIds = []
      this.FTList = []
      this.FTList_ids = []
      this.req_menus = []
      this.services = []
      this.cuisine_types = []
      this.groups = []
      this.chosenMenus = []
    },
    getFavMenu() { // get data of the chosen fav menu to send request
      this.$route.params.req_menus.forEach(menu => {
        func.checkFav(menu.menu_items, this.event.fav_menu_items) // display the fav menu_items
        this.req_menus.push(this.checkMenuGroupItem(menu)) // display the menu group that has menu_items
        if (this.FTList_ids.includes(menu.company.id) === false) { // get list of the company that menu belong to
          this.FTList_ids.push(menu.company.id)
          this.FTList.push(menu.company)
        }
      })
      this.selectedFT.push(this.$route.params.req_menus[0].company) // default foodtruck selected
    },
    getEvent() { // get data in words for the page 2 form
      this.event.date = func.formatDate(this.event.date)
      this.event.event_services.forEach(sv => {
        this.services.push(sv.name)
      })
      this.event.cuisine_types.forEach(ct => {
        this.cuisine_types.push(ct.name)
      })
      this.event.menu_item_groups.forEach(group => {
        this.groups.push(group.name)
      })
    },
    checkMenuGroupItem(menu) { // handle display the menu_group that has fav menu items
      menu.favGroupId = []
      menu.favGroups = []
      menu.menu_items.forEach(item => {
        if (item.isFav) {
          if (menu.favGroupId.includes(item.menu_item_group) === false) {
            menu.favGroupId.push(item.menu_item_group)
            this.$store.dispatch('menuItemGroup/getMenuItemGroup', item.menu_item_group)
              .then(res => {
                menu.favGroups.push(res.data)
              })
          }
        }
      })
      return menu
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
    },
    async sendRequest(ftlist) { // send request to the foodtruck
      await this.sendProposal(ftlist)
    },
    sendEmail(ft, contact) {
      try {
        emailjs.send(SIB_SERVICEID, 'template_qavwysz'
          , {
            foodtruck: ft.name,
            fullName: contact.fullName,
            email: contact.email,
            event: this.event.name,
            guests: this.event.guests,
            date: this.event.date,
            clientName: this.user.fullName,
            clientEmail: this.user.email,
            clientPhone: this.user.phoneNumber
          })
      } catch (err) {
        return err
      }
    },
    addProposalMenu(ft, proposalid) { // add proposal_menus to the proposal
      this.req_menus.forEach(menu => {
        if (menu.company.id === ft.id) {
          const proposalItems = []
          menu.menu_items.forEach(item => {
            if (item.isFav) {
              proposalItems.push(item)
            }
          })
          const dataForm = { name: menu.name, proposal_items: proposalItems, proposal: proposalid, note: menu.note ? menu.note.content : '' }
          this.$store.dispatch('proposalMenu/createProposalMenu', dataForm)
            .then(res => {
            })
        }
      })
    },
    sendProposal(ftlist) { // create the proposal and send email to the contact
      ftlist.forEach(ft => {
        const proposalForm = { company: ft, event: this.event }
        this.$store.dispatch('proposal/createProposal', proposalForm)
          .then(re => {
            this.addProposalMenu(ft, re.data.id)
            this.$store.dispatch('company/getCompany', ft.id)
              .then(res => {
                res.data.contacts.forEach(contact => {
                  if (contact.isPrimary) {
                    this.sendEmail(res.data, contact) // send the email to the primary contact of the ft
                    this.visible = true
                  }
                })
              })
          })
      })
    }
  }
}
</script>

<style>

</style>
