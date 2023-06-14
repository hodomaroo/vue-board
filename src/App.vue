<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HomeTitle from './components/HomeTitle.vue'
import ToolBar from './components/ToolBar.vue'
</script>

<template>
  <div class="holder">
    <home-title></home-title>
    <tool-bar></tool-bar>

    <div>
      <transition name="slide">
        <router-view v-slot="{ Component }" :key="$route.path">
          <component :is="Component" class="component-container"></component>
        </router-view>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.holder {
  width: 100%;
}

.slide-enter-active,
.slide-leave-active {
  position: absolute;
  transition: all 1s ease-out;
  width: 100%;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
