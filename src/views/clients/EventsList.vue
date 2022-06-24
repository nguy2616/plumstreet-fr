<template>
<v-container class="events-list" :class="$vuetify.breakpoint.mobile ? 'max-width' : 'table-width'">
  <v-data-table
  :mobile-breakpoint="0"
    :headers="headers"
    :items="events"
    :items-per-page="10"
    class="elevation-1 mt-2"
  >
  <template v-slot:[`item`] = "{ item }">

    <tr style="height: 60px !important;"
    @click="viewEvent(item)"
      >
      <td ><h6 class="text-h6">{{ item.name }} </h6></td>
      <td >
       <span>{{ item.date }}</span></td>
        <td >
       <span >{{ item.guests }}</span></td>
       <td v-if="item.cuisine_types.length > 0 && item.cuisine_types.length <= 3">
            <span disabled v-for="(ct, i) in item.cuisine_types" :key="i" class="cs ma-1">
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
        <td v-else>
           <span class="cs ma-1">Any</span>
        </td>
        <td >
       <span
      :class="item.status === 'upcoming' ? 'status new' : 'status old'"
    >
         {{ item.status}}
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
        @click.prevent="viewEvent(item)"
          >
          <span > <v-icon >mdi-pencil</v-icon> Edit</span>
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

  </v-data-table >
   <div class="d-flex justify-end mt-4">
    <ClientPopup :signup="false"/>
  </div>
   <!--popup confirm to delete-->
    <v-dialog
    v-model="del"
    :width="$vuetify.breakpoint.mobile ? '100vw' : '50vw'"
     >
      <v-card  class="d-flex justify-center align-center pa-8" style="overflow: hidden">
        <v-row class="d-flex justify-center">
          <v-col cols="12">
             <h4 class="text-h4 text-center">{{ $i18n.t('client.delete')}}</h4>
             <h4 class="text-h4 text-center">{{ $i18n.t('client.delete1')}}</h4>
             <p class="text-center">{{ $i18n.t('client.delete2')}}</p>
          </v-col>
           <v-col cols="2" class="d-flex justify-center">
              <v-text-field
              class="center-input"
      v-model="confirm"
      required
    ></v-text-field>
           </v-col>
          <v-col cols="12" class="d-flex justify-center">
             <v-btn :class="`base-btn ${$vuetify.breakpoint.name} discard-form mr-4`" @click.prevent="del = false">Cancel</v-btn>
             <v-btn :disabled="confirm === 'delete' ? false : true" :class="`base-btn ${$vuetify.breakpoint.name} save ml-4`" @click="deleteEvent">OK</v-btn>
          </v-col>
        </v-row>
      </v-card>
</v-dialog>

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
import ClientPopup from '@/components/Client/ClientPopup'
import * as func from '@/utils/function'
export default {
  name: 'EventsList',
  components: { ClientPopup },
  data() {
    return {
      msg: '', // snackbar msg
      snackbar: false,
      events: [],
      c_index: -1,
      headers: [
        {
          text: 'NAME OF EVENT',
          align: 'start',
          value: 'name',
          class: 'grey'
        },
        {
          text: 'DATE',
          align: 'start',
          value: 'date',
          class: 'grey'
        },
        {
          text: 'GUESTS',
          align: 'start',
          value: 'guests',
          class: 'grey'
        },
        {
          text: 'TYPE OF CUISINE',
          align: 'start',
          value: 'cuisine_types',
          class: 'grey'
        },
        {
          text: 'STATUS',
          align: 'start',
          value: 'status',
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
      delEvent: null
    }
  },
  watch: {
    isSaved(val) {
      if (val === true) {
        this.getClient()
      }
    },
    $route(to, from) {
      if (to.name === 'EventsList') {
        this.getClient()
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user
    },
    admin() {
      return this.$store.state.auth.admin
    },
    isSaved() {
      return this.$store.state.event.isSaved
    }
  },
  mounted() {
    this.getClient()
  },
  methods: {
    over(v) {
      this.c_index = v
    },
    leave() {
      this.c_index = -1
    },
    delPopup(ev) {
      this.del = true
      this.delEvent = ev
    },
    deleteEvent() { // delete the event
      this.$store.dispatch('event/deleteEvent', this.delEvent.id)
        .then(() => {
          this.msg = `Delete event ${this.delEvent.name} successfully`
          this.snackbar = true
          this.delEvent = null
          this.del = false
          this.getClient()
        })
    },
    getClient() { // get all info of the client and his events
      this.events = []
      this.$store.dispatch('user/getUser', this.user.id)
        .then(res => {
          this.$store.commit('user/setUser', res.data)
          this.user.events.forEach(event => {
            this.$store.dispatch('event/getEvent', event.id)
              .then(res => {
                if (func.compareTimestamp(func.formatDate(res.data.date))) {
                  res.data.status = 'upcoming'
                } else {
                  res.data.status = 'over'
                }
                res.data.date = func.formatDate(res.data.date)
                this.events.push(res.data)
                this.events.sort(function(a, b) {
                  return b.id - a.id
                })
                this.$store.commit('event/save', false) // set to false after loading, when true will call the method again
              })
          })
        })
    },
    viewEvent(event) {
      this.$router.push({ name: 'Event', params: { id: event.id } })
    },
    clickRow(row) {
      console.log(row)
    }

  }

}
</script>

<style scoped>
.center-input >>> input {
  text-align: center;
}
</style>
