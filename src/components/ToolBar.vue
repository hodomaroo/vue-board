<template>
  <div class="toolbar-holder">
    <router-link to="/items">ContentsBoard</router-link>
    <router-link to="/">DashBoard</router-link>
    <router-link to="/">VOC</router-link>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.toolbar-holder {
  display: flex;
  justify-content: left;
  margin-top: 20px;
  width: 100%;
}

.toolbar-holder > * {
  margin-left: 50px;
  font-size: 15px;
  font-weight: bold;
}
</style>
