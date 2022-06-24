<template>
<v-container class="menus  d-flex justify-center" v-if="company">
  <div  :class="$vuetify.breakpoint.mobile || admin ? 'max-width ' : 'fixed-width'">
    <h4 class="text-h4 mb-4">Menus</h4>
    <div class="d-flex justify-center">
       <v-row class="dflex">
      <v-col :cols="$vuetify.breakpoint.mobile ? '6' : '4'" v-for="(item, i) in company.menus" :key="i" >
        <v-hover >
           <Menu :menu="item"/>
        </v-hover>
      </v-col>
      <v-col  class="menu-item"  :cols="$vuetify.breakpoint.mobile ? '6' : '4'">
          <MenuForm :add="true" :edit="false"/>
      </v-col>
    </v-row>
    </div>
  </div>
</v-container>

</template>

<script>
import Menu from '@/components/Menu/Menu'
import MenuForm from '@/components/Menu/MenuForm'
export default {
  name: 'Menus',
  components: { MenuForm, Menu },
  data() {
    return {
      menus: []
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
