import axios from 'axios'

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

export { get_github_user_token, get_github_user_info, validate_user_token }
