<template>
<v-dialog
      v-model="visible"
      :width="$vuetify.breakpoint.mobile ? '100%' : '50%'"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        v-if="add === true"
          v-bind="attrs"
          v-on="on"
          class="base-btn invite text-none"
        >
          <v-icon large >
            mdi-plus
          </v-icon>
          {{ $i18n.t("admin.Invite")}}
        </v-btn>

      </template>

      <v-card >
        <v-card-title class="justify-center text-h4" style="color: #4FCCA0; font-weight: 800">
          {{ $i18n.t('admin.inviteFoodtruck')}}
        </v-card-title>
      <div class="d-flex justify-center">
  </div>
        <v-card-text>
          <div class="d-flex justify-center">
             <v-form
    ref="inviteForm"
    lazy-validation
    :class="$vuetify.breakpoint.mobile ? 'dialog-form max-width' : 'dialog-form fixed-width'"
  >
    <v-text-field
      v-model="foodtruckName"
      :label="$i18n.t('admin.foodtruckName')"
      required
    ></v-text-field>
       <v-text-field
      v-model="fullName"
      :rules="usernameRules"
      :label="$i18n.t('auth.FLName')"
      required
    ></v-text-field>
      <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-MAIL"

      required
    ></v-text-field>
      <!--<v-text-field
      v-model="password"
      :rules="passwordRules"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="show =! show"
      :type="show ? 'text' : 'password'"
        :label="$i18n.t('auth.Password')"
          autocomplete="new-password"
      required
    ></v-text-field>-->

     <h5 class="text-center second-color d-flex justify-center mb-2" v-if="error !== ''">{{ error }}</h5>
    <v-row class="d-flex justify-center">
      <v-col  v-for="n in 3" :key="n">
        <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row class="d-flex mt-4">
      <v-col class="d-flex justify-end">
        <v-btn
           :class="`base-btn ${$vuetify.breakpoint.name} discard-form`"
            @click="cancel"
          >
            {{ $i18n.t('auth.Cancel')}}
          </v-btn>
      </v-col>
       <v-col class="d-flex justify-start">
          <v-btn
           :class="`base-btn ${$vuetify.breakpoint.name} save`"
            @click="submit"
          >
            {{ $i18n.t('auth.invite')}}
          </v-btn>
      </v-col>
    </v-row>
  </v-form>
          </div>

        </v-card-text>
      </v-card>
      <!--display success message popup-->
      <v-dialog
    v-model="success"
    :width="$vuetify.breakpoint.mobile ? '100vw' : '50vw'"
     >
      <v-card  class="d-flex justify-center align-center pa-8" style="overflow: hidden">
        <v-row class="d-flex">
          <v-col cols="12" class="d-flex justify-center">
             <h2 class="textt-h2 primary-color">{{ $i18n.t('admin.success')}}</h2>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
             <v-btn color="auth" @click="success = false">OK</v-btn>
          </v-col>
        </v-row>
      </v-card>
</v-dialog>
    </v-dialog>
</template>

<script>
import emailjs from 'emailjs-com'
import { SIB_USERID, SIB_SERVICEID } from '@/utils/constant'
import * as func from '@/utils/function'
emailjs.init(SIB_USERID)

export default {
  name: 'InviteFoodtruckForm',
  props: ['add'],
  data() {
    return {
      foodtruckName: '',
      fullName: '',
      email: '',
      password: '',
      usernameRules: [
        v => !!v || 'Name is required'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      show: false,
      loading: false,
      visible: false,
      error: '',
      success: false
    }
  },
  computed: {
    admin() {
      return this.$store.state.auth.admin
    }
  },
  methods: {
    submit() {
      if (this.$refs.inviteForm.validate()) {
        this.loading = true
        const companyForm = { name: this.foodtruckName, category: 2 }
        this.$store.dispatch('company/createCompany', companyForm)
          .then(res => {
            this.admin.created_companies.push(res.data)
            const adminForm = { id: this.admin.id, created_companies: this.admin.created_companies }
            this.$store.dispatch('user/updateProfile', adminForm)
              .then(() => {
                this.password = func.rndStr(8)
                const user = { username: this.email.substring(0, this.email.indexOf('@')), fullName: this.fullName, email: this.email, password: this.password, role: { id: 4 }, company: res.data.id, isPrimary: true }
                this.$store.dispatch('user/createUser', user)
                  .then(() => {
                    this.loading = false
                    this.visible = false
                    this.sendEmail()
                    this.$refs.inviteForm.reset()
                    this.success = true
                    // reload the companies list
                    this.$store.dispatch('company/getCompanies', '?_sort=name:asc')
                  })
                  .catch(err => {
                    this.error = err
                    this.$store.dispatch('company/deleteCompany', res.data.id)
                    this.loading = false
                  })
              })
          })
          .catch(err => {
            this.error = err
            this.loading = false
          })
      }
    },
    cancel() {
      this.$refs.inviteForm.reset()
      this.visible = false
    },
    sendEmail() {
      try {
        emailjs.send(SIB_SERVICEID, 'template_lkvr2pi'
          , {
            fullName: this.fullName,
            email: this.email,
            password: this.password
          })
      } catch (err) {
        return err
      }
    }
  }
}

</script>

<style>

</style>
