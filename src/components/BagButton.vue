<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { PhBasket } from "@phosphor-icons/vue";
import { useEcommerceStore } from "../store/ecommerce";
import BagModal from "./BagModal.vue";

const cartStore = useEcommerceStore();
const showBag = ref(false);
const route = useRoute()

const toggleShowBag = () => {
  showBag.value = !showBag.value;
}

// Different ways to close the bag modal
function handleEscapeKey(e) {
  if (e.key === "Escape") showBag.value = false
}

onMounted(() => window.addEventListener("keydown", handleEscapeKey))
onBeforeUnmount(() => window.removeEventListener("keydown", handleEscapeKey))

watch(() => route.fullPath, () => {
  showBag.value = false
})
</script>

<template>
  <span class="header-container-actions-wrapper" >
    <PhBasket :size="20" color="white" @click="toggleShowBag"  />
    <span class="header-container-total-items" v-if="!showBag">{{ cartStore.totalItems }}</span>
    <Transition name="slide-fade" mode="out-in">
      <BagModal v-if="showBag" />
    </Transition>
  </span>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 500ms ease-in-out;
}

.slide-fade-enter-from {
  opacity: 0;
}

.slide-fade-leave-to {
  opacity: 0;
}

.header-container-actions-wrapper {
  position: relative;
}

.header-container-total-items {
  background-color: white;
  border-radius: 100%;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.1rem 0.375rem 0;
  position: absolute;
  top: -25%;
  right: -25%;
}
</style>
