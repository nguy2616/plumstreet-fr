<template>
 <v-container v-if="company" fluid class="contacts-list "  :class="$vuetify.breakpoint.mobile || admin ? 'max-width admin-bg' : 'fixed-width'">
        <h4 class="text-h4 mb-4">{{ $i18n.t('auth.Step3') }}</h4>
  <div v-if="contacts && contacts.length > 0">
    <template  v-for="(con, i) in contacts">
      <v-hover :key="i">
         <ContactItem  :con="con" />
      </v-hover>
    </template>

  </div>
  <div  class="d-flex justify-center mt-5">
    <ContactForm :add="true"/>
  </div>
  <!--<v-row class="d-flex mt-4">
      <v-col cols="6" class="d-flex justify-end">
          <v-btn
      @click="(e) => { $router.go(-1) }"
      :class="`base-btn ${$vuetify.breakpoint.name} discard`"
    >
     {{ $i18n.t('auth.Cancel')}}
    </v-btn>
      </v-col>
      <v-col cols="6" class="d-flex justify-start">
        <v-btn
          v-if="contacts.length < 1"
          @click.prevent="onContinue"
          :class="`base-btn ${$vuetify.breakpoint.name} save`"
        >
          {{ $i18n.t('auth.Following')}} <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
        <v-btn
          v-else
          @click.prevent="onSave"
          :disabled="formChange"
          :class="`base-btn ${$vuetify.breakpoint.name} save`"
        >
          {{ $i18n.t('auth.Save')}}
        </v-btn>
      </v-col>
  </v-row>-->
  <v-snackbar
     top
     color="success"
      v-model="snackbar"
      timeout="2000"
    >
     <h3 class="text-center"> Contacts added successfully</h3>
     </v-snackbar>
 </v-container>
</template>

<script>
import ContactForm from '@/components/Auth/ContactForm'
import ContactItem from '@/components/Auth/ContactItem'

export default {
  name: 'Contact',
  components: { ContactForm, ContactItem },
  data() {
    return {
      snackbar: false,
      formChange: true
    }
  },
  computed: {
    contacts() {
      return this.$store.state.company.company.contacts
    },
    company() {
      return this.$store.state.company.company
    },
    user() {
      return this.$store.state.auth.admin ? this.$store.state.user.user : this.$store.state.auth.user
    },
    contact() {
      return this.$store.state.user.user
    },
    isSaved() {
      return this.$store.state.auth.isSaved
    },
    admin() {
      return this.$store.state.auth.admin
    }
  },
  watch: {
    contacts(newval) {
      if (newval) {
        this.formChange = false
      } else {
        this.formChange = true
      }
    }
  },
  methods: {
    onContinue() {
      if (this.company.category.name === 'FOOD TRUCK') {
        this.$router.push('/menu')
      } else {
        this.$router.push('/')
      }
    },
    onSave() {
      this.$store.dispatch('auth/saveInfo', true)
      this.snackbar = true
      this.$router.push('/cuisine-type')
    }
  }
}

</script>

<style scoped>
.v-card:hover {
  background-color: rgba(90, 232, 170, 0.45);
 }
</style>
