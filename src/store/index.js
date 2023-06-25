import { createStore } from 'vuex'
import { get_github_user_token, get_github_user_info, validate_user_token } from '../controller'
import router from '../router'

const store = createStore({
  state: {
    auth: {
      isAuthenticated: false,
      authInfo: undefined,
      userData: undefined
    }
  },

  mutations: {
    auth_user_commit(state, data) {
      state.auth.isAuthenticated = true
      state.auth.authInfo = data
      localStorage.setItem('authInfo', JSON.stringify(data))
    },
    user_data_commit(state, data) {
      state.auth.userData = data
      localStorage.setItem('userInfo', JSON.stringify(data))
    },

    logout_commit(state) {
      state.auth.isAuthenticated = false
      state.auth.authInfo = undefined
      state.auth.userData = undefined

      localStorage.removeItem('authInfo')
      localStorage.removeItem('userInfo')
      router.push({ name: 'login' })
    }
  },

  actions: {
    validate_token({ commit }, token) {
      validate_user_token(token).then((res) => {
        if (res === false) {
          this.dispatch('logout')
        }
      })
    },
    load_auth_token({ commit }) {
      try {
        const authInfo = JSON.parse(localStorage.getItem('authInfo'))
        if (authInfo) {
          commit('auth_user_commit', authInfo)
        }
      } catch (error) {
        console.log(error)
      }
    },
    load_user_info({ commit }) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if (userInfo) {
          commit('user_data_commit', userInfo)
        }
      } catch (error) {
        console.log(error)
      }
    },

    auth_user({ commit }, code) {
      get_github_user_token(code)
        .then((authInfo) => {
          commit('auth_user_commit', authInfo)
          return authInfo
        })
        .then((authInfo) => get_github_user_info(authInfo.access_token))
        .then((response) => {
          if (response.status != 200) {
            router.push({ name: 'login' })
          } else {
            commit('user_data_commit', response.data.user_info)
            router.push({ name: 'home' })
          }
        })
    },
    logout({ commit }) {
      commit('logout_commit')
    }
  }
})

store.watch(
  function (state) {
    return state.auth.authInfo
  },
  function (newVal) {
    //when access token exist and changed its value, validate it
    if (newVal !== undefined) {
      store.dispatch('validate_token', newVal.access_token)
    }
  },
  {
    deep: true
  }
)

export default store
