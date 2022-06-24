<template>
<v-container class="foodtrucks  admin-bg d-flex justify-center" >
   <div  :class="$vuetify.breakpoint.mobile || admin ? 'max-width ' : 'fixed-width'">
    <h4 class="text-h4 mb-4">{{ $i18n.t('auth.Menu3')}}</h4>
    <div class="d-flex justify-center">
       <v-row class="dflex">
      <v-col :cols="$vuetify.breakpoint.mobile ? '6' : '6'" v-for="(item, i) in company.foodtrucks" :key="i" >
        <v-hover >
           <Foodtruck :foodtruck="item"/>
        </v-hover>
      </v-col>
      <v-col  class="menu-item"  :cols="$vuetify.breakpoint.mobile ? '6' : '6'">
          <FoodtruckForm :add="true" />
      </v-col>
    </v-row>
    </div>
  </div>
</v-container>
</template>

<script>
import Foodtruck from '@/components/Foodtruck/Foodtruck'
import FoodtruckForm from '@/components/Foodtruck/FoodtruckForm'
export default {
  name: 'Foodtrucks',
  components: { FoodtruckForm, Foodtruck },
  data() {
    return {
      foodtrucks: []
    }
  },
  computed: {
    company() {
      return this.$store.state.company.company
    },
    admin() {
      return this.$store.state.auth.admin
    }
  },
  methods: {
  }
}
</script>
<style scoped>
.v-card:hover {
  background-color: rgba(90, 232, 170, 0.45);
 }
</style>
