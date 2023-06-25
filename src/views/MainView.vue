<template>
  <h1>인증 진행 중..!</h1>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  async created() {
    const code = this.$route.query.code
    this.auth_user(code)
  },

  methods: {
    ...mapActions(['auth_user'])
  }
}
</script>
