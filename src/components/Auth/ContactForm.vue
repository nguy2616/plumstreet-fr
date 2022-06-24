<template>
  <v-dialog
      v-model="visible"
      :width="$vuetify.breakpoint.mobile ? '100%' : '55%'"
    >
      <template v-slot:activator="{ on, attrs }">
        <!--button add new contact-->
        <v-btn
        v-if="add === true"
         :class="`base-btn ${$vuetify.breakpoint.name} add`"
          v-bind="attrs"
          v-on="on"
          class="text-none mb-5"
          block
        >
          <v-icon large >
            mdi-plus
          </v-icon>
          {{ $i18n.t("auth.AddContact")}}
        </v-btn>
<!--contact item-->
<v-hover class="hover" v-else-if="dbclick === true">
  <v-card  class="pa-6 mb-4" :class="$vuetify.breakpoint.width <= 600 ? 'contact-info-res' : 'contact-info'" style="border-radius: 16px" v-on:dblclick="visible = true">
    <v-row >
      <v-col  :class="`d-flex justify-center ${$vuetify.breakpoint.mobile && 'align-start'}`" :cols="$vuetify.breakpoint.mobile ? '4' : '3'">
     <img v-if="contact.image && contact.image.url" :src="contact.image.url" :alt="contact.fullName"
      style="width: 100%; object-fit: cover"
      >
      <v-icon dark v-else color="black" size="144px">
        mdi-account
      </v-icon>

      </v-col>
      <v-col class="pl-3" cols="8" sm="9">
        <v-row class="d-flex">
          <v-col class="d-flex" cols="10">
            <h4 :class="$vuetify.breakpoint.mobile ? 'text-h6' : 'text-h4'" style="font-weight: bold">{{ contact.fullName }}</h4>
          </v-col>
          <!--3 dots menu-->
           <v-col class="d-flex justify-end" cols="2" max-width="20px">
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
      <v-list class="menu-bar">
        <v-list-item
        >
        <!--edit button-->
           <v-btn
        text
         @click.prevent="visible = true">
            <span
        > <v-icon >mdi-square-edit-outline</v-icon> Edit</span>
        </v-btn>
        </v-list-item>
        <!--delete button-->
        <v-list-item>
           <v-btn
        text
        @click.prevent="deleteUser(contact.id)"
          >
          <span > <v-icon >mdi-delete-outline</v-icon> Delete</span>
           </v-btn>

        </v-list-item>
      </v-list>
    </v-menu>
          </v-col>
        </v-row>
        <!--user information-->
        <v-row class="d-flex ">
          <v-col class="d-flex align-center"> <v-icon class="mr-2" :size="$vuetify.breakpoint.mobile ? '16px' : ''">mdi-phone-outline</v-icon> <h5 :class="$vuetify.breakpoint.mobile ? 'text-content' : 'text-h5' " v-if="contact.phoneNumber"> {{ contact.phoneNumber }}</h5></v-col>
        </v-row>
            <v-row class="d-flex ">
          <v-col class="d-flex align-center">
            <v-icon class="mr-2" :size="$vuetify.breakpoint.mobile ? '16px' : ''">mdi-email-outline</v-icon>  <h5 :class="$vuetify.breakpoint.mobile ? 'text-content' : 'text-h5' "> {{ contact.email }}</h5>
          </v-col>
        </v-row>
         <v-row class="d-flex">
           <v-col :class="`d-flex justify-space-between ${$vuetify.breakpoint.mobile && `flex-wrap`}`" >
              <span>
          <v-checkbox
            :class="[`checkbox`, $vuetify.breakpoint.name]"
      v-model="contact.isPrimary"
      @change="changePrimary(contact.id, contact.isPrimary)"
      :label="$i18n.t('auth.MainContact')"
    ></v-checkbox>
         </span>
               <span >
          <v-checkbox
            :class="[`checkbox`, $vuetify.breakpoint.name]"
      v-model="contact.isInvoice"
      @change="changeInvoice(contact.id, contact.isInvoice)"
      :label="$i18n.t('auth.MainInvoice')"
    ></v-checkbox>
         </span>
             </v-col>
         </v-row>
      </v-col>
    </v-row>
  </v-card>
</v-hover>

      </template>
    <!--contact form-->
      <v-card >
        <v-card-title v-if="add" class="justify-center" :class="$vuetify.breakpoint.mobile ? 'text-h4' : 'text-h2'" style="color: #4FCCA0; font-weight: 800">
          {{ $i18n.t('auth.Contact')}}
        </v-card-title>
         <v-card-title v-else class="justify-center" :class="$vuetify.breakpoint.mobile ? 'text-h4' : 'text-h2'" style="color: #4FCCA0; font-weight: 800">
          {{ $i18n.t('auth.EditContact')}}
        </v-card-title>
      <v-container class="d-flex justify-center">
     <!--<img class="avatar" :src="require('@/assets/image/PHOTO.svg')" width="25%"  alt="">-->
     <UploadImage v-model="avatar">
       <div slot="activator">
           <img v-if="!avatar" class="avatar" :src="require('@/assets/image/PHOTO.svg')"   alt="">
            <img  v-else-if="avatar.url" :src="avatar.url" alt="avatar"  class="avatar"  >
             <img  v-else :src="avatar.imageURL" alt="avatar" class="avatar" >
        </div>
     </UploadImage>
   </v-container>
        <v-card-text>
          <div class="d-flex justify-center">
             <v-form
    ref="contactForm"
    lazy-validation
    :class="$vuetify.breakpoint.mobile ? 'dialog-form max-width' : 'dialog-form fixed-width'"
  >
    <v-text-field
      v-model="fullName"
      :rules="usernameRules"
      :label="$i18n.t('auth.FLName')"
      required
    ></v-text-field>
  <v-text-field
      v-model="phoneNumber"
        :label="$i18n.t('auth.PhoneNumber')"
    ></v-text-field>
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
    ></v-text-field>
    <v-row class="d-flex">
      <v-col class="d-flex justify-start">
          <v-checkbox
      v-model="isPrimary"
         :label="$i18n.t('auth.MainContact')"
      required
    ></v-checkbox>
      </v-col>
       <v-col  class="d-flex justify-start">
          <v-checkbox
      v-model="isInvoice"
         :label="$i18n.t('auth.MainInvoice')"
      required
    ></v-checkbox>
       </v-col>
    </v-row>
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
    <v-row class="d-flex">
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
          v-if="add === true"
              :class="`base-btn ${$vuetify.breakpoint.name} save`"
            @click="submit"
          >
            {{ $i18n.t('auth.Add')}}
          </v-btn>
           <v-btn
          v-else-if="edit === true || dbclick === true"
            :class="`base-btn ${$vuetify.breakpoint.name} save`"
            @click="update"
          >
            {{ $i18n.t('auth.Save')}}
          </v-btn>
      </v-col>
    </v-row>
  </v-form>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
import UploadImage from '@/components/Tool/UploadImage'

export default {
  name: 'ContactForm',
  props: ['add', 'edit', 'contact', 'dbclick'],
  components: { UploadImage },
  data() {
    return {
      close: true, // close the 3 dots menu after select
      loading: false, // show loading circle
      visible: false, // show the form
      show: false, // show password
      fullName: this.$props.contact ? this.$props.contact.fullName : '',
      email: this.$props.contact ? this.$props.contact.email : '',
      password: '',
      phoneNumber: this.$props.contact ? this.$props.contact.phoneNumber : '',
      isPrimary: this.$props.contact ? this.$props.contact.isPrimary : false,
      isInvoice: this.$props.contact ? this.$props.contact.isInvoice : false,
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
      avatar: this.$props.contact ? this.$props.contact.image : null,
      saving: false, // upload the image
      error: ''
    }
  },
  watch: {
    avatar: {
      handler: function() {
        this.saving = false
      },
      deep: true
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
      return this.$store.state.auth.user
    }
  },
  methods: {
    uploadImage(id) {
      this.saving = true
      // console.log(this.avatar.imageFile)
      const formdata = new FormData() // create the data form
      formdata.append('files', this.avatar.imageFile)
      formdata.append('ref', 'user')
      formdata.append('refId', id)
      formdata.append('field', 'image')
      formdata.append('source', 'users-permissions')
      this.$store.dispatch('upload/upload', formdata) // upload the image
        .then(() => {
          if (this.$props.add === true) { // if create new user
            this.$store.dispatch('company/getCompany', this.company.id) // reload the company and contacts list
              .then(() => {
                this.$refs.contactForm.reset()
                this.error = ''
                this.loading = false
                this.visible = false
                this.avatar = null
              })
          } else if (this.$props.edit === true || this.$props.dbclick === true) { // update user
            this.hanldeUpdate()
          }
        })
    },
    submit() {
      if (this.$refs.contactForm.validate()) {
        this.loading = true
        const user = { // contact form data
          username: this.email.substring(0, this.email.indexOf('@')),
          fullName: this.fullName,
          phoneNumber: this.phoneNumber,
          password: this.password,
          email: this.email,
          isPrimary: this.isPrimary,
          isInvoice: this.isInvoice,
          role: { id: 4 },
          company: this.company.id
        }
        this.$store.dispatch('user/createUser', user) // create the contact
          .then(res => {
            if (this.avatar) { // if add avatar
              this.uploadImage(res.data.id) // upload avatar
            } else {
              this.$store.dispatch('company/getCompany', this.company.id) // reload the company infor and contacts list
                .then(() => {
                  this.$refs.contactForm.reset() // reset the form
                  this.error = ''
                  this.loading = false
                  this.visible = false
                })
            }
          })
          .catch(err => {
            this.error = err
            this.loading = false
          })
      }
    },
    update() { // update contact
      if (this.$refs.contactForm.validate()) {
        this.loading = true
        if (this.avatar !== null && this.avatar.imageFile) { // if change the avatar
          this.uploadImage(this.$props.contact.id)
        } else {
          this.hanldeUpdate()
        }
      }
    },
    hanldeUpdate() {
      const updatedUser = {
        id: this.$props.contact.id,
        fullName: this.fullName,
        phoneNumber: this.phoneNumber,
        password: this.password,
        email: this.email,
        isPrimary: this.isPrimary,
        isInvoice: this.isInvoice
      }
      this.$store.dispatch('user/updateProfile', updatedUser) // update the contact
        .then(() => {
          this.$store.dispatch('company/getCompany', this.company.id) // reload the page
          this.loading = false
          this.avatar = null
          this.visible = false
        })
        .catch(err => {
          this.error = err
          this.loading = false
        })
    },
    cancel() { // close the form and reset all to default
      this.$refs.contactForm.reset()
      this.avatar = null
      this.visible = false
    },
    deleteUser(id) { // delete contact
      this.$store.dispatch('user/deleteUser', id)
        .then(() => {
          this.$store.dispatch('company/getCompany', this.company.id)
        })
    },
    changePrimary(id, key) { // change the primary contact by checking
      const dataForm = { id: id, isPrimary: key }
      this.$store.dispatch('user/updateProfile', dataForm)
    },
    changeInvoice(id, key) {
      const dataForm = { id: id, isInvoice: key } // change the invoice by checking
      this.$store.dispatch('user/updateProfile', dataForm)
    }
  }
}
</script>

<style scoped>
.hover:hover {
  background-color: rgba(90, 232, 170, 0.45);
}
</style>
