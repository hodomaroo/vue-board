import axios from 'axios'
import qs from 'qs'

axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params)
}

async function get_github_user_token(code) {
  return (
    axios
      // .post(`${import.meta.VITE_BACKEND_BASE_URL}/login/oauth/access_token`, null, {
      .post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/${import.meta.env.VITE_TOKEN_ENDPOINT}`,
        null,
        {
          params: {
            client_id: import.meta.env.VITE_GITHUB_ID,
            client_secret: import.meta.env.VITE_GITHUB_SECRET,
            code
          }
        }
      )
      .then((v) => v.data.token_info)
      .catch((v) => console.log(v))
  )
}

async function get_github_user_info(token) {
  return axios.get(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/${import.meta.env.VITE_USER_ENDPOINT}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

async function validate_user_token(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/${import.meta.env.VITE_USER_ENDPOINT}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return true
  } catch (error) {
    return false
  }
}

async function check_user_duplication({ id, email }) {
  const params = {
    id,
    email
  }
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/users/check`, {
    params
  })
  // console.log(response.data)
  return response.data
}

async function create_local_user({ id, email, name, password }) {
  console.log('gogo')
  const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/users`, {
    user: { user_id: id, email, name, password, user_type: 'LOCAL' }
  })

  return res
}

export {
  get_github_user_token,
  get_github_user_info,
  validate_user_token,
  check_user_duplication,
  create_local_user
}
