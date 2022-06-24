<template>
 <v-form
    ref="bankForm"
    lazy-validation
    class="auth-form"
     :class="$vuetify.breakpoint.mobile || admin ? 'max-width admin-bg' : 'fixed-width'"
  >
   <h4 class="text-h4 mb-4">{{ $i18n.t('auth.Step2') }}</h4>
    <v-text-field
      v-model="bankName"
      :rules="bankNameRules"
      :label="$i18n.t('auth.BankName')"
      required
    ></v-text-field>
    <v-text-field
      v-model="IBAN"
      :label="$i18n.t('auth.IBAN')"
    ></v-text-field>
    <v-textarea
        solo
        rows="3"
          :label="$i18n.t('auth.BankAddress')"
          v-model="address"
        ></v-textarea>
 <v-text-field
      v-model="zip"
      :label="$i18n.t('auth.Code')"
    ></v-text-field>
   <v-text-field
      v-model="city"
      :label="$i18n.t('auth.City')"
    ></v-text-field>
     <v-select
      v-model="country"
       :label="$i18n.t('auth.Country')"
      :items="countries"
      item-text="name"
    ></v-select>
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
</template>

<script>
import countries from '@/utils/countries'
export default {
  name: 'Bank',
  data() {
    return {
      bankName: '',
      address: '',
      zip: '',
      IBAN: '',
      city: '',
      country: null,
      countries: [],
      bankNameRules: [
        v => !!v || 'Bank name is required'
      ],
      disable: true
    }
  },
  watch: { // watch if the form change, unlock the save button
    bankName(newval) {
      if (newval !== this.company.bankName) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    address(newval) {
      if (newval !== this.company.bankAddress) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    zip(newval) {
      if (newval !== this.company.bankZIP) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    city(newval) {
      if (newval !== this.company.bankCity) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    IBAN(newval) {
      if (newval !== this.company.IBAN) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    country(newval) {
      if (newval !== this.company.bankCountry) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    disable(val) {
      this.$store.commit('auth/save', val)
    },
    $route(to, from) { // get the default data
      if (to.name === 'Bank') {
        this.getCompany()
      }
      if (from.name === 'Bank' && this.disable === false) {
        this.getCompany()
      }
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
      return this.$store.state.auth.admin ? this.$store.state.user.user : this.$store.state.auth.user
    }
  },
  mounted() {
    this.getCompany()
    this.countries = countries
    this.$store.commit('auth/save', this.disable) // disable the save button
  },
  methods: {
    getCompany() { // get data
      this.$store.dispatch('company/getCompany', this.user.company.id)
        .then(res => {
          this.bankName = res.data.bankName
          this.address = res.data.bankAddress
          this.zip = res.data.bankZIP
          this.IBAN = res.data.IBAN
          this.city = res.data.bankCity
          this.country = res.data.bankCountry
          this.disable = true
        })
    },
    submit() { // update the company
      if (this.$refs.bankForm.validate()) {
        const bankForm = { id: this.company.id, bankName: this.bankName, bankAddress: this.address, bankZIP: this.zip, bankCity: this.city, bankCountry: this.country, IBAN: this.IBAN }
        // console.log(bankForm)
        this.$store.dispatch('company/updateCompany', bankForm)
          .then(() => {
            this.disable = true
            this.$router.push('/contact')
          })
        // this.$router.push('/contact')
      }
    }
  }
}
</script>

<style>

</style>
