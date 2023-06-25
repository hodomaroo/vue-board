<template>
  <div class="form-holder">
    <div class="login-title">Sign Up</div>
    <form>
      <input type="text" placeholder="id" id="id" />
      <br />
      <input type="password" placeholder="password" id="password" />
      <div>
        <input type="submit" value="회원가입" class="submit" />
      </div>
    </form>
  </div>
</template>

<script>
export default {}
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

input {
  border-radius: 8px;
  padding: 15px;
  background: white;
  color: black;
  font-weight: bolder;

  width: 100%;
}

input::placeholder {
  color: gray;
  font-weight: initial;
  width: 100%;
}

#password {
  margin-top: 5px;
  margin-bottom: 15px;
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
</style>
