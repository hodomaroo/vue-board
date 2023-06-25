<template>
  <div>
    <div v-if="this.userInfo">{{ this.userInfo.data.access_token }}</div>
    <div v-if="this.userInfo">{{ this.userInfo.data.token_type }}</div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  mounted() {
    const code = this.$route.query.code
    this.auth_user(code)
  },

  methods: {
    ...mapActions(['auth_user'])
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>
