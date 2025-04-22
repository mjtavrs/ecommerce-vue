<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { PhBasket } from "@phosphor-icons/vue";
import { useEcommerceStore } from "../store/ecommerce";
import CartModal from "./BagModal.vue";

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
    <CartModal v-if="showBag" />
  </span>
</template>

<style scoped>
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
