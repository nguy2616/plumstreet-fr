<template>
  <v-form
    ref="form"
    lazy-validation
    class="auth-form"
    :class="$vuetify.breakpoint.mobile ? 'max-width' : 'fixed-width'"
  >
  <v-container class="d-flex justify-end">
    <ClientPopup :signup="true"/>
  </v-container>
  <v-container class="d-flex justify-center mt-10 mb-10">
    <img  :src="require('@/assets/image/logo-plumstreet.png')" alt="logo" width="190px">
  </v-container>

    <v-text-field
      v-model="fullName"
      style="display: none"
      :label="$i18n.t('auth.FLName')"
      required
    ></v-text-field>
    <!--<v-text-field
      v-model="phoneNumber"
        :label="$i18n.t('auth.PhoneNumber')"
    ></v-text-field>-->
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-MAIL"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="show =! show"
      :type="show ? 'text' : 'password'"
        :label="$i18n.t('auth.Password')"
          autocomplete="new-password"
      required
          v-on:keyup.enter="submit"
    ></v-text-field>
    <v-row class="d-flex justify-space-between">
      <v-col class="d-flex">
        <v-checkbox v-model="saveAccount"></v-checkbox><h6 class="text-h6 pt-1" style="font-weight: 100;">Remember me</h6>
      </v-col>
       <v-col class="d-flex justify-end">
         <v-btn text @click.prevent="(e) => { $router.push('/fotgot-password') }"><h6 class="text-h6 primary-color" style="text-decoration: underline; font-weight: 100;">Forgot password</h6></v-btn>
       </v-col>
    </v-row>
     <v-btn
      class="mt-8"
      block
      :class="`base-btn ${$vuetify.breakpoint.name} save`"
      @click.prevent="submit"
    >
      {{ $i18n.t('auth.Login')}}
    </v-btn>
     <v-snackbar
     top
     :color="color"
      v-model="snackbar"
      :timeout="timeout"
    >
     <h3 class="text-center"> {{ noti }}</h3>
     </v-snackbar>
  </v-form>
</template>

<script>
import ClientPopup from '@/components/Client/ClientPopup.vue'

export default {
  name: 'Login',
  components: { ClientPopup },
  data() {
    return {
      snackbar: false, // show the top message
      fullName: '',
      noti: '', // snackbar message
      color: '', // color of the snackbar
      timeout: 2000, // the snackbar message timeout 2s
      show: false, // show password
      email: this.$store.state.auth.rememberEmail ? this.$store.state.auth.rememberEmail : '',
      password: this.$store.state.auth.rememberPassword ? this.$store.state.auth.rememberPassword : '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      saveAccount: false // remember account,
    }
  },
  created() {
    this.clearExpiredSession() // clear all the data of previous session
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.saveInfo()
        const dataForm = { identifier: this.email, password: this.password }
        this.$store.dispatch('auth/login', dataForm) // handle login
          .then(res => {
            this.$store.commit('user/setUser', res.data.user)
            this.noti = 'Log in successfully!!'
            this.color = 'success'
            this.snackbar = true
            this.checkRole(res.data.user) // check role user for the next page
            this.resetForm() // reset the form
          })
          .catch(err => {
            this.noti = err
            this.color = 'error'
            this.snackbar = true
          })
      }
    },
    clearExpiredSession() {
      this.$store.dispatch('auth/logout')
      this.$store.dispatch('company/logout')
      this.$store.commit('user/setUser', null)
      this.$store.commit('auth/save', false)
    },
    checkRole(user) {
      if (user.role.id === 4) { // if user is contact
        this.$store.dispatch('auth/saveInfo', true)
        this.$store.dispatch('company/getCompany', user.company.id) // get company of the contact
          .then(() => {
            this.$router.push({ name: 'Requests' })
          }
          )
      } else if (user.role.id === 3) { // if user is admin
        this.$store.commit('auth/setAdmin', user)
        this.$router.push({ name: 'FoodtrucksAdmin' })
      } else if (user.role.id === 5) { // if user is client
        this.$router.push('/events')
      }
    },
    resetForm() {
      this.password = ''
      if (this.saveAccount) {
        this.email = this.$store.state.auth.rememberEmail
        this.password = this.$store.state.auth.rememberPassword
      } else {
        this.email = ''
        this.password = ''
      }
    },
    saveInfo() {
      if (this.saveAccount === true) {
        this.$store.commit('auth/setRememberEmail', this.email)
        this.$store.commit('auth/setRememberPassword', this.password)
      } else {
        this.$store.commit('auth/setRememberEmail', null)
        this.$store.commit('auth/setRememberPassword', null)
      }
    }

  }
}
</script>

<style scoped>
.v-btn:hover {
  background-color: white;
  color: white;
}

</style>
