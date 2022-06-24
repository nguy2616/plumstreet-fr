<template>
  <!--double click on the user card to edit user, move the user card to ConftactForm-->
   <ContactForm :dbclick="true" :contact="con" />
</template>

<script>
import ContactForm from './ContactForm.vue'
export default {
  name: 'ContactItem',
  props: ['con'],
  components: { ContactForm }
}
</script>

<style>

</style>
