<template>
  <v-container class="requests" :class="$vuetify.breakpoint.mobile ? 'max-width' : 'table-width'">
    <v-data-table
      :mobile-breakpoint="0"
    :headers="headers"
    :items="proposals"
    :items-per-page="10"
    class="elevation-1"
  >
  <template v-slot:[`item`] = "{ item }">
    <!--hover on row to display edit/delete buttons-->
    <tr
        @click="viewRequest(item)"
      >
      <td >{{ item.clientFullName }}  </td>
      <td >
       <span>{{ item.eventName }}</span></td>
       <td><span>{{ item.eventDate }}</span></td>
         <td><span>{{ item.eventGuests }}</span></td>
         <!--<td>
           <span v-for="menu in item.proposal_menus" :key="menu.id" class="cs ma-1">
             {{ menu.menu}}
           </span>
         </td>-->
            <td >
       <span
      :class="item.isQuo ? 'status old' : 'status new'"
      height="40px"
    >
         {{ item.isQuo ? 'sent' : 'new'}}
    </span></td>
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
      <v-list>
         <v-list-item >
              <v-btn
        text
        @click.prevent="viewRequest(item.id)"
          >
          <span > <v-icon >mdi-pencil</v-icon> Make a quotation</span>
           </v-btn>

        </v-list-item>
           <v-list-item >
              <v-btn
        text
        @click.prevent="delPopup(item)"
          >
          <span > <v-icon >mdi-delete</v-icon> Delete</span>
           </v-btn>

        </v-list-item>
      </v-list>
          </v-menu>
       </td>
    </tr>
  </template>

  </v-data-table>

   <v-dialog
    v-model="del"
    :width="$vuetify.breakpoint.mobile ? '100vw' : '50vw'"
     >
      <v-card  class="d-flex justify-center align-center pa-8" style="overflow: hidden">
        <v-row class="d-flex justify-center">
          <v-col cols="12" class="d-flex justify-center">
             <h4 class="text-h4 text-center">{{ $i18n.t('admin.delete')}}</h4>
          </v-col>
           <v-col cols="2" class="d-flex justify-center">
              <v-text-field
      v-model="confirm"
      required
    ></v-text-field>
           </v-col>
          <v-col cols="12" class="d-flex justify-center">
             <v-btn :class="`base-btn ${$vuetify.breakpoint.name} discard-form mr-4`" @click.prevent="del = false">Cancel</v-btn>
             <v-btn :disabled="confirm === 'delete' ? false : true" :class="`base-btn ${$vuetify.breakpoint.name} save ml-4`" >OK</v-btn>
          </v-col>
        </v-row>
      </v-card>
</v-dialog>
  </v-container>
</template>

<script>
import * as func from '@/utils/function'
export default {
  name: 'Requests',
  data() {
    return {
      headers: [
        {
          text: 'CLIENT',
          align: 'start',
          value: 'clienFullname',
          class: 'grey'
        },
        {
          text: 'EVENT',
          align: 'start',
          value: 'eventName',
          class: 'grey'
        },
        {
          text: 'DATE',
          align: 'start',
          value: 'eventDate',
          class: 'grey'
        },
        {
          text: 'GUESTS',
          align: 'start',
          value: 'eventGuests',
          class: 'grey'
        },
        {
          text: 'STATUS',
          align: 'start',
          value: 'isQuo',
          class: 'grey'
        },
        {
          text: '',
          align: 'start',
          value: '',
          width: '5%',
          class: 'grey'
        }
      ],
      view: false,
      del: false,
      confirm: '',
      delRequest: null,
      proposals: []

    }
  },
  computed: {
    user() {
      return this.$store.state.auth.admin ? this.$store.state.user.user : this.$store.state.auth.user
    },
    admin() {
      return this.$store.state.auth.admin
    },
    company() {
      return this.$store.state.company.company
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === 'Requests') {
        this.getCompany()
      }
    }
  },
  created() {
    this.getCompany()
  },
  methods: {
    getCompany() {
      this.proposals = []
      this.$store.dispatch('company/getCompany', this.user.company.id)
        .then(() => {
          this.company.received_proposals.forEach(req => {
            this.getProposal(req)
          })
        })
    },
    getProposal(proposal) {
      this.$store.dispatch('proposal/getProposal', proposal.id)
        .then(res => {
          proposal = res.data
          this.getEventDetail(proposal.event.id, proposal)
        })
    },
    getEventDetail(id, proposal) {
      try {
        this.$store.dispatch('event/getEvent', id)
          .then(res => {
            proposal.event = res.data
            proposal.eventName = res.data.name
            proposal.clientFullName = res.data.client.fullName
            proposal.eventDate = func.formatDate(res.data.date)
            proposal.eventGuests = res.data.guests
            this.proposals.push(proposal)
            this.proposals.sort(function(a, b) {
              return b.id - a.id
            })
          })
      } catch (error) {
        return error
      }
    },

    viewRequest(item) {
      this.$router.push({ name: 'RequestDetail', params: { id: item.id, proposal: item } })
    },
    delPopup(item) {
      console.log(item)
    }
  }
}
</script>

<style>

</style>
