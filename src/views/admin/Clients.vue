<template>
<v-container :class="$vuetify.breakpoint.mobile ? 'max-width' : 'table-width'">
  <!--popup confirm to delete-->
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
              <v-text-field class="center-input"
      v-model="confirm"
      required
    ></v-text-field>
           </v-col>
          <v-col cols="12" class="d-flex justify-center">
             <v-btn :class="`base-btn ${$vuetify.breakpoint.name} discard-form mr-4`" @click.prevent="del = false">Cancel</v-btn>
             <v-btn :disabled="confirm === 'delete' ? false : true" :class="`base-btn ${$vuetify.breakpoint.name} save ml-4`" @click="deleteClient">OK</v-btn>
          </v-col>
        </v-row>
      </v-card>
</v-dialog>

<!--foodtruck invite button-->
  <!--<div class="d-flex justify-end mb-5">
    <InviteFoodtruckForm :add="true" />
  </div>-->

<!--clients table display-->
  <v-data-table
      :mobile-breakpoint="0"
    :headers="headers"
    :items="clients"
    :items-per-page="10"
    class="elevation-1"
  >
  <template v-slot:[`item`] = "{ item }">
    <!--hover on row to display edit/delete buttons-->
    <tr
          @click="viewClient(item)"
      >
      <td  class="d-flex align-center">{{ item.fullName }} </td>
      <td >
       <span>{{ item.email }}</span></td>
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
        @click.prevent="viewClient(item)"
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

  </v-data-table>
</v-container>
</template>

<script>

export default {
  name: 'Clients',
  data() {
    return {
      headers: [
        {
          text: 'ClIENTS',
          align: 'start',
          value: 'fullName',
          class: 'grey'
        },
        {
          text: 'CONTACT EMAIL',
          value: 'email',
          class: 'grey'
        },
        {
          text: '',
          value: '',
          width: '5%',
          class: 'grey'
        }
      ],
      view: false,
      del: false,
      confirm: '',
      delClient: null
    }
  },
  computed: {
    clients() {
      return this.$store.state.user.users
    },
    admin() {
      return this.$store.state.auth.admin
    }
  },
  created() {
    this.getClients()
  },
  methods: {
    getClients() {
      this.$store.dispatch('user/getUsers', '?_where[role.id]=5&_sort=fullName:asc') // get client list with role id = 5
    },
    delPopup(com) { // popup the message if delete
      this.del = true
      this.delClient = com
    },
    viewClient(client) { // view and edit the client
      this.$store.dispatch('user/getUser', client.id)
        .then(res => {
          this.$store.commit('user/setUser', res.data)
          this.$router.push('/client') // to the client page
        })
    },
    deleteClient() { // delete client
      this.$store.dispatch('user/deleteUser', this.delClient.id)
        .then(() => {
          this.delClient = null
          this.del = false
          this.getClients()
        })
    }
  }
}
</script>

<style scoped>
.v-btn:hover {
  background-color: transparent;
}
.center-input >>> input {
  text-align: center;
}
</style>
