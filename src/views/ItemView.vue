<template>
  <router-link class="add-item" to="/"> 글쓰기 </router-link>
  <div class="main-contents">ㅎㅇ</div>
</template>

<script>
export default {}
</script>

<style scoped>
.main-contents {
  border: 3px solid aquamarine;
  padding: 50px;
  text-align: center;
  line-height: 400px;
  font-size: 30px;
  width: 100%;
}

.add-item {
  display: block;
  position: relative;
  top: -30px;
  left: 90%;
  border: aquamarine 1px solid;
  width: fit-content;
  padding: 0 5px;
  color: aquamarine;
  font-weight: bolder;
  transition-duration: 0.5s;
}
.add-item:hover {
  transform: translateY(-3px);
  box-shadow: 3px 3px 0 gray;
  background-color: aquamarine;
  color: black;
}
</style>
