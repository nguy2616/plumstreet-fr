<template>
<v-dialog
      v-model="visible"
      :width="$vuetify.breakpoint.mobile ? '100%' : '70%'"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        v-if="add"
          v-bind="attrs"
          v-on="on"
          :class="`base-btn ${$vuetify.breakpoint.name} save text-none`"
        >
          Make a quotation
        </v-btn>
      </template>
      <v-card >
        <v-card-title class="d-flex justify-space-between" :class="$vuetify.breakpoint.mobile ? 'text-h4' : 'text-h2'">
         <v-col class="d-flex justify-start">  <img width="100px" :src="require('@/assets/image/logo-plumstreet.png')" alt=""></v-col>
          <v-col class="d-flex justify-end">QUOTATION</v-col>
        </v-card-title>
         <v-card-text>
             <div  class="d-flex justify-center">
             <v-form
             v-if="step === 1"
    ref="quotationForm"
    lazy-validation
    class="dialog-form max-width pa-6"
  >
  <v-row class="quotation-client">
      <v-col cols="5" class="d-flex justify-start">
        <div>
            <p> Quotation for</p>
     <h4 class="text-h4"> {{proposal.event.client.fullName}}</h4>
           <p> {{proposal.event.client.email}}</p>
        </div>
    </v-col>
    <v-col cols="" class="d-flex justify-end">
      <div>
        <p class="d-flex justify-space-between"><span>Quotation No.</span><span  class="ml-5">{{proposal.id}}</span></p>
 <p class="d-flex justify-space-between"><span>Date</span><span class="ml-5">{{today}}</span></p>
      </div>
    </v-col>
  </v-row>
  <div class="quotation-menu" v-for="(menu, i) in proposal_menus" :key="i">
       <h4 class="text-h4">  {{menu.name}}</h4>
      <p> {{menu.note}}</p>

  <v-row class="d-flex">
    <v-col cols="4"><h6 class="text-h6">Item description</h6></v-col>
     <v-col cols="2"><h6 class="text-h6">Quantity</h6></v-col>
     <v-col cols="3"><h6 class="text-h6">Unit price</h6></v-col>
     <v-col cols="3"><h6 class="text-h6">Amount</h6></v-col>
     <!--<v-col cols="2"><h6 class="text-h6">Amount proposed</h6></v-col>-->
  </v-row>
        <v-divider class="mb-1 mt-1"></v-divider>
  <div  v-for="(item, i) in menu.proposal_items" :key="i">
    <v-row class="d-flex">
         <v-col cols="4">
      <h4>{{item.name}}</h4>
      <p>{{item.desc}}</p>
    </v-col>
     <v-col cols="2">
       {{proposal.event.guests}}
     </v-col>
     <v-col cols="3">€ {{item.cost.toFixed(2)}}</v-col>
     <v-col cols="3">€ {{(Number(item.cost)*Number(proposal.event.guests)).toFixed(2)}}</v-col>
     <!--<v-col cols="2">
         <v-text-field
       :rules="proposedPriceRules"
      v-model.number="item.proposedPrice"
      required
    ></v-text-field>
        </v-col>-->
    </v-row>
  <v-row>
    <v-divider class="mb-5"></v-divider>
  </v-row>
  </div>
      </div>

      <!--total-->
        <div class="d-flex justify-end mt-5">
      <div class="quotation-total">
         <p class="d-flex justify-space-between"><span class="mr-4">Subtotal</span><span  class="ml-8">€ {{subtotal.toFixed(2)}}</span></p>
          <p class="d-flex justify-space-between second-color"><span class="mr-4 mt-2">Discount</span><v-text-field
       :rules="discountRules"
      v-model.number="discount"
      required
        dense
      append-icon="mdi-percent-outline"
      style="max-width: 50px"
    ></v-text-field>
    <span class="ml-8 mt-2">€ {{amountDiscount.toFixed(2)}}</span></p>
        <p class="d-flex justify-space-between"><span class="mr-4 mt-2">Tax</span><v-text-field
       :rules="taxRules"
      v-model.number="tax"
      required
      dense
      append-icon="mdi-percent-outline"
      style="max-width: 50px"
    ></v-text-field>
    <span class="mt-2">€ {{amountTax.toFixed(2)}}</span></p>
       <span class="d-flex justify-space-between"><h6 class="text-h6 mr-4">Total due</h6><h6  class="text-h6 ml-8">€ {{total.toFixed(2)}}</h6></span>
      </div>

    </div>
        <v-row class="d-flex justify-center justify-space-between mt-4">
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
           :class="`base-btn ${$vuetify.breakpoint.name} save`"
           @click.prevent="submit"
          >
           {{ $i18n.t('auth.Add')}}
          </v-btn>
             </v-col>

    </v-row>
             </v-form>
      <!--success notify-->
             <div v-else-if="step === 2" class="submited d-flex justify-center">
  <div class="text-center">
    <h4 class="text-h4">{{ $i18n.t('client.FormReceive')}}</h4>
    <p>
{{ $i18n.t('client.CheckEmail')}} </p>
    <v-btn @click="step = 1, visible = false"  :class="`base-btn ${$vuetify.breakpoint.name} save text-none`">{{ $i18n.t('client.ReturnWeb')}}</v-btn>
  </div>
    </div>
             </div>
         </v-card-text>
      </v-card>
  </v-dialog>
</template>

<script>
import * as func from '@/utils/function.js'
export default {
  name: 'QuotationForm',
  props: ['proposal', 'proposal_menus', 'add'],
  data() {
    return {
      step: 1,
      visible: false,
      discount: 0,
      amountDiscount: 0,
      discountRules: [
        v => !isNaN(parseFloat(v)) || 'Please input number'
      ],
      tax: 0,
      amountTax: 0,
      taxRules: [
        v => !isNaN(parseFloat(v)) || 'Please input number'
      ],
      subtotal: 0,
      total: 0,
      guestsNumber: this.$props.proposal.event.guests,
      today: func.getToday()
    }
  },
  watch: {
    discount(val) {
      if (val === 0) {
        this.amountDiscount = 0
        this.total = this.subtotal - this.amountDiscount + this.amountTax
      } else {
        this.amountDiscount = (val * this.subtotal) / 100
        this.total = this.subtotal - this.amountDiscount + this.amountTax
      }
    },
    tax(val) {
      if (val === 0) {
        this.amountTax = 0
        this.total = this.subtotal - this.amountDiscount + this.amountTax
      } else {
        this.amountTax = (val * this.subtotal) / 100
        this.total = this.subtotal - this.amountDiscount + this.amountTax
      }
    },
    subtotal(val) {
      if (val) {
        this.total = this.subtotal - this.amountDiscount + this.amountTax
      }
    },
    visible(val) {
      if (val === true) {
        this.subtotal = 0
        this.calSubtotal()
      }
    },
    proposal(pro) {
      if (pro) {
        this.guestsNumber = pro.event.guests
      }
    }
  },
  methods: {
    calSubtotal() {
      this.$props.proposal_menus.forEach(menu => {
        menu.proposal_items.forEach(item => {
          const sub = item.cost * this.guestsNumber
          this.subtotal += sub
        })
      })
    },
    submit() {
      if (this.$refs.quotationForm.validate()) {
        const quotationData = { id: this.proposal.id, isQuo: true, date: this.today, subtotal: this.subtotal, discount: this.discount, tax: this.tax, totaldue: this.totaldue }
        this.$store.dispatch('proposal/updateProposal', quotationData)
          .then(() => {
            this.step = 2
          })
      }
    },
    cancel() {
      this.$refs.quotationForm.reset()
      this.visible = false
    }
  }
}
</script>

<style>

</style>
