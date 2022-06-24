<template>
<!--<v-card class="foodtruck-item" :class="$vuetify.breakpoint.mobile ? 'pa-2' : 'pa-4' || {'on-hover' : 'hover'}"  style="border-radius: 8px" :height="$vuetify.breakpoint.mobile ? '220px' : '360px'"
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
            <FoodtruckForm :edit="true" :add="false" :editfoodtruck="foodtruck"/>
        </v-list-item>
        <v-list-item>
              <v-btn
        text
        @click.prevent="deleteFoodtruck(foodtruck.id)"
          >
          <span > <v-icon >mdi-delete-outline</v-icon> Delete</span>
           </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <div class="d-flex justify-center">
       <img v-if="foodtruck.image" :class="$vuetify.breakpoint.mobile ? 'foodtruck-img-res' : 'foodtruck-img'" :src="foodtruck.image.url" :alt="foodtruck.name">
    </div>
    <div>
       <h4 class="foodtruck-title" :class="$vuetify.breakpoint.mobile ? 'text-h6' : 'text-h4'"> {{ foodtruck.carModel }}</h4>
          <p class="text-content">{{ foodtruck.carID }}</p>
    </div>
        </v-card>-->

        <!--move the above item card to the FoodtruckForm for double click to edit-->
         <FoodtruckForm :dbclick="true" :editfoodtruck="foodtruck"/>
</template>

<script>
import FoodtruckForm from '@/components/Foodtruck/FoodtruckForm'
export default {
  name: 'Foodtruck',
  props: ['foodtruck'],
  components: { FoodtruckForm },
  data() {
    return {
      close: true
    }
  }
}
</script>

<style>

</style>
