<script setup>
import { ref } from "vue";
import { PhShoppingCartSimple } from "@phosphor-icons/vue";
import { useEcommerceStore } from "../store/ecommerce";
import CartModal from "./CartModal.vue";

const cartStore = useEcommerceStore();

const cart = cartStore.cart;
const showCart = ref(false);

const toggleShowCart = () => {
  showCart.value = !showCart.value;
};
</script>

<template>
  <span class="header-container-actions-wrapper" >
    <PhShoppingCartSimple :size="20" color="white" @click="toggleShowCart" />
    <span class="header-container-total-items" v-if="!showCart">{{ cartStore.totalItems }}</span>
    <CartModal v-if="showCart" />
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
