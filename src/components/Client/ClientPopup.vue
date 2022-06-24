<template>
<v-dialog
      eager
      v-model="visible"
      :width="$vuetify.breakpoint.mobile ? '100%' : '50%'"
    >
      <template v-slot:activator="{ on, attrs }">
         <v-btn v-bind="attrs" v-if="signup"
          v-on="on" :class="`base-btn ${$vuetify.breakpoint.name} save text-none`"
          max-width="none">{{ $i18n.t('auth.ReserveFT')}}</v-btn>
           <v-btn v-bind="attrs" v-else
          v-on="on" :class="`base-btn ${$vuetify.breakpoint.name} save text-none`"
          max-width="none"><v-icon large >
            mdi-plus
          </v-icon>{{ $i18n.t('client.CreateEvent')}}</v-btn>
      </template>
   <!--popup step1 card-->
      <v-card :class="`client-popup d-flex justify-center align-center ${$vuetify.breakpoint.name}`">
        <v-card-text>
          <!--start screen-->
          <div v-if="start === false" :class="`${$vuetify.breakpoint.name} step0 d-flex align-center justify-center`" >
            <div class="text-center">
                <h5 class="text-h5">Dites nous tout!</h5>
          <p >Pour vous proposer une offre sur-mesure</p>
              <v-btn @click="start = true"  :class="`base-btn ${$vuetify.breakpoint.name} save text-none`">GO</v-btn>
            </div>
        </div>

        <div v-else>
          <!--top fixed stepper bar-->
    <v-stepper alt-labels v-model="step" class="fixed-top ma-2" >
      <v-stepper-header>
        <v-stepper-step step="1" :complete="step > 1" >
     Info évènement
        </v-stepper-step>
       <v-divider></v-divider>

        <v-stepper-step step="2" :complete="step > 2">
         Services
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step step="3" :complete="step > 3">
          Type de cuisine
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4" :complete="step > 4">
          Info contact
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>

<!--step 1 event type, qunaitty, budget-->
    <div v-if="step === 1" :class="`step1 d-flex align-center justify-center ${$vuetify.breakpoint.name}`">
      <v-form
    ref="eventform1"
    lazy-validation
    class="event-form"
  >
     <v-text-field
      v-model="name"
      :rules="nameRules"
          :label="$i18n.t('client.EventName')"
      required
    ></v-text-field>
    <!--<span v-if="steps[0].subtitle">{{ steps[0].subtitle }}</span>-->

<!-- step 2 place name, service, date-->
   <v-text-field
      v-model.number="quantity"
      :rules="quantityRules"
       :label="$i18n.t('client.Quantity')"
      required
    ></v-text-field>
     <v-text-field
      v-model.number="budget"
       :label="$i18n.t('client.Budget')"
      :rules="budgetRules"
      required
    ></v-text-field>
           <v-text-field
      v-model="placeName"
      :label="$i18n.t('client.placeName')"
      :rules="placeNameRules"
      required
    ></v-text-field>
     <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="computedDateFormatted"
              persistent-hint
              :rules="dateRules"
              :label="$i18n.t('client.date')"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
     <!--bottom button-->
         <v-row class="fixed-bot mb-2 d-flex" >
       <v-col class="d-flex justify-center">
          <v-btn
              :class="`base-btn ${$vuetify.breakpoint.name} save`"
            @click.prevent="submitForm($refs.eventform1)"
          >
            {{ $i18n.t('auth.Following')}}
          </v-btn>
      </v-col>
    </v-row>

          </v-form>
    </div>
<!--step 2 services-->
 <div v-else-if="step === 2" :class="`step2 d-flex align-center justify-center ${$vuetify.breakpoint.name}`">
        <v-form
         ref="eventform2"
    lazy-validation
    class="event-form">

     <h6 class="title">{{$i18n.t('client.EventType')}}</h6>
        <p class="second-color" v-show="showEvError">Please select at least one</p>
     <v-row class="d-flex">
       <v-col :cols="$vuetify.breakpoint.name === 'xs' || $vuetify.breakpoint.name === 'sm' ? 4 : 3" v-for="(item,i) in eventtypes" :key="i" >
             <v-checkbox v-model="event" :label="item.name" :value="item.id" :rules="eventRules"></v-checkbox>
       </v-col>

     </v-row>
     <v-text-field
    v-if="event === -1"
      v-model="eventName"
      :rules="placeNameRules"
    ></v-text-field>

     <h6 class="title">{{steps[5].title}}</h6>
     <p class="second-color" v-show="showSvError">Please select at least one</p>
         <v-row class="d-flex">
           <v-col :cols="$vuetify.breakpoint.name === 'xs' || $vuetify.breakpoint.name === 'sm' ? 4 : 3" v-for="(s, i) in services" :key="i">
              <v-checkbox
          v-model="selectedServices"
                  :class="[`checkbox`, $vuetify.breakpoint.name]"
            :value="s.id"
            :label="s.name"
            :rules="selectedServicesRules"
          ></v-checkbox>

           </v-col>
            <v-col :cols="$vuetify.breakpoint.name === 'xs' || $vuetify.breakpoint.name === 'sm' ? 4 : 3">
  <v-checkbox label="Autre" v-model="service"></v-checkbox>
            </v-col>
  </v-row>
  <v-text-field
    v-if="service"
      v-model="serviceName"
      :rules="placeNameRules"
    ></v-text-field>
   <h6 class="title mt-2">{{ steps[7].title }}</h6>
     <p class="second-color" v-show="showGrError">Please select at least one</p>
       <v-row class="d-flex">
         <v-col :cols="$vuetify.breakpoint.name === 'xs' || $vuetify.breakpoint.name === 'sm' ? 4 : 3"  v-for="(item, i) in menuGroups" :key="i">
             <v-checkbox
        :class="[`checkbox`, $vuetify.breakpoint.name]"
        v-model="selectedGroups"
        :rules="selectedGroupsRules"
        :value="item.id"
        :label="$i18n.t(`menu.${item.name}`)"
      >
      </v-checkbox>
         </v-col>
       </v-row>

        <!--bottom button-->

         <v-row class="fixed-bot mb-2 d-flex">
      <v-col class="d-flex justify-end">
        <v-btn
              :class="`base-btn ${$vuetify.breakpoint.name} discard-form`"
            @click="preStep"
          >
            {{ $i18n.t('auth.Previous')}}
          </v-btn>
      </v-col>
       <v-col class="d-flex justify-start">
          <v-btn
              :class="`base-btn ${$vuetify.breakpoint.name} save`"
            @click.prevent="submitForm($refs.eventform2)"
          >
            {{ $i18n.t('auth.Following')}}
          </v-btn>
      </v-col>
    </v-row>
        </v-form>
    </div>
<!--step 3 cuisine type-->
     <div v-else-if="step === 3" :class="`step2 d-flex align-center justify-center ${$vuetify.breakpoint.name}`">
        <v-form
         ref="eventform3"
    lazy-validation
    class="event-form">
      <h6 class="title">{{ $i18n.t('auth.CuisineType') }}*</h6>
         <v-row class="d-flex">
            <v-col class="cuisinetypes" :cols="$vuetify.breakpoint.name === 'xs' || $vuetify.breakpoint.name === 'sm' ? 4 : 3">
            <v-checkbox
            v-model="any"
        label="Any"
        @change="selectAny(any)"
      >
            </v-checkbox>
            </v-col>
    <v-col class="cuisinetypes" :cols="$vuetify.breakpoint.name === 'xs' || $vuetify.breakpoint.name === 'sm' ? 4 : 3" v-for="(item, i) in cuisinetypes" :key="i">
      <v-checkbox
      :disabled="any"
        v-model="selectedCT"
        :value="item"
        :label="item.name"
      >
      </v-checkbox>
    </v-col>
   </v-row>
       <v-row class="d-flex justify-center">
      <v-col  v-for="n in 3" :key="n">
        <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>
      </v-col>
    </v-row>
        <!--bottom button-->

         <v-row class="fixed-bot mb-2 d-flex">
      <v-col class="d-flex justify-end">
        <v-btn
              :class="`base-btn ${$vuetify.breakpoint.name} discard-form`"
            @click="preStep"
          >
            {{ $i18n.t('auth.Previous')}}
          </v-btn>
      </v-col>
       <v-col class="d-flex justify-start">
         <!--skip step 3 if already signed in-->
         <v-btn
         v-if="!signup"
                 :class="`base-btn ${$vuetify.breakpoint.name} save`"
             @click="submit($refs.eventform3)"
          >
            {{ $i18n.t('auth.Send')}}
          </v-btn>
          <!--to step 3-->
          <v-btn
          v-else
              :class="`base-btn ${$vuetify.breakpoint.name} save`"
            @click.prevent="submitForm($refs.eventform3)"
          >
            {{ $i18n.t('auth.Following')}}
          </v-btn>
      </v-col>
    </v-row>
        </v-form>
    </div>
<!--step 4 user information-->
     <div v-else-if="step === 4 && signup" :class="`step3 d-flex align-center justify-center ${$vuetify.breakpoint.name}`">
        <v-form
         ref="eventform4"
    lazy-validation
    class="event-form">
    <v-text-field
      v-model="fullName"
      :label="steps[8].title"
      required
      :rules="fullNameRules"
    ></v-text-field>

       <!--<span v-if="steps[9].subtitle">{{ steps[9].subtitle }}</span>-->
    <v-text-field
      v-model="email"
      :label="steps[9].title"
      :rules="emailRules"
      required
    ></v-text-field>

    <v-text-field
      v-model="phoneNumber"
      :rules="phoneRules"
              :label="steps[10].title"
      required
    ></v-text-field>

       <v-text-field
       :label="steps[11].title"
      v-model="other"
    ></v-text-field>

        <h5 class="text-h5 text-center mt-3 second-color" v-if="error">{{ error }}</h5>
         <v-row class="d-flex justify-center">
      <v-col  v-for="n in 3" :key="n">
        <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>
      </v-col>
    </v-row>
            <!--bottom button-->
         <v-row class="fixed-bot mb-2 d-flex">
      <v-col class="d-flex justify-end">
        <v-btn
              :class="`base-btn ${$vuetify.breakpoint.name} discard-form`"
            @click="preStep"
          >
            {{ $i18n.t('auth.Previous')}}
          </v-btn>
      </v-col>
       <v-col class="d-flex justify-start">
          <v-btn
              :class="`event-btn ${$vuetify.breakpoint.name} save`"
             @click.prevent="submit($refs.eventform4)"
          >
            {{ $i18n.t('auth.Send')}}
          </v-btn>
      </v-col>
    </v-row>
       </v-form>
    </div>

 <div v-else-if="step === 5" :class="`step3 d-flex align-center justify-center ${$vuetify.breakpoint.name} mt-0`">
  <div class="text-center">
    <h5 class="text-h5">{{ $i18n.t('client.FormReceive')}}</h5>
    <p>
{{ $i18n.t('client.CheckEmail')}} </p>
    <v-btn @click.prevent="resetForm()"  :class="`base-btn ${$vuetify.breakpoint.name} save text-none`">{{ $i18n.t('client.ReturnWeb')}}</v-btn>
  </div>
    </div>
  </div>
        </v-card-text>

      </v-card>
</v-dialog>
</template>

<script>
import emailjs from 'emailjs-com'
import { SIB_USERID, SIB_SERVICEID } from '@/utils/constant'
import * as func from '@/utils/function'
emailjs.init(SIB_USERID)

export default {
  name: 'ClientPopup',
  props: ['signup'],
  data() {
    return {
      row: null,
      start: false, // open the event form when user click Go
      visible: false, // open/close the form
      step: 1, // the progress of the form
      event: 1, // the selected event
      eventRules: [
        v => v !== null
      ],
      any: false, // if true (the selected cuisine types are empty)
      name: '', // name of the vent
      nameRules: [
        v => !!v || 'Event name is required'
      ],
      fullName: '', // fullname of the client
      fullNameRules: [
        v => !!v || 'Name is required'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      phoneNumber: '',
      phoneRules: [
        v => !!v || 'Phone number is required'
      ],
      email: '', // email of client
      quantity: '', // quantity of the event
      password: '', // client password
      quantityRules: [
        v => !!v || 'Quantity of guests is required',
        v => (!isNaN(parseFloat(v))) || 'Budget must be number'
      ],
      budget: '', // event budget
      budgetRules: [
        v => !!v || 'Budget is required',
        v => (!isNaN(parseFloat(v))) || 'Budget must be number'
      ],
      placeName: 'Beaulieu',
      placeNameRules: [
        v => !!v || 'Name is required'
      ],
      other: '', // other note for event
      eventName: '', // event name
      selectedServices: [], // list of selected services
      selectedServicesRules: [
        v => v.length > 0 || this.service
      ],
      serviceName: '', // other service to be created
      service: false, // if true, show the input field for service name
      selectedCT: [], // list of selected cuisine types
      selectedGroups: [], // list of selected offers
      selectedGroupsRules: [
        v => v.length > 0
      ],
      showEvError: false,
      showGrError: false,
      showSvError: false,
      steps: [
        { id: 1, title: "Type d'événement*" },
        { id: 2, title: "Nombre d'invités*", subtitle: 'nécessaire pour effectuer une offre précise' },
        { id: 3, title: 'Budget par invité (en EUR)*' },
        { id: 4, title: "Ville/Commune de l'événement*" },
        { id: 5, title: 'Date de l’événement*' },
        { id: 6, title: 'Services*', subtitle: 'Plusieurs choix possibles' },
        { id: 7, title: 'Type de prestation désirée*', subtitle: 'Plusieurs choix possibles' },
        { id: 8, title: "A inclure dans l'offre*", subtitle: 'Plusieurs choix possibles' },
        { id: 9, title: 'Prénom, Nom*' },
        { id: 10, title: 'Votre adresse mail*', subtitle: 'nécessaire pour vous envoyer nos propositions' },
        { id: 11, title: 'Votre numéro de téléphone*' },
        { id: 12, title: 'Des informations supplémentaires ?', subtitle: 'Quel est votre critère essentiel pour que votre événement soit une réussite ?' },
        { id: 13, title: 'Le paiement se fera par' }
      ],
      stepnumbers: [
        { number: 1, title: "Nom de l'événement" },
        { number: 2, title: 'Type de cuisine' },
        { number: 3, title: 'Info contact' }
      ],
      error: null, // error message
      loading: false, // loading the requests after submit
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu1: false,
      dateRules: [
        v => (func.compareTimestamp(v) === true || 'Date must be greater than today')
      ]
    }
  },
  computed: {
    eventtypes() {
      return this.$store.state.eventtype.eventtypes
    },
    cuisinetypes() {
      return this.$store.state.cuisinetypes.cuisinetypes
    },
    menuGroups() {
      return this.$store.state.menuItemGroup.menuItemGroups
    },
    services() {
      return this.$store.state.eventservice.eventservices
    },
    user() {
      return this.$store.state.auth.user
    },
    computedDateFormatted() {
      return this.formatDate(this.date)
    }
  },
  watch: {
    visible(val) {
      if (val === false) {
        this.resetForm()
      }
    },
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    },
    event(val) {
      if (val === null) {
        this.showEvError = true
      } else {
        this.showEvError = false
      }
    },
    selectedServices(val) {
      if (val.length === 0 && this.service === false) {
        this.showSvError = true
      } else {
        this.showSvError = false
      }
    },
    service(val) {
      if (val === false && this.selectedServices.length === 0) {
        this.showSvError = true
      } else {
        this.showSvError = false
      }
    },
    selectedGroups(val) {
      if (val.length === 0) {
        this.showGrError = true
      } else {
        this.showGrError = false
      }
    }
  },
  created() {
    this.getEventTypes() // load list of event types
    this.getCuisinetypes() // load list of cuisine types
    this.getMenuGroups() // load list of offers
    this.getEventServices() // load list of services
  },
  methods: {
    preStep() { // go back to the previous step
      this.error = null // remove error message if any
      this.step -= 1 // previous step
      if (this.step === 0) {
        this.resetForm() // reset all the fields to default
        this.visible = false // close the form
        this.start = false // default
        this.step = 1 // defaul step 1
      }
      if (this.step === 3 && this.signup === false) { // user already loged in
        this.step -= 1 // skip the user information form
      }
    },
    getEventTypes() {
      this.$store.dispatch('eventtype/getEventTypes', '?_sort=name:asc') // get event types
        .then(() => {
          this.eventtypes.push({ id: -1, name: 'Autre ' })
        })
    },
    getCuisinetypes() {
      this.$store.dispatch('cuisinetypes/getCuisinetypes', '?_sort=name:asc') // get cuisine types
    },
    getMenuGroups() {
      this.$store.dispatch('menuItemGroup/getMenuItemGroups')// get offers
    },
    getEventServices() {
      this.$store.dispatch('eventservice/getEventServices', '?_sort=id:asc') // get services list
    },
    selectAny(item) {
      if (item === true) { // user select any, empty the selected list
        this.selectedCT = []
      }
    },
    resetForm() { // reset all the fields to default
      this.name = ''
      this.event = 1
      this.quantity = ''
      this.budget = ''
      this.placeName = 'Beaulieu'
      this.date = ''
      this.selectedServices = []
      this.cuisinetypes.forEach(s => {
        s.isCheck = false
      })
      this.any = false
      this.selectedCT = []
      this.selectedGroups = []
      this.getEventServices()
      this.getMenuGroups()
      this.service = false
      this.fullName = ''
      this.email = ''
      this.phoneNumber = ''
      this.password = ''
      this.start = false
      this.step = 1
      this.visible = false
    },
    createEvent(dataForm) { // create the event
      this.$store.dispatch('event/createEvent', dataForm)
        .then(() => {
          this.sendEmail() // send the email to client after successfully created event
          this.$store.commit('event/save', true) // set event isSaved to true to reload the event list
          this.step = 5 // move to the success screen
        })
        .catch(err => {
          this.error = err // show the error message
          this.loading = false // finish handling request
        })
    },
    createEventTypeAndService(userid) { // create new type and service
      if (this.event !== -1 && this.service === false) { // if client don't add new type and service
        const eventForm = { client: userid, name: this.name, event_type: this.event, guests: this.quantity, budget: this.budget, location_name: this.placeName, date: this.date, event_services: this.selectedServices, menu_item_groups: this.selectedGroups, cuisine_types: this.selectedCT }
        this.createEvent(eventForm) // create the event
      } else {
        // new event type
        if (this.event === -1) {
          this.$store.dispatch('eventtype/createEventType', { name: this.eventName })
            .then(type => {
              // new service
              if (this.service) {
                this.$store.dispatch('eventservice/createEventService', { name: this.serviceName })
                  .then(serv => {
                    this.selectedServices.push(serv.data.id) // add the new service to the selected list
                    const eventForm = { client: userid, name: this.name, event_type: type.data.id, guests: this.quantity, budget: this.budget, location_name: this.placeName, date: this.date, event_services: this.selectedServices, menu_item_groups: this.selectedGroups, cuisine_types: this.selectedCT }
                    this.createEvent(eventForm) // create event
                  })
                  .catch(err => {
                    this.loading = false // stop loading
                    this.error = err // show the error
                  })
              } else {
                // no new service
                const eventForm = { client: userid, name: this.name, event_type: type.data.id, guests: this.quantity, budget: this.budget, location_name: this.placeName, date: this.date, event_services: this.selectedServices, menu_item_groups: this.selectedGroups, cuisine_types: this.selectedCT }
                this.createEvent(eventForm)
              }
            })
            .catch(err => {
              this.loading = false
              this.error = err
            })
        } else { // new service
          this.$store.dispatch('eventservice/createEventService', { name: this.serviceName })
            .then(serv => {
              this.selectedServices.push(serv.data.id) // add the new service to the selected list
              const eventForm = { client: userid, name: this.name, event_type: this.event, guests: this.quantity, budget: this.budget, location_name: this.placeName, date: this.date, event_services: this.selectedServices, menu_item_groups: this.selectedGroups, cuisine_types: this.selectedCT }
              this.createEvent(eventForm) // create event
            })
            .catch(err => {
              this.loading = false // stop loading
              this.error = err // show the error
            })
        }
      }
    },
    sendEmail() {
      try {
        emailjs.send(SIB_SERVICEID, 'template_lkvr2pi'
          , {
            fullName: this.fullName ? this.fullName : this.user.fullName, // if new user, display this.fullName, otherwise user full name
            password: this.password ? this.password : 'your password', // display generated password if new user
            email: this.email ? this.email : this.user.email // // if new user, display this.email, otherwise user email
          })
      } catch (err) {
        this.error = err
        return err
      }
    },
    submit(form) { // submit the form and request
      if (form.validate()) {
        this.loading = true
        if (this.signup) { // if user at the login page
          this.$store.dispatch('auth/checkEmail', { email: this.email }) // check if the email is already taken
            .then(res => {
            // exist user
              if (res.data.action === 'login') { // if taken, create the event with exist email
                this.createEventTypeAndService(res.data.id) // create event
                // new user
              } else {
                this.password = func.rndStr(8) // generate random password
                const userForm = { username: this.email.substring(0, this.email.indexOf('@')), fullName: this.fullName, email: this.email, phoneNumber: this.phoneNumber, password: this.password, role: { id: 5 }, country: 'Suisse' }
                this.$store.dispatch('user/createUser', userForm) // create user
                  .then(res => {
                    this.createEventTypeAndService(res.data.id) // create event
                  })
                  .catch(error => {
                    this.error = error
                  })
              }
            })
            .catch(error => {
              this.loading = false
              this.error = error
            })
        } else {
          this.createEventTypeAndService(this.user.id) // if user signed in
        }
      }
    },
    submitForm(form) { // go the the next step
      if (form.validate()) {
        this.step += 1
      } else {
        if (this.eventt === null) {
          this.showEvError = true
        }
        if (this.selectedServices.length === 0 && !this.service) {
          this.showSvError = true
        }
        if (this.selectedGroups.length === 0) {
          this.showGrError = true
        }
      }
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}-${month}-${year}`
    },
    parseDate(date) {
      if (!date) return null
      const [day, month, year] = date.split('-')
      const finalDate = `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
      return finalDate
    },
    setError() {
      this.showError = true
    }
  }
}
</script>

<style scoped>
.v-sheet.v-stepper:not(.v-sheet--outlined) {
  box-shadow: none;
}
.theme--light.v-stepper .v-stepper__step__step  {
  background-color: #50CCA1;
}
.overflow {
  overflow: hidden;
}

</style>
