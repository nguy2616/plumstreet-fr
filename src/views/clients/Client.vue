<template>
<v-card class="client" :class="$vuetify.breakpoint.mobile || admin ? 'max-width admin-bgpa-4' : 'fixed-width pa-6'">
    <v-tabs
      v-model="tab"
      background-color="transparent"
    >
      <v-tab
        v-for="item in tabs"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
      >
        <v-card
        >
          <v-card-text class="d-flex justify-center">
             <v-form
    ref="clientForm"
    lazy-validation
    class="auth-form"
     :class="$vuetify.breakpoint.mobile || admin ? 'max-width admin-bg' : 'fixed-width'"
  >
  <!--<h4 class="text-h4 mb-4">{{ $i18n.t('client.ClientInfo') }}</h4>-->
     <v-text-field
      v-model="fullName"
    :label="$i18n.t('auth.FLName')"
      required
    ></v-text-field>
      <v-text-field
      v-model="email"
      :rules="emailRules"
      disabled
      label="E-MAIL"
      required
    ></v-text-field>
      <v-text-field
      v-model="phoneNumber"
        :label="$i18n.t('auth.PhoneNumber')"
    ></v-text-field>
     <v-textarea
        solo
        rows="3"
          :label="$i18n.t('auth.Address')"
          v-model="address"
        ></v-textarea>
            <v-select
     solo
      v-model="country"
      :items="countries"
       :label="$i18n.t('auth.Country')"
      item-text="name"
    ></v-select>
    <v-row class="d-flex mt-3">
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
          </v-card-text>
        </v-card>
      </v-tab-item>
       <v-tab-item
      >
        <v-card
        >
          <v-card-text class="d-flex justify-center">
              <v-form
    ref="pwForm"
    lazy-validation
    class="auth-form"
     :class="$vuetify.breakpoint.mobile || admin ? 'max-width admin-bg' : 'fixed-width'"
  >
   <v-text-field
      v-model="password"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="show =! show"
      :type="show ? 'text' : 'password'"
        label="New password"
          autocomplete="new-password"
          required
    ></v-text-field>

     <v-text-field
      v-model="cfpassword"
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="show2 =! show2"
      :type="show2 ? 'text' : 'password'"
      :rules="cfpasswordRules"
        label="Confirm password"
          autocomplete="new-password"
          required
    ></v-text-field>

     <v-row class="d-flex mt-3">
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
      :class="`base-btn ${$vuetify.breakpoint.name} save`"
      @click.prevent="changePassword"
    >
        {{ $i18n.t('auth.Save')}}
          <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
       </v-col>
  </v-row>
        </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
</v-card>

</template>

<script>
import countries from '@/utils/countries'
export default {
  name: 'Client',
  data() {
    return {
      tabs: ['Profile Information', 'Change password'],
      tab: 0,
      fullName: '',
      email: '',
      password: null,
      cfpassword: null,
      cfpasswordRules: [
        v => v === this.password || 'Confirm password and password not matched'
      ],
      show: false, // show password
      show2: false,
      phoneNumber: '',
      disable: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      address: '',
      country: null,
      countries: []
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.admin ? this.$store.state.user.user : this.$store.state.auth.user
    },
    admin() {
      return this.$store.state.auth.admin
    }
  },
  watch: { // watch if the form is changed, unlock the save button
    fullName(newval) {
      if (newval !== this.user.fullName) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    email(newval) {
      if (newval !== this.user.email) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    phoneNumber(newval) {
      if (newval !== this.user.phoneNumber) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    address(newval) {
      if (newval !== this.user.address) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    country(newval) {
      if (newval !== this.user.country) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    disable(val) {
      this.$store.commit('auth/save', val)
    },
    $route(to, from) {
      if (from.name === 'Client' && this.disable === false) { // if the form change but go to other page
        this.getUser(this.user.id) // reset the form to default
      } else if (from.name === 'Requests' && to.params.id) {
        this.getUser(to.params.id)
      }
      if (to.name === 'Client') {
        this.getUser(this.user.id) // get data of the client
      }
    }
  },
  mounted() {
    this.countries = countries
    this.getUser(this.$route.params.id ? this.$route.params.id : this.user.id)
  },
  methods: {
    getUser(id) { // get client data
      this.$store.dispatch('user/getUser', id)
        .then(res => {
          this.$store.commit('user/setUser', res.data)
          this.fullName = res.data.fullName // update the form regarding to user data
          this.email = res.data.email
          this.phoneNumber = res.data.phoneNumber
          this.address = res.data.address
          this.country = res.data.country
          this.disable = true // disable the save button until change the any data
          this.$store.commit('auth/save', this.disable)
        })
    },
    submit() {
      if (this.$refs.clientForm.validate()) {
        const userForm = { id: this.$store.state.auth.user.id, fullName: this.fullName, phoneNumber: this.phoneNumber, address: this.address, country: this.country } // if not changing password
        // const userForm2 = { id: this.$store.state.auth.user.id, fullName: this.fullName, phoneNumber: this.phoneNumber, password: this.password !== null ? this.password : null } // chage password
        this.$store.dispatch('user/updateProfile', userForm) // handle update user with/without changing password
          .then(res => {
            this.$store.commit('auth/setUser', res.data)
            this.disable = true
          })
      }
    },
    changePassword() {
      if (this.$refs.pwForm.validate()) {
        const userForm = { id: this.user.id, password: this.password }
        this.$store.dispatch('user/updateProfile', userForm)
          .then(res => {
            this.$store.commit('auth/setUser', res.data)
            this.disable = true
            this.$refs.pwForm.reset()
            this.$router.push('/events')
          })
      }
    }
  }
}
</script>

<style>

</style>
