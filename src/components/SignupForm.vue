<template>
  <div class="form-holder">
    <div class="login-title">Sign Up</div>

    <!-- Submit.Prevent 호출 시,  Form Submit 기본 동작을 방지 / 지정한 메소드를 호출함. -->
    <form @submit.prevent="create_user">
      <div class="input-form" v-for="item in inputForm" :key="item.tag">
        <input
          spellcheck="false"
          :type="item.tag === 'password' ? 'password' : 'text'"
          :placeholder="item.placeholder"
          v-model.trim="item.data"
          @input="validate_input(item)"
          @focusout="duplicate_check_input(item)"
          :class="{ valid: item.valid.isValid, invalid: !item.valid.isValid }"
        />
        <p class="invalid-box" v-if="item.valid.msg">
          {{ item.valid.msg }}
        </p>
      </div>

      <input type="submit" value="회원가입" class="submit" />
    </form>
  </div>
</template>

<script>
import { color } from '@amcharts/amcharts5'
import axios from 'axios'
import { mapActions } from 'vuex'
import { check_user_duplication, create_local_user } from '../controller/index'

const idRegex = new RegExp(/^(?=.*[a-z])(?=.*\d)[a-z\d]{8,15}$/)
const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

const INVALID_NAME = '이름을 입력해주세요.'
const INVALID_EMAIL = '올바르지 않은 이메일 형식입니다.'
const INVALID_ID = '올바르지 않은 아이디입니다.'
const INVALID_PASSWORD = '올바르지 않은 비밀번호입니다.'

const DUPLICATED_ID = '중복된 아이디입니다.'
const DUPLICATED_EMAIL = '중복된 이메일입니다.'

export default {
  data() {
    return {
      focus: null,
      inputForm: [
        {
          tag: 'id',
          placeholder: '아이디',
          valid: {
            isValid: false,
            msg: ''
          },
          data: null
        },
        {
          tag: 'password',
          placeholder: '비밀번호',
          valid: {
            isValid: false,
            msg: ''
          },
          data: null
        },
        {
          tag: 'name',
          placeholder: '이름',
          valid: {
            isValid: false,
            msg: ''
          },
          data: null
        },
        {
          tag: 'email',
          placeholder: '이메일',
          valid: {
            isValid: false,
            msg: ''
          },
          data: null
        }
      ]
    }
  },
  methods: {
    validate_input(item) {
      let isValid = false
      let msg = ''

      if (item.tag == 'name' && !item.data) {
        msg = INVALID_NAME
      } else if ((item.tag == 'id' || item.tag == 'password') && !idRegex.test(item.data)) {
        msg = item.tag == 'id' ? INVALID_ID : INVALID_PASSWORD
      } else if (item.tag == 'email' && !emailRegex.test(item.data)) {
        msg = INVALID_EMAIL
      } else {
        isValid = true
      }

      item.valid = { isValid, msg }
    },

    async duplicate_check_input(item) {
      if (item.valid.isValid && ['id', 'email'].includes(item.tag)) {
        const res = await check_user_duplication({ [item.tag]: item.data })
        console.log(res)
        if (res === true)
          item.valid = {
            isValid: false,
            msg: !res ? '' : item.tag == 'id' ? DUPLICATED_ID : DUPLICATED_EMAIL
          }
        console.log(item.valid)
      }
    },

    async create_user() {
      console.log(this.inputForm)
      if (this.inputForm.filter((item) => !item.valid.isValid).length) {
        console.log('invalid')
        return
      }
      try {
        const body = Object.fromEntries(this.inputForm.map((item) => [item.tag, item.data]))
        const res = await create_local_user(body)

        console.log(res)
        this.$router.push({ name: 'login' })
        return res
      } catch (error) {
        console.log(error)
        return
      }
    }
  }
}
</script>

<style scoped>
.input-form {
  height: 75px;
}
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
button {
  border-radius: 8px;
  padding: 15px;
  font-weight: bolder;
  border: none;
  width: 100%;
}
input:not(.submit),
button {
  background: white;
  color: gray;

  outline: 3px solid gray;

  transition: outline-color 0.5s;
  width: 100%;
}

input::placeholder {
  color: gray;
  font-weight: initial;
  width: 100%;
}

input.invalid {
  color: red;
  font-weight: bolder;
  outline-color: red;
}

input.valid {
  color: black;
  font-weight: bolder;
  outline-color: cornflowerblue;
  outline-width: 7px;
}

.submit {
  width: 50%;
  transition-duration: 0.3s;
  background: aquamarine;
  font-size: 20px;
  line-height: 20px;
  padding: none;
}
.submit:hover {
  color: blue;
  background: yellow;
}

.invalid-box {
  font-size: 5px;
  margin-top: 5px;
  color: red;
  font-weight: bolder;
  position: relative;
  left: 50%;
  top: -60px;
  border: 2px solid orange;
  width: fit-content;
  padding: 0 10px;

  border-radius: 10px;
  text-align: center;
  background-color: white;
  transition-duration: 0.3s;
}

.invalid-box:hover {
  opacity: 0.2;
}
</style>
