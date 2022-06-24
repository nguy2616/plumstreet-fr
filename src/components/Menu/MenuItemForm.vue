<template>
  <v-dialog
      v-model="visible"
      :width="$vuetify.breakpoint.mobile ? '100%' : '55%'"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="add === true"  v-bind="attrs" v-on="on" class="base-btn add text-none my-5" block>
          <v-icon large> mdi-plus </v-icon>
          <h4 v-if="group.name === 'STARTERS'">{{ $i18n.t('menu.AddItemStarter') }}</h4>
             <h4 v-else-if="group.name === 'MAIN DISHES'">{{ $i18n.t('menu.AddItemMain') }}</h4>
                <h4 v-else-if="group.name === 'DRINKS'">{{ $i18n.t('menu.AddItemDrink') }}</h4>
                   <h4 v-else-if="group.name === 'DESSERTS'">{{ $i18n.t('menu.AddItemDessert') }}</h4>
        </v-btn>
        <v-btn
        text   v-else-if="edit === true"
           v-bind="attrs"
          v-on="on"
          >
            <span
        > <v-icon >mdi-square-edit-outline</v-icon> Edit</span>
</v-btn>
<!--menu item-->
       <v-hover class="hover" v-else-if="dbclick === true" >
<v-card v-bind="attrs"
          v-on:dblclick="visible = true"
 class="px-4 mb-4 mt-2" :class="$vuetify.breakpoint.mobile ? 'menu-item-res' :'menu-item '">
    <v-row class="d-flex">
            <v-col class="d-flex justify-center pa-1 align-center" :cols="$vuetify.breakpoint.mobile ? '3' : '2'">
              <img class="item-img" v-if="item.image" :src="item.image.url" alt="">
            </v-col>
             <v-col :class="$vuetify.breakpoint.mobile ? 'pr-0' :'pr-4'">
   <!--3 dots menu-->
   <v-menu offset-y bottom left :close-on-content-click="close" v-if="user.role.id !== 5">
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
                         color="white" :size="$vuetify.breakpoint.mobile ? '16px' : ''">mdi-dots-vertical</v-icon>
                      </v-btn>
      </template>
      <v-list class="menu-bar">
        <v-list-item>
                <v-btn
        text
          @click.prevent="visible = true"
          >
            <span
        > <v-icon >mdi-square-edit-outline</v-icon> Edit</span>
</v-btn>
        </v-list-item>
        <v-list-item>
           <v-btn
        text
        @click.prevent="deleteItem(item.id)"
          >
          <span > <v-icon >mdi-delete-outline</v-icon> Delete</span>
           </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <template v-for="(spe, i) in item.special_diets">
      <img
        class="item-spe mr-2"
        :src="require(`@/assets/image/${specialDietsConst[sanitizeString(spe.name).toUpperCase()].imagePath}`)"
        :alt="spe.name"
        :key="i"
      />
    </template>
              <v-row class="d-flex">
                <v-col class="d-flex" :cols="8">
                  <h4 class="item-title" :class="$vuetify.breakpoint.mobile ? 'text-h6' :'text-h4'">{{item.name}}</h4>
                </v-col>
                <v-col class="d-flex justify-end" >
                  <h4 :class="$vuetify.breakpoint.mobile ? 'text-h6' :'text-h4'">{{item.cost.toFixed(2)}} EUR</h4>
                </v-col>
              </v-row>
              <p class="menu-des">{{item.desc}}</p>
            </v-col>
          </v-row>
</v-card>
        </v-hover>
      </template>

      <v-card>
        <v-card-title v-if="$props.add" class="justify-center" :class="$vuetify.breakpoint.mobile ? 'text-h4' : 'text-h2'" style="color: #4FCCA0; font-weight: 800">
          {{ $i18n.t('menu.MenuItem')}}
        </v-card-title>
         <v-card-title v-else-if="$props.edit || $props.dbclick" class="justify-center" :class="$vuetify.breakpoint.mobile ? 'text-h4' : 'text-h2'" style="color: #4FCCA0; font-weight: 800">
          {{ $i18n.t('menu.EditMenuItem')}}
        </v-card-title>
      <v-container class="d-flex justify-center">
     <UploadImage v-model="image">
       <div slot="activator">
           <img v-if="!image"  class="avatar" :src="require('@/assets/image/menu/uploaditem.png')"   alt="">
            <img  v-else-if="image.url" :src="image.url"  class="avatar" >
             <img  v-else :src="image.imageURL"   class="avatar"  >
        </div>
     </UploadImage>
  </v-container>
        <v-card-text>
          <div class="d-flex justify-center">
            <v-form
    ref="menuItemForm"
    lazy-validation
     :class="$vuetify.breakpoint.mobile ? 'dialog-form max-width' : 'dialog-form fixed-width'"
  >
    <v-text-field
      v-model="name"
      :rules="nameRules"
      :label="$i18n.t('menu.ItemName')"
      required
    ></v-text-field>
  <v-textarea
        solo
        rows="2"
          :label="$i18n.t('menu.Description')"
          v-model="desc"
        ></v-textarea>
    <v-row class="d-flex">
      <v-col class="menu-form d-flex" cols="6" v-for="(item, i) in speDiets" :key="i">
       <v-checkbox
          @change="selectSpecialdiet(item)"
          v-model="item.isCheck"
         :label="item.name"
    ></v-checkbox>
     </v-col>
    </v-row>
      <v-text-field
      v-model="cost"
      :label="$i18n.t('menu.Price')"
      required
    ></v-text-field>
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
    <v-row class="d-flex"  >
      <v-col class="d-flex justify-end" >
        <v-btn
            :class="`base-btn ${$vuetify.breakpoint.name} discard-form`"
            @click.prevent="cancel"
          >
            {{ $i18n.t('auth.Cancel')}}
          </v-btn>
      </v-col>
       <v-col class="d-flex justify-start">
          <v-btn
            v-if="add === true"
 :class="`base-btn ${$vuetify.breakpoint.name} save`"
            @click.prevent="submit"
          >
            {{ $i18n.t('auth.Add')}}
          </v-btn>
           <v-btn
          v-else-if="edit === true || dbclick === true"
            :class="`base-btn ${$vuetify.breakpoint.name} save`"
            @click.prevent="update"
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
import { sanitizeString } from '@/utils/helpers/sanitize'
const specialDietsConst = {
  VEGAN: {
    imagePath: 'menu/Vegetarien.svg'
  },
  GLUTENFREE: {
    imagePath: 'menu/Sans Gluten.svg'
  }
}
const mixins = {
  methods: {
    sanitizeString
  }
}
export default {
  name: 'MenuItemForm',
  mixins: [mixins],
  props: ['add', 'edit', 'item', 'group', 'dbclick'],
  components: { UploadImage },
  data() {
    return {
      close: true,
      loading: false,
      visible: false,
      show: false,
      name: this.$props.item ? this.$props.item.name : '',
      desc: this.$props.item ? this.$props.item.desc : '',
      cost: this.$props.item ? this.$props.item.cost : '',
      speDiets: [],
      selectted: [],
      nameRules: [
        v => !!v || 'Name is required'
      ],
      image: this.$props.item ? this.$props.item.image : null,
      error: '',
      specialDietsConst
    }
  },
  computed: {
    menu() {
      return this.$store.state.menu.menu
    },
    menItem() {
      return this.$store.state.menuItem.menuItem
    },
    company() {
      return this.$store.state.company.company
    },
    user() {
      return this.$store.state.auth.user
    }
  },
  created() {
    this.getSpecialDiets()
  },
  methods: {
    uploadImage(id) {
      this.saving = true
      const formdata = new FormData()
      formdata.append('files', this.image.imageFile)
      formdata.append('ref', 'menu-items')
      formdata.append('refId', id)
      formdata.append('field', 'image')
      this.$store.dispatch('upload/upload', formdata)
        .then(() => {
          if (this.$props.add === true) { // if adding new item
            this.$store.dispatch('menu/getMenu', this.menu.id) // reload
              .then(() => {
                this.$refs.menuItemForm.reset()
                this.loading = false
                this.image = null
                this.visible = false
              })
          } else if (this.$props.edit === true || this.$props.dbclick === true) {
            this.hanldeUpdate() // update the item after update image
          }
        })
        .catch(err => {
          this.error = err
          this.loading = false
        })
    },
    submit() {
      if (this.$refs.menuItemForm.validate()) {
        this.loading = true
        const itemForm = { name: this.name, desc: this.desc, cost: this.cost, special_diets: this.selectted, menu_item_group: this.$props.group, menu: this.menu.id }
        this.$store.dispatch('menuItem/createMenuItem', itemForm) // handle create item
          .then(res => {
            if (this.image) { // add new image
              this.uploadImage(res.data.id)
            } else {
              this.$store.dispatch('menu/getMenu', this.menu.id) // reload the menu
                .then(() => {
                  this.$refs.menuItemForm.reset()
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
    update() { // update the item
      if (this.$refs.menuItemForm.validate()) {
        this.loading = true
        if (this.image !== null && this.image.imageFile) { // update the image and item
          this.uploadImage(this.$props.item.id)
        } else {
          this.hanldeUpdate() // update the item without image
        }
      }
    },
    hanldeUpdate() { // handle update the item
      const itemForm = { id: this.$props.item.id, name: this.name, desc: this.desc, cost: this.cost, special_diets: this.selectted }
      this.$store.dispatch('menuItem/updateMenuItem', itemForm)
        .then(() => {
          this.$store.dispatch('menu/getMenu', this.menu.id)
            .then(() => {
              this.$store.commit('menuItem/update', true)
              this.image = null
              this.loading = false
              this.visible = false
            })
        })
        .catch(err => {
          this.error = err
          this.loading = false
        })
    },
    cancel() { // reset all the form to default
      this.$refs.menuItemForm.reset()
      this.image = null
      this.visible = false
    },
    selectSpecialdiet(item) {
      if (item.isCheck) {
        this.selectted.push(item) // add selected diet
      } else {
        this.selectted = this.selectted.filter(cui => cui.id !== item.id) // remove
      }
    },
    getSpecialDiets() { // get the special diet lists
      this.$store.dispatch('specialdiets/getSpecialdiets', '?_sort=name:asc')
        .then(res => {
          this.speDiets = res.data
          this.speDiets.forEach(e => { // uncheck default
            e.isCheck = false
          })
          if (this.$props.item) { // check if the item included the special item
            this.selectted = this.$props.item.special_diets
            this.speDiets.forEach(e => {
              func.checkIncluded(e, this.$props.item.special_diets)
            })
          }
        })
    },
    deleteItem(id) { // delete the item
      this.$store.dispatch('menuItem/deleteMenuItem', id)
        .then(() => {
          this.$store.dispatch('menu/getMenu', this.$store.state.menu.menu.id)
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
