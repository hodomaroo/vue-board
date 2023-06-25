import axios from 'axios'

function get_github_user_token(code) {
  return (
    axios
      // .post(`${import.meta.VITE_BACKEND_BASE_URL}/login/oauth/access_token`, null, {
      .post(`http://localhost:8000/login/oauth/access_token`, null, {
        params: {
          client_id: import.meta.env.VITE_GITHUB_ID,
          client_secret: import.meta.env.VITE_GITHUB_SECRET,
          code
        }
      })
      .then((v) => v.data)
      .catch((v) => console.log(v))
  )
}

export { get_github_user_token }
