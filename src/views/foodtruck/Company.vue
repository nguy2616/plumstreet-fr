<template>
   <v-form
    ref="companyForm"
    lazy-validation
    class="auth-form"
    :class="$vuetify.breakpoint.mobile || admin ? 'max-width admin-bg' : 'fixed-width'"
  >
   <h4 class="text-h4 mb-4">{{ $i18n.t('auth.Step1') }}</h4>
    <v-text-field
      v-model="companyName"
      :rules="companyNameRules"
      :label="$i18n.t('auth.CompanyName')"
      required
    ></v-text-field>
   <v-select
      solo
      v-model="legalForm"
      :items="legalForms"
      item-value="id"
      item-text="name"
       :label="$i18n.t('auth.LegalForm')"
      required
    ></v-select>
    <v-textarea
        solo
        rows="3"
          :label="$i18n.t('auth.Address')"
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
    <!--<v-btn
      :class="`base-btn ${$vuetify.breakpoint.name} save`"
      v-if="company === null"
      @click.prevent="submit"
    >
      {{ $i18n.t('auth.Following')}} <v-icon  >mdi-arrow-right</v-icon>
    </v-btn>-->
       <v-btn
       :disabled="disable"
      :class="`base-btn ${$vuetify.breakpoint.name} save`"
      @click.prevent="update"
    >
         {{ $i18n.t('auth.Save')}}
          <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
       </v-col>

  </v-row>
  </v-form>
</template>

<script>
// import { getBase64, DataURIToBlob } from '@/utils/function'
import countries from '@/utils/countries'

export default {
  name: 'Company',
  data() {
    return {
      companyName: '',
      address: '',
      zip: '',
      city: '',
      legalForm: null,
      country: '',
      countries: [],
      companyNameRules: [
        v => !!v || 'Company name is required'
      ],
      disable: true
    }
  },
  watch: { // watch if the form is change, unlock the save button
    companyName(newval) {
      if (newval !== this.company.name) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    address(newval) {
      if (newval !== this.company.address) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    zip(newval) {
      if (newval !== this.company.zip) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    city(newval) {
      if (newval !== this.company.city) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    legalForm(newval) {
      if (newval !== this.company.legal_form) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    country(newval) {
      if (newval !== this.company.country) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    disable(val) {
      this.$store.commit('auth/save', val)
    },
    $route(to, from) {
      if (to.name === 'Company') {
        this.getCompany()
      }
      if (from.name === 'Company' && this.disable === false) {
        this.getCompany()
      }
    }
  },
  computed: {
    legalForms() {
      return this.$store.state.legalForm.legalForms
    },
    user() {
      return this.$store.state.auth.admin ? this.$store.state.user.user : this.$store.state.auth.user
    },
    admin() {
      return this.$store.state.auth.admin
    },
    company() {
      return this.$store.state.company.company
    },
    contact() {
      return this.$store.state.user.user
    }
  },
  mounted() {
    this.getLegalForms()
    this.getCompany()
    this.countries = countries
    this.$store.commit('auth/save', this.disable)
  },
  methods: {
    // submit() {
    //  if (this.$refs.companyForm.validate()) {
    //    const dataForm = { name: this.$route.params.comName, address: this.address, zip: this.zip, city: this.city, category: 2, legal_form: this.legalForm, country: this.country }
    //    // console.log(dataForm)
    //    this.$store.dispatch('company/createCompany', dataForm)
    //      .then(res => {
    //        this.user.created_companies.push(res.data)
    //        const userForm = { id: this.user.id, created_companies: this.user.created_companies }
    //        this.$store.dispatch('user/updateProfile', userForm)
    //          .then(() => {
    //            this.disable = false
    //            this.$refs.companyForm.reset()
    //            this.$router.push({ name: 'Bank' })
    //          })
    //      })
    //    // this.$router.push('/bank')
    //  }
    // },
    getCompany() { // get the data
      this.$store.dispatch('company/getCompany', this.user.company.id)
        .then(res => {
          this.companyName = res.data.name
          this.address = res.data.address
          this.zip = res.data.zip
          this.city = res.data.city
          this.legalForm = res.data.legal_form
          this.country = res.data.country
          this.disable = true
          console.log(this.company)
        })
    },
    update() { // handle update the company data
      if (this.$refs.companyForm.validate()) {
        const dataForm = { id: this.company.id, name: this.companyName, address: this.address, zip: this.zip, city: this.city, legal_form: this.legalForm, country: this.country }
        // console.log(dataForm)
        this.$store.dispatch('company/updateCompany', dataForm)
          .then(() => {
            this.disable = true
            this.$router.push('/bank')
          })
        // this.$router.push('/bank')
      }
    },
    getLegalForms() {
      this.$store.dispatch('legalForm/getLegalForms')
    }

  }
}
</script>

<style>

</style>
