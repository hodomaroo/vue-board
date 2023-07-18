import axios from 'axios'
import qs from 'qs'

axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params)
}

async function loginLocalUser({ user_id, password }) {
  console.log(user_id, password)
  return await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/login`, {
    user_id,
    password
  })
}

async function validate_token({ user_id, token }) {
  console.log(user_id, token)
  return await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/token`, {
    user_id,
    token
  })
}

async function refresh_token({ user_id, refresh_token }) {
  return await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/token/refresh`, {
    user_id,
    refresh_token
  })
}

export { loginLocalUser, validate_token, refresh_token }
