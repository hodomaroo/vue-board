<template>
  <div class="toolbar-holder">
    <router-link to="/items">ContentsBoard</router-link>
    <router-link to="/home">DashBoard</router-link>
    <router-link to="/">VOC</router-link>
    <button v-if="auth.user_token" class="btn user-info" @click="this.showUserInfo = true">
      내 정보
    </button>
    <button v-if="auth.user_token" class="btn log-out" @click="this.logout">로그아웃</button>
  </div>

  <transition name="modal">
    <Modal v-if="this.showUserInfo" @close="this.showUserInfo = false">
      <template v-slot:header> <h3 class="info-title">USER INFO</h3> </template>
      <template v-slot:body>
        <div>{{ auth.userData.login }}</div>
        <div>{{ auth.userData.name }}</div>
        <div>{{ auth.userData.public_repos }}</div>
      </template>
      <template v-slot:footer> <div></div> </template>
    </Modal>
  </transition>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Modal from './Modal.vue'

export default {
  components: {
    Modal
  },

  data() {
    return {
      showUserInfo: false
    }
  },
  computed: {
    ...mapState(['auth'])
  },

  methods: {
    ...mapActions(['logout'])
  }
}
</script>

<style scoped>
.toolbar-holder {
  display: flex;
  justify-content: left;
  margin-top: 20px;
  width: 100%;
}

.toolbar-holder > * {
  margin-left: 50px;
  font-size: 15px;
  font-weight: bold;
}

.btn {
  border: 1px solid aquamarine;
  background: none;
  color: aquamarine;
  transition-duration: 0.5s;

  font-size: 15px;
}

.log-out {
  position: absolute;
  top: 30px;
  right: 30px;
}

.user-info {
  position: absolute;
  top: 30px;
  right: 110px;
}

.btn:hover {
  cursor: pointer;
  background: aquamarine;
  color: black;
  transform: translateY(-2px);
  box-shadow: 3px 3px 0px gray;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.info-title {
  font-family: fantasy;
  color: aquamarine;
  text-decoration: underline gray 3px;
}
</style>
