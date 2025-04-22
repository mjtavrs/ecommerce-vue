<script setup>
import EcommerceHeader from './components/EcommerceHeader.vue'
</script>

<template>
  <EcommerceHeader />
  <Transition name="slide-fade" mode="out-in">
    <router-view />
  </Transition>
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
