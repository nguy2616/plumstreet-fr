<template>
  <v-form
    ref="commentForm"
    lazy-validation
    :class="$vuetify.breakpoint.mobile ? 'dialog-form max-width' : 'dialog-form fixed-width'"
  >

  <v-textarea
        solo
        rows="3"
          :label="$i18n.t('menu.Comment')"
          v-model="comment"
        ></v-textarea>
        <v-row class="d-flex justify-center mt-4">
          <v-btn
           :class="`base-btn ${$vuetify.breakpoint.name} save`"
            @click="submit($refs.commentForm)"
          >
            {{ $i18n.t('auth.Save')}}
          </v-btn>
    </v-row>
             </v-form>
</template>

<script>
export default {
  name: 'CommentForm',
  props: ['note'],
  data() {
    return {
      comment: this.$props.note ? this.$props.note.content : '',
      visible: false
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    menu() {
      return this.$store.state.menu.menu
    }
  },
  methods: {
    submit(form) {
      if (form.validate()) {
        if (this.$props.note) { // edit current comment
          const cmt = { id: this.$props.note.id, content: this.comment }
          this.$store.dispatch('comment/updateComment', cmt)
            .then(res => {
              this.comment = ''
              this.$store.commit('menu/setMenu', null)
              this.$router.go(-1)
            })
        } else { // add new comment
          const commentForm = { menu: this.menu.id, content: this.comment, author: this.$store.state.auth.user }
          this.$store.dispatch('comment/createComment', commentForm)
            .then(() => {
              this.comment = ''
              this.$store.commit('menu/setMenu', null)
              this.$router.go(-1)
            })
        }
      }
    }
  }
}
</script>

<style>

</style>
