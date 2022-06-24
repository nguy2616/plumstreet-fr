<template>
 <v-form
    ref="forgotpw"
    lazy-validation
    class="auth-form"
    :class="$vuetify.breakpoint.mobile ? 'max-width' : 'fixed-width'"
  >
   <v-container class="d-flex justify-center mt-10 mb-10">
    <img  :src="require('@/assets/image/logo-plumstreet.png')" alt="logo" width="190px">
  </v-container>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-MAIL"
      required
    ></v-text-field>

     <v-btn
      block
       :class="`base-btn ${$vuetify.breakpoint.name} save mt-8 text-none`"
      @click.prevent="submit"
    >
      {{ $i18n.t('auth.ResetPassword')}}
    </v-btn>

    <v-snackbar
     top
     centered
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
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      snackbar: false,
      timeout: 2000,
      color: '',
      noti: ''
    }
  },
  methods: {
    submit() {
      if (this.$refs.forgotpw.validate()) {
        this.$store.dispatch('auth/forgotPassword', { email: this.email })
          .then(() => {
            this.noti = 'A link to reset your password has been sent to your email'
            this.color = 'success'
            this.snackbar = true
          })
      }
    }
  }
}
</script>

<style>

</style>
