<template>
   <v-dialog
      v-model="visible"
      :width="$vuetify.breakpoint.mobile ? '100%' : '55%'"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-hover v-if="add === true">
         <v-card class="hover" v-bind="attrs" v-on="on" :class="$vuetify.breakpoint.mobile ? 'pa-2' : 'pa-4' || {'on-hover' : 'hover'}"  style="border-radius: 8px" :height="$vuetify.breakpoint.mobile ? '220px' : '370px'" >
           <div class="d-flex justify-center">
               <!--<img :class="$vuetify.breakpoint.mobile ? 'custom-img-res' : 'custom-img'" :src="require('@/assets/image/menu/custom.png')" >-->

              <v-card class="d-flex justify-center align-center" :class="$vuetify.breakpoint.mobile ? 'custom-res' : 'custom' " >
                <v-icon class="primary-color" :size="$vuetify.breakpoint.mobile ? '44px' : '100px'">mdi-plus</v-icon>
              </v-card>
           </div>
           <div class="d-flex">
                <h4 :class="$vuetify.breakpoint.mobile ? 'text-h6 mt-3' : 'text-h4 mt-3'">  {{ $i18n.t("auth.AddFoodtruck")}}</h4>
           </div>
        </v-card>
</v-hover>
<v-btn
 v-else-if="edit === true"
 text
           v-bind="attrs"
          v-on="on">
          <span

        > <v-icon >mdi-square-edit-outline</v-icon> Edit</span></v-btn>

<!--foodtruck item-->
<v-hover class="hover" v-else-if="dbclick === true">
  <v-card  class="foodtruck-item" :class="$vuetify.breakpoint.mobile ? 'pa-2' : 'pa-4' || {'on-hover' : 'hover'}"  style="border-radius: 8px" :height="$vuetify.breakpoint.mobile ? '220px' : '370px'" v-on:dblclick.prevent="visible = true"
>
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
                          color="white"
                         :size="$vuetify.breakpoint.mobile ? '16px' : ''">mdi-dots-vertical</v-icon>
                      </v-btn>
      </template>
      <v-list class="menu-bar">
        <v-list-item>
          <v-btn
 text
         @click.prevent="visible = true">
          <span

        > <v-icon >mdi-square-edit-outline</v-icon> Edit</span></v-btn>
        </v-list-item>
        <v-list-item>
              <v-btn
        text
        @click.prevent="deleteFoodtruck(editfoodtruck.id)"
          >
          <span > <v-icon >mdi-delete-outline</v-icon> Delete</span>
           </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <div class="d-flex justify-center">
       <img v-if="editfoodtruck.image" :class="$vuetify.breakpoint.mobile ? 'foodtruck-img-res' : 'foodtruck-img'" :src="editfoodtruck.image.url" :alt="editfoodtruck.name">
    </div>
    <div>
       <h4 class="foodtruck-title mt-3" :class="$vuetify.breakpoint.mobile ? 'text-h6' : 'text-h4'"> {{ editfoodtruck.carModel }}</h4>
          <p class="text-content">{{ editfoodtruck.carID }}</p>
    </div>
        </v-card>
</v-hover>

      </template>

      <v-card >
        <v-card-title v-if="add" class="justify-center" :class="$vuetify.breakpoint.mobile ? 'text-h4' : 'text-h2'" style="color: #4FCCA0; font-weight: 800">
          {{ $i18n.t('foodtruck.Foodtruck')}}
        </v-card-title>
         <v-card-title v-else class="justify-center" :class="$vuetify.breakpoint.mobile ? 'text-h4' : 'text-h2'" style="color: #4FCCA0; font-weight: 800">
          {{ $i18n.t('foodtruck.EditFoodtruck')}}
        </v-card-title>
      <v-container class="d-flex justify-center">
     <UploadImage v-model="image">
       <div slot="activator">
           <img v-if="!image" class="img-upload" :src="require('@/assets/image/foodtruck/foodtruck-01 1.png')"   alt="">
            <img  v-else-if="image.url" :src="image.url" alt="image"   class="img-upload" >
             <img  v-else :src="image.imageURL" alt="image"  class="img-upload" >
        </div>
     </UploadImage>
  </v-container>
   <v-card-text>
  <div class="d-flex justify-center">
    <v-form
    ref="foodtruckForm"
    lazy-validation
       :class="$vuetify.breakpoint.mobile ? 'dialog-form max-width' : 'dialog-form fixed-width'"
  >
    <v-text-field
      v-model="carModel"
      :rules="carModelRules"
      :label="$i18n.t('foodtruck.carModel')"
      required
    ></v-text-field>
     <v-text-field
      v-model="carID"
      :rules="carIDRules"
      :label="$i18n.t('foodtruck.carID')"
      required
    ></v-text-field>
    <v-row class="d-flex justify-space-between" :style="$vuetify.breakpoint.mobile ? '' : 'width: 80%'">
      <v-col >
          <v-text-field
       :rules="carLengthRules"
      v-model.number="carLength"
      :label="$i18n.t('foodtruck.length')"
      required
    ></v-text-field>
      </v-col>
        <v-col >
           <v-text-field
     :rules="widthRules"
     v-model.number="width"
      :label="$i18n.t('foodtruck.width')"
      required
    ></v-text-field>
        </v-col>
          <v-col >
              <v-text-field
      v-model.number="height"
       :rules="heightRules"
      :label="$i18n.t('foodtruck.height')"
      required
    ></v-text-field>
          </v-col>
    </v-row>
    <v-select
      v-model="amperage"
      :items="amperageList"
      :label="$i18n.t('foodtruck.amperage')"
      required
      :style="$vuetify.breakpoint.mobile ? 'width: 50%' : 'width: 40%'"
    ></v-select>
    <v-textarea
        solo
        rows="3"
          :label="$i18n.t('foodtruck.other')"
          v-model="other"
        ></v-textarea>
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
  name: 'FoodtruckForm',
  props: ['add', 'edit', 'editfoodtruck', 'dbclick'],
  components: { UploadImage },
  data() {
    return {
      close: true, // close the 3 dots menu after selecting
      visible: false, // display the form
      loading: false, // show progress cicle
      carModel: this.$props.editfoodtruck ? this.$props.editfoodtruck.carModel : '',
      carID: this.$props.editfoodtruck ? this.editfoodtruck.carID : '',
      image: this.$props.editfoodtruck ? this.editfoodtruck.image : null,
      carLength: this.$props.editfoodtruck ? this.editfoodtruck.carLength : '',
      width: this.$props.editfoodtruck ? this.editfoodtruck.width : '',
      height: this.$props.editfoodtruck ? this.editfoodtruck.height : '',
      amperage: this.$props.editfoodtruck ? this.editfoodtruck.amperage : '',
      other: this.$props.editfoodtruck ? this.editfoodtruck.other : '',
      carModelRules: [
        v => !!v || 'Car model is required'
      ],
      carIDRules: [
        v => !!v || 'Car ID is required'
      ],
      carLengthRules: [
        v => !!v || 'Car length is required',
        v => !isNaN(parseFloat(v)) || 'Please input integer number'
      ],
      widthRules: [
        v => !!v || 'Car width is required',
        v => !isNaN(parseFloat(v)) || 'Please input integer number'
      ],
      heightRules: [
        v => !!v || 'Car height is required',
        v => !isNaN(parseFloat(v)) || 'Please input integer number'
      ],
      amperageList: [
        '10A', '13A', '16A', '32A'
      ],
      error: ''
    }
  },
  computed: {
    company() {
      return this.$store.state.company.company
    },
    foodtruck() {
      return this.$store.state.foodtruck.foodtruck
    }
  },
  methods: {
    submit() { // create new foodtruck
      if (this.$refs.foodtruckForm.validate()) {
        this.loading = true
        const foodtruckForm = { carModel: this.carModel, carID: this.carID, carLength: this.carLength, width: this.width, height: this.height, amperage: this.amperage, company: this.company, other: this.other }
        this.$store.dispatch('foodtruck/createFoodtruck', foodtruckForm) // handle create foodtruck
          .then(res => {
            if (this.image) { // if add image for foodtruck
              this.uploadImage(res.data.id) // handle upload image
            } else {
              this.$store.dispatch('company/getCompany', this.company.id) // reload the list
                .then(() => {
                  this.$refs.foodtruckForm.reset() // reset the form
                  this.loading = false
                  this.visible = false
                })
            }
          })
          .catch(err => {
            this.loading = false
            console.log(err)
            this.error = 'please input integer number'
          })
      }
    },
    cancel() { // reset the form when close the form
      this.$refs.foodtruckForm.reset()
      this.image = null
      this.visible = false
    },
    uploadImage(id) {
      this.saving = true
      // console.log(this.avatar.imageFile)
      const formdata = new FormData()
      formdata.append('files', this.image.imageFile)
      formdata.append('ref', 'foodtrucks')
      formdata.append('refId', id)
      formdata.append('field', 'image')
      this.$store.dispatch('upload/upload', formdata)
        .then(() => {
          if (this.$props.add === true) {
            this.$store.dispatch('foodtruck/getFoodtruck', id) // reload the foodtruck after uploading image
              .then(() => {
                this.$store.dispatch('company/getCompany', this.company.id)// reload the list
                  .then(() => {
                    this.$refs.foodtruckForm.reset()
                    this.image = null
                    this.loading = false
                    this.visible = false
                  })
              })
          } else if (this.$props.edit === true || this.$props.dbclick === true) {
            const updateFoodtruck = {
              id: this.$props.editfoodtruck.id,
              carModel: this.carModel,
              carID: this.carID,
              carLength: this.carLength,
              width: this.width,
              height: this.height,
              amperage: this.amperage,
              other: this.other
            }
            this.$store.dispatch('foodtruck/updateFoodtruck', updateFoodtruck) // handle update foodtruck
              .then(() => {
                this.$store.dispatch('company/getCompany', this.company.id) // reload
                this.image = null
                this.loading = false
                this.visible = false
              })
          }
        })
        .catch(err => {
          this.loading = false
          this.error = err
        })
    },
    update() { // handle update the foodtruck
      if (this.$refs.foodtruckForm.validate()) {
        this.loading = true
        if (this.image !== null && this.image.imageFile) { // if update image
          this.uploadImage(this.$props.editfoodtruck.id)
        } else { // not change image
          const foodtruckForm = {
            id: this.$props.editfoodtruck.id,
            carModel: this.carModel,
            carID: this.carID,
            carLength: this.carLength,
            width: this.width,
            height: this.height,
            amperage: this.amperage,
            other: this.other
          }
          this.$store.dispatch('foodtruck/updateFoodtruck', foodtruckForm) // handle the update request
            .then(() => {
              this.$store.dispatch('company/getCompany', this.company.id) // reload
                .then(() => {
                  this.loading = false
                  this.visible = false
                })
            })
            .catch(err => {
              this.loading = false
              this.error = err
            })
        }
      }
    },
    deleteFoodtruck(id) { // delete foodtruck by id
      this.$store.dispatch('foodtruck/deleteFoodtruck', id)
        .then(() => {
          this.$store.dispatch('company/getCompany', this.$store.state.company.company.id)
        })
    }
  }
}
</script>

<style scoped>
.hover:hover {
  background-color: rgba(90, 232, 170, 0.45);
 }

</style>
