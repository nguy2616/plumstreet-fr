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
           <div class="d-flex mt-2">
                <h4 :class="$vuetify.breakpoint.mobile ? 'text-h6' : 'text-h4'">  {{ $i18n.t("auth.AddMenu")}}</h4>
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

      </template>

      <v-card >
        <v-card-title v-if="add" class="justify-center" :class="$vuetify.breakpoint.mobile ? 'text-h4' : 'text-h2'" style="color: #4FCCA0; font-weight: 800">
          {{ $i18n.t('menu.Menu')}}
        </v-card-title>
         <v-card-title v-else class="justify-center" :class="$vuetify.breakpoint.mobile ? 'text-h4' : 'text-h2'" style="color: #4FCCA0; font-weight: 800">
          {{ $i18n.t('menu.EditMenu')}}
        </v-card-title>
      <div class="d-flex justify-center">
     <UploadImage v-model="image">
       <div slot="activator">
           <img v-if="!image" class="img-upload" :src="require('@/assets/image/menu/Group 3.png')"   alt="">
            <img  v-else-if="image.url" :src="image.url" alt="image" class="img-upload" >
             <img  v-else :src="image.imageURL" alt="image" class="img-upload" >
        </div>
     </UploadImage>
  </div>
        <v-card-text>
          <div class="d-flex justify-center">
             <v-form
    ref="menuForm"
    lazy-validation
    :class="$vuetify.breakpoint.mobile ? 'dialog-form max-width' : 'dialog-form fixed-width'"
  >
    <v-text-field
      v-model="menuName"
      :rules="menuNameRules"
      :label="$i18n.t('menu.MenuName')"
      required
    ></v-text-field>
  <v-textarea
        solo
        rows="3"
          :label="$i18n.t('menu.Description')"
          v-model="des"
        ></v-textarea>
    <v-row class="d-flex" justify="center" align="center">
      <v-col class="menu-form d-flex justify-center " cols="6" v-for="(item, i) in speDiets" :key="i">
        <v-checkbox
          @change="selectSpecialdiet(item)"
          v-model="item.isCheck"
          :label="item.name"
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
          v-if="add === true"
           :class="`base-btn ${$vuetify.breakpoint.name} save`"
            @click="submit"
          >
            {{ $i18n.t('auth.Add')}}
          </v-btn>
           <v-btn
          v-else-if="edit === true"
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
import * as func from '@/utils/function.js'
export default {
  name: 'MenuForm',
  props: ['add', 'edit', 'editmenu'],
  components: { UploadImage },
  data() {
    return {
      visible: false,
      loading: false,
      menuName: this.$props.edit ? this.editmenu.name : '',
      des: this.$props.edit ? this.editmenu.description : '',
      image: this.$props.edit ? this.editmenu.image : null,
      speDiets: [], // speDiets list
      selectted: [], // selected special diets list
      menuNameRules: [
        v => !!v || 'Menu name is required'
      ],
      error: ''
    }
  },
  computed: {
    company() {
      return this.$store.state.company.company
    },
    menu() {
      return this.$store.state.menu.menu
    }
  },
  created() {
    this.getSpecialDiets()
  },
  methods: {
    submit() {
      if (this.$refs.menuForm.validate()) {
        this.loading = true
        const menuForm = { name: this.menuName, description: this.des, special_diets: this.selectted, company: this.company }
        this.$store.dispatch('menu/createMenu', menuForm) // handle create new menu
          .then(res => {
            if (this.image) {
              this.uploadImage(res.data.id) // upload image
            } else {
              this.$store.dispatch('company/getCompany', this.company.id) // reload the company info
                .then(() => {
                  this.$refs.menuForm.reset() // reset the form
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
    cancel() {
      this.$refs.menuForm.reset() // reset the form
      this.image = null
      this.visible = false
    },
    selectSpecialdiet(item) {
      if (this.$props.add) {
        if (item.isCheck) {
          this.selectted.push(item) // add selected special diet
        } else {
          this.selectted = this.selectted.filter(cui => cui.id !== item.id) // remove form the list
        }
      }
    },
    uploadImage(id) {
      this.saving = true
      // console.log(this.avatar.imageFile)
      const formdata = new FormData()
      formdata.append('files', this.image.imageFile)
      formdata.append('ref', 'menus')
      formdata.append('refId', id)
      formdata.append('field', 'image')
      this.$store.dispatch('upload/upload', formdata)
        .then(() => {
          if (this.$props.add === true) { // if add new menu
            this.$store.dispatch('menu/getMenu', id)
              .then(() => {
                this.$store.dispatch('company/getCompany', this.company.id) // reload the company
                  .then(() => {
                    this.$refs.menuForm.reset() // reset the form
                    this.image = null
                    this.loading = false
                    this.visible = false
                  })
              })
          } else if (this.$props.edit === true) { // edit menu
            this.handleUpdate()
          }
        })
        .catch(err => {
          this.error = err
          this.loading = false
        })
    },
    update() { // update menu
      if (this.$refs.menuForm.validate()) {
        this.loading = true
        if (this.image !== null && this.image.imageFile) {
          this.uploadImage(this.$props.editmenu.id) // update menu
        } else {
          this.handleUpdate()
        }
      }
    },
    handleUpdate() {
      const menuForm = {
        id: this.$props.editmenu.id,
        name: this.menuName,
        description: this.des,
        special_diets: this.selectted
      }
      this.$store.dispatch('menu/updateMenu', menuForm)
        .then(() => {
          this.$store.dispatch('company/getCompany', this.company.id)
            .then(() => {
              this.loading = false
              this.visible = false
            })
        })
        .catch(err => {
          this.error = err
          this.loading = false
        })
    },
    getSpecialDiets() {
      this.$store.dispatch('specialdiets/getSpecialdiets', '?_sort=name:asc') // get special diets list
        .then(res => {
          this.speDiets = res.data
          this.speDiets.forEach(e => {
            e.isCheck = false // uncheck default
          })
          if (this.$props.editmenu) {
            this.$store.dispatch('menu/getMenu', this.$props.editmenu.id)
              .then(res => {
                this.selectted = res.data.special_diets
                this.speDiets.forEach(e => {
                  func.checkIncluded(e, res.data.special_diets) // check if the special diet is selected
                })
              })
          }
        })
    }
  }
}
</script>

<style scoped>
.hover:hover {
  background-color: rgba(90, 232, 170, 0.45);
 }
.custom-img {
  width: 100%;
  object-fit: contain;
  height: 244px;
}
.custom-img-res {
  width: 100%;
  object-fit: contain;
  height: 140px;
}

</style>
