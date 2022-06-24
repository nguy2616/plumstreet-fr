<template>
<v-form
    ref="menuForm"
    lazy-validation
    class="auth-form" :class="$vuetify.breakpoint.mobile || admin ? 'max-width admin-bg' : 'fixed-width'"
  >
   <h2 class="mb-4" :class="$vuetify.breakpoint.mobile  ? 'text-h4' : 'text-h2'">{{ $i18n.t('auth.MenuTitle') }}</h2>
   <h4 class="menu-cuisinetype text-h4 mb-3">{{ $i18n.t('auth.CuisineType') }}</h4>
   <v-row class="d-flex">
    <v-col class="cuisinetypes" :order="cuisinetypesConst.orderLast.includes(item.name.toLowerCase()) ? 10 : 0" :cols="$vuetify.breakpoint.mobile ? 6 : 4" v-for="(item, i) in cuisinetypes" :key="i">
      <v-checkbox
        @change="selectCuisinetype(item)"
        v-model="item.isCheck"
        :label="item.name"
      >
      </v-checkbox>
    </v-col>
   </v-row>
    <h4 class="menu-cuisinetype text-h4 mt-8 mb-3">{{ $i18n.t('auth.SpecialDiet') }}</h4>
   <v-row class="d-flex">
     <v-col class="cuisinetypes" :cols="$vuetify.breakpoint.mobile ? 6 : 4" v-for="(item, i) in specialdiets" :key="i">
       <v-checkbox
          @change="selectSpecialdiet(item)"
          v-model="item.isCheck"
         :label="item.name"
    ></v-checkbox>
     </v-col>
   </v-row>
     <v-row class="d-flex mt-8" justify="start">
      <v-col class="d-flex justify-start">
        <v-btn
          @click="(e) => { $router.go(-1) }"
          :class="`base-btn ${$vuetify.breakpoint.name} discard`"
        >
          <v-icon>mdi-arrow-left</v-icon>{{ $i18n.t('auth.Cancel')}}
        </v-btn>
      </v-col>
       <v-col class="d-flex justify-end">
       <v-btn
       :disabled="disable"
      :class="`base-btn ${$vuetify.breakpoint.name} save`"
      @click.prevent="submit"
    >
           {{ $i18n.t('auth.Save')}}
          <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
       </v-col>

  </v-row>
  </v-form>
</template>

<script>
import * as func from '@/utils/function.js'
const cuisinetypesConst = {
  orderLast: ['autres']
}
export default {
  name: 'CuisineType',
  data() {
    return {
      disable: true,
      selectedCT: [],
      selectedSD: []
    }
  },
  watch: {
    $route(to, from) {
      if (this.disable === false) {
        this.getCuisinetypes()
        this.getSpecialdiets()
      }
      if (to.name === 'CuisineType') {
        this.disable = true
        this.getCuisinetypes()
        this.getSpecialdiets()
      }
    },
    disable(val) {
      this.$store.commit('auth/save', val)
    }
  },
  mounted() {
    this.getCuisinetypes()
    this.getSpecialdiets()
    this.$store.commit('auth/save', this.disable)
  },
  computed: {
    company() {
      return this.$store.state.company.company
    },
    cuisinetypes() {
      return this.$store.state.cuisinetypes.cuisinetypes
    },
    specialdiets() {
      return this.$store.state.specialdiets.specialdiets
    },
    cuisinetypesConst() {
      return cuisinetypesConst
    },
    admin() {
      return this.$store.state.auth.admin
    }
  },
  methods: {
    submit() {
      if (this.$refs.menuForm.validate()) {
        const dataForm = { id: this.company.id, cuisine_types: this.selectedCT, special_diets: this.selectedSD }
        this.$store.dispatch('company/updateCompany', dataForm)
          .then(() => {
            this.disable = true
            this.$router.push('/menus')
          })
      }
    },
    getCuisinetypes() {
      this.$store.dispatch('company/getCompany', this.company.id)
        .then(res => {
          this.selectedCT = res.data.cuisine_types
          this.$store.dispatch('cuisinetypes/getCuisinetypes', '?_sort=name:asc')
            .then(() => {
              this.cuisinetypes.forEach(item => {
                func.checkIncluded(item, this.selectedCT)
              })
            })
        })
    },
    getSpecialdiets() {
      this.$store.dispatch('company/getCompany', this.company.id)
        .then(res => {
          this.selectedSD = res.data.special_diets
          this.$store.dispatch('specialdiets/getSpecialdiets', '?_sort=name:asc')
            .then(() => {
              this.specialdiets.forEach(item => {
                func.checkIncluded(item, this.selectedSD)
              })
            })
        })
    },
    selectCuisinetype(item) {
      this.disable = false
      if (item.isCheck) {
        this.selectedCT.push(item)
      } else {
        this.selectedCT = this.selectedCT.filter(cui => cui.id !== item.id)
      }
    },
    selectSpecialdiet(item) {
      this.disable = false
      if (item.isCheck) {
        this.selectedSD.push(item)
      } else {
        this.selectedSD = this.selectedSD.filter(cui => cui.id !== item.id)
      }
    }
  }
}
</script>

<style>

</style>
