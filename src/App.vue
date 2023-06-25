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
      <transition :name="$route.meta.transition || 'slide'">
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
  height: 100%;
}

.slide-leave-active {
  position: absolute;
  transition: all 0.5s ease-out;
  width: 50%;
}

.slide-enter-active {
  position: absolute;
  transition: all 1.5s ease-out;
  width: 50%;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  position: absolute;
  transition: all 0.5s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
