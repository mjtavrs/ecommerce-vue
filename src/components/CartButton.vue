<script setup>
import { ref } from 'vue'
import { PhShoppingCartSimple } from '@phosphor-icons/vue'
import CartModal from './CartModal.vue'

const showCart = ref(false)

const toggleShowCart = () => {
    showCart.value = !showCart.value
}
</script>

<template>
    <span class="header-container-actions-wrapper" @click="toggleShowCart">
        <PhShoppingCartSimple :size="20" color="white" />
        <CartModal v-if="showCart" />
    </span>
</template>

<style scoped>
.header-container-actions-wrapper {
    position: relative;
}
</style>