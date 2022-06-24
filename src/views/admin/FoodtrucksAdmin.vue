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
              <v-text-field
               class="center-input"
      v-model="confirm"
      required
    ></v-text-field>
           </v-col>
          <v-col cols="12" class="d-flex justify-center">
             <v-btn :class="`base-btn ${$vuetify.breakpoint.name} discard-form mr-4`" @click.prevent="del = false">Cancel</v-btn>
             <v-btn :disabled="confirm === 'delete' ? false : true" :class="`base-btn ${$vuetify.breakpoint.name} save ml-4`" @click="deleteCompany">OK</v-btn>
          </v-col>
        </v-row>
      </v-card>
</v-dialog>

<!--foodtruck invite button-->
  <div class="d-flex justify-end mb-5">
    <InviteFoodtruckForm :add="true" />
  </div>

<!--companies table display-->
  <v-data-table
    :mobile-breakpoint="0"
    :headers="headers"
    :items="companiesList"
    :items-per-page="10"
    class="elevation-1"
  >
  <template v-slot:[`item`] = "{ item }">
    <!--hover on row to display edit/delete buttons-->
    <tr
         @click="viewCompany(item)"
      >
      <td  class="d-flex align-center">{{ item.name }} </td>
      <td >
        <span v-for="cont in item.contacts" :key="cont.id" >
          <span v-if="cont.isPrimary === true" >
              <h4>{{ cont.fullName }}</h4>
        {{ cont.email }}
          </span>
        </span></td>
       <td  class="d-flex align-center" v-if="item.cuisine_types.length > 0">
          <span v-for="ct in item.cuisine_types" :key="ct.id" class="cs px-2">
            {{ ct.name }}
          </span>
        </td>
        <td v-else></td>
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
        @click.prevent="viewCompany(item)"
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
import InviteFoodtruckForm from '@/components/Admin/InviteFoodtruckForm'
export default {
  name: 'FoodtrucksAdmin',
  components: { InviteFoodtruckForm },
  data() {
    return {
      companiesList: [],
      headers: [
        {
          text: 'FOODTRUCKS',
          align: 'start',
          value: 'name',
          class: 'grey',
          width: '30%'
        },
        {
          text: 'CONTACT PRINCIPAL',
          value: 'contacts',
          class: 'grey',
          width: '20%'
        },
        {
          text: 'TYPE DE CUISINE',
          value: 'cuisine_types',
          class: 'grey'
        },
        {
          text: '',
          value: '',
          class: 'grey'
        }
      ],
      view: false,
      del: false,
      confirm: '',
      delCompany: null
    }
  },
  computed: {
    companies() {
      return this.$store.state.company.companies
    },
    admin() {
      return this.$store.state.auth.admin
    }
  },
  created() {
    this.getCompanies()
  },
  watch: {
    companies(newdata) {
      this.getCompany(newdata)
    }
  },
  methods: {
    getCompanies() {
      this.$store.dispatch('company/getCompanies', '?_where[category.id]=2&_sort=name:asc')
        .then(() => {
          this.getCompany(this.companies)
        })
    },
    getCompany(companies) {
      this.companiesList = []
      companies.forEach(com => {
        this.$store.dispatch('company/getCompany', com.id)
          .then(res => {
            com = res.data
            this.companiesList.push(com)
          })
      })
    },
    viewCompany(com) {
      this.$store.dispatch('company/getCompany', com.id)
        .then(res => {
          this.$store.dispatch('user/getUser', res.data.contacts[0].id)
            .then(res => {
              this.$store.commit('user/setUser', res.data)
              this.$router.push({ name: 'Company' })
            })
        })
    },
    deleteCompany() {
      this.$store.dispatch('company/deleteCompany', this.delCompany.id)
        .then(() => {
          this.getCompanies()
          this.del = false
          this.confirm = ''
          this.delCompany = null
        })
    },
    delPopup(com) {
      this.del = true
      this.delCompany = com
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
