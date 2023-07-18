import { createStore } from 'vuex'
import { get_github_user_token, get_github_user_info, validate_user_token } from '../controller'
import { loginLocalUser, refresh_token, validate_token } from '../controller/index_refactor'
import router from '../router'
import { user } from '../types'

const user_type = localStorage.getItem('user_type')
const user_id = localStorage.getItem('user_id')
const user_token = localStorage.getItem('user_token')
const user_info = JSON.parse(localStorage.getItem('user_info'))
/*
user_type 
user_id 
user_token 
refresh_token -> additional
*/
const initialAuth = new user(user_id, user_type, user_token, user_info)

const store = createStore({
  state: {
    auth: initialAuth
  },

  mutations: {
    user_credential_commit(state, { user_id, user_type }) {
      state.auth.user_id = user_id
      state.auth.user_type = user_type
      localStorage.setItem('user_id', user_id)
      localStorage.setItem('user_type', user_type)
    },
    user_token_commit(state, { token, refresh_token }) {
      console.log(token)
      console.log(refresh_token)
      state.auth.user_token = token
      localStorage.setItem('user_token', token)
      localStorage.setItem('refresh_token', refresh_token)
    },
    user_info_commit(state, data) {
      state.auth.user_info = data
      localStorage.setItem('user_info', JSON.stringify(data))
    },

    logout_commit(state) {
      state.auth.user_id = null
      state.auth.user_info = null
      state.auth.user_token = null
      state.auth.user_type = null

      localStorage.removeItem('user_id')
      localStorage.removeItem('user_token')
      localStorage.removeItem('user_type')
      localStorage.removeItem('user_info')
      localStorage.removeItem('refresh_token')

      router.push({ name: 'login' })
    }
  },

  actions: {
    validate_token({ commit }) {
      validate_token({ user_id, user_token }).then((res) => {
        if (res === false) {
          this.dispatch('logout')
        }
      })
    },

    async login({ commit }, { user_id, password }) {
      try {
        const response = await loginLocalUser({ user_id, password })

        const responseData = await response.data

        this.commit('user_credential_commit', { user_id, user_type: 'LOCAL' })
        this.commit('user_token_commit', responseData)

        router.push({ name: 'home' })
        return true
      } catch (error) {
        return false
      }
    },

    // auth_user({ commit }, code) {
    //   get_github_user_token(code)
    //     .then((authInfo) => {
    //       commit('auth_user_commit', authInfo)
    //       return authInfo
    //     })
    //     .then((authInfo) => get_github_user_info(authInfo.access_token))
    //     .then((response) => {
    //       if (response.status != 200) {
    //         console.log('login Failure!')
    //         store.dispatch('logout')
    //       } else {
    //         commit('user_data_commit', response.data.user_info)
    //         router.push({ name: 'home' })
    //       }
    //     })
    //     .catch(() => {
    //       console.log('login Failure! !')
    //       store.dispatch('logout')
    //     })
    // },
    logout({ commit }) {
      commit('logout_commit')
      router.push({ name: 'login' })
    }
  }
})

store.watch(
  function (state) {
    return state.auth
  },
  function (newVal) {
    //when access token exist and changed its value, validate it
    if (newVal !== undefined) {
      store.dispatch('validate_token', newVal)
    }
  },
  {
    deep: true
  }
)

export default store
