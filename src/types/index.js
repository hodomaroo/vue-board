class user {
  constructor(user_id = '', user_type = '', user_token = '', user_info = '') {
    this.user_id = user_id
    this.user_type = user_type
    this.user_token = user_token
    this.user_info = user_info
  }
}

export { user }
