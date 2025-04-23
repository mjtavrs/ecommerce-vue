<script setup>
import EcommerceHeader from './components/EcommerceHeader.vue'
</script>

<template>
  <EcommerceHeader />
  <router-view v-slot="{ Component }">
    <Transition name="slide-fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 700ms ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
