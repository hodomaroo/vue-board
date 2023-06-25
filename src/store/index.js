import { createStore } from 'vuex'
import { get_github_user_token } from '../controller'

const store = createStore({
  state: {
    userInfo: undefined
  },

  mutations: {
    auth_user_commit(state, data) {
      state.userInfo = data
    }
  },

  actions: {
    auth_user({ commit }, code) {
      get_github_user_token(code).then((data) => {
        console.log(data)
        commit('auth_user_commit', data)
      })
    }
  }
})

export default store
