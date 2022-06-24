<template>
 <!--<v-card  class="px-4 mb-4 mt-2" :class="$vuetify.breakpoint.mobile ? 'menu-item-res' :'menu-item '">
          <v-row class="d-flex">
            <v-col class="d-flex justify-center pa-1 align-center" cols="2">
              <img class="item-img" v-if="menuItem.image" :src="menuItem.image.url" alt="">
            </v-col>
            <v-col cols="10" :class="$vuetify.breakpoint.mobile ? 'pr-0' :'pr-4'">
               <v-menu offset-y bottom left :close-on-content-click="close" >
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
            <MenuItemForm :add="false" :edit="true" :item="menuItem" :group="menuItem.menu_item_group"/>
        </v-list-item>
        <v-list-item>
           <v-btn
        text
        @click.prevent="deleteItem(menuItem.id)"
          >
          <span > <v-icon >mdi-delete-outline</v-icon> Delete</span>
           </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
                 <template v-for="(spe, i) in menuItem.special_diets" >
                 <img class="item-spe" v-if="spe.name === 'Vegan'" :src="require('@/assets/image/menu/Vegetarien.svg')" :alt="spe.name" :key='i'>
                  <img class="item-spe" v-else-if="spe.name === 'Gluten-free'" :src="require('@/assets/image/menu/Sans Gluten.svg')" :alt="spe.name" :key='i'>
       </template>
              <v-row class="d-flex">
                <v-col class="d-flex" :cols="8">
                  <h4 class="item-title" :class="$vuetify.breakpoint.mobile ? 'text-h6' :'text-h4'">{{menuItem.name}}</h4>
                </v-col>
                <v-col class="d-flex justify-end" >
                  <h4 :class="$vuetify.breakpoint.mobile ? 'text-h6' :'text-h4'">{{menuItem.cost.toFixed(2)}} EUR</h4>
                </v-col>
              </v-row>
              <p class="menu-des">{{menuItem.desc}}</p>
            </v-col>

          </v-row>
        </v-card>-->

    <!--move the above care to the MenuItemForm for doublclick to edit-->
             <MenuItemForm :dbclick="true" :item="menuItem"  :group="menuItem.menu_item_group"/>

</template>

<script>
import MenuItemForm from '@/components/Menu/MenuItemForm'
export default {
  name: 'MenuItem',
  components: { MenuItemForm },
  props: ['item'],
  data() {
    return {
      close: true,
      menuItem: this.$props.item
    }
  },
  computed: {
    isUpdate() {
      return this.$store.getters['menuItem/isUpdated']
    }
  },
  watch: {
    isUpdate(val) {
      if (val === true) {
        this.getMenuItem()
      }
    }
  },
  mounted() {
    this.getMenuItem()
  },
  methods: {
    getMenuItem() {
      this.$store.dispatch('menuItem/getMenuItem', this.menuItem.id)
        .then(res => {
          this.menuItem = res.data
          this.$store.commit('menuItem/update', false)
        })
        .catch(er => {
          return er
        })
    }
  }
}
</script>
