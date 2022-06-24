<template>
<v-form
    ref="resetpw"
    lazy-validation
    class="auth-form"
    :class="$vuetify.breakpoint.mobile ? 'max-width' : 'fixed-width'"
  >
   <v-container class="d-flex justify-center mt-10 mb-10">
    <img  :src="require('@/assets/image/logo-plumstreet.png')" alt="logo" width="190px">
  </v-container>
    <v-text-field
      v-model="password"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="show =! show"
      :type="show ? 'text' : 'password'"
        :label="$i18n.t('auth.Password')"
          autocomplete="new-password"
    ></v-text-field>
    <v-text-field
      v-model="confirmPassword"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="show =! show"
      :type="show ? 'text' : 'password'"
        label="Confirm password"
          autocomplete="new-password"
    ></v-text-field>
    <p v-if="error" class="text-center second-color">{{error}}</p>
     <v-btn
       :class="`base-btn ${$vuetify.breakpoint.name} save mt-8 text-none`"
      block
      @click.prevent="submit"
    >
      {{ $i18n.t('auth.ResetPassword')}}
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
export default {
  name: 'ResetPassword',
  data() {
    return {
      password: '',
      confirmPassword: '',
      passwordRules: [
        v => !!v || 'New password is required'
      ],
      confirmPasswordRules: [
        v => !!v || 'Confirm password is required and must be the same as password'
      ],
      show: false, // show password
      snackbar: false,
      noti: '',
      timeout: 2000,
      color: '',
      error: null
    }
  },
  watch: {
    password(val) {
      if (val) {
        this.error = null
      }
    }
  },
  methods: {
    submit() {
      if (this.$refs.resetpw.validate()) {
        if (this.comparePW(this.password, this.confirmPassword)) {
          const dataForm = {
            code: this.$route.query.code,
            password: this.password,
            passwordConfirmation: this.confirmPassword
          }
          this.$store.dispatch('auth/resetPassword', dataForm)
            .then(() => {
              this.noti = 'Your password has been updated successfully'
              this.color = 'success'
              this.snackbar = true
              this.$router.push('/')
            })
            .catch(er => {
              this.error = er
            })
        } else {
          this.error = 'Password and confirm password must be the same'
        }
      }
    },
    comparePW(pw, confirm) {
      if (pw === confirm) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>

</style>
