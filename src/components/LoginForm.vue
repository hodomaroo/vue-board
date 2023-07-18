<template>
  <div class="form-holder">
    <div class="login-title">Sign in</div>
    <form @submit.prevent="call_login({ user_id, password })">
      <input type="text" placeholder="id" id="id" v-model="user_id" />
      <br />
      <input type="password" placeholder="password" id="password" v-model="password" />
      <div class="holder">
        <div class="msg-holder">
          <div v-if="showWrongPasswordText" class="msg">Wrong ID or Password!</div>
        </div>
        <div class="button-holder">
          <input type="submit" value="로그인" class="submit" />
          <router-link to="/signup" class="sign-up">회원가입</router-link>
        </div>
        <div class="button-holder">
          <div class="github-sign-in" @click="github_login">Signin With GitHub</div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
const OAUTH_URL = `${import.meta.env.VITE_GITHUB_BASE_URL}/${
  import.meta.env.VITE_OAUTH_ENDPOINT
}?client_id=${import.meta.env.VITE_GITHUB_ID}`
export default {
  data() {
    return {
      showWrongPasswordText: false
    }
  },
  methods: {
    github_login() {
      window.location.assign(OAUTH_URL)
    },
    ...mapActions(['login']),
    async call_login(params) {
      const result = await this.login(params)
      if (result == false) {
        this.showWrongPasswordText = true
      }
    }
  }
}
</script>

<style scoped>
.form-holder {
  margin-top: 10%;
  border: 3px solid aquamarine;
  padding: 25px;
  width: 50%;
  margin-left: 25%;
  border-radius: 20px;
}

.login-title {
  font-size: 25px;
  color: aqua;
  font-family: fantasy;
  margin-bottom: 10px;
}

input,
.sign-up,
.github-sign-in {
  border-radius: 8px;
  padding: 15px;
  background: white;
  color: black;
  font-weight: bolder;

  width: 100%;
}

input::placeholder {
  color: black;
  font-weight: initial;
  width: 100%;
}

#password {
  margin-top: 5px;
}

.button-holder > *,
.github-sign-in {
  text-align: center;
  width: 49.5%;
  transition-duration: 0.5s;
  background: aquamarine;
  font-size: 20px;
  line-height: 20px;
  padding: none;
}

.button-holder {
  display: flex;
  justify-content: space-between;
}

.button-holder > *:hover {
  color: blue;
  background: yellow;
  cursor: pointer;
}

.github-sign-in {
  margin-top: 5px;
  width: 100%;
  background-color: black;
  color: white;
  border: 3px white solid;
}

.github-sign-in:hover {
  background-color: white;
  color: black;
  border: 3px black solid;
}

.msg-holder {
  height: 40px;
  line-height: 40px;
  color: pink;
}
</style>
