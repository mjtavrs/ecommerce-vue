<script setup>
import { ref } from 'vue'

const showCart = ref(false)

const toggleShowCart = (() => {
    showCart.value = !showCart.value
})
</script>

<template>
    <span class="header-container-actions-wrapper">
        <PhShoppingCartSimple :size="20" color="white" />
    </span>
</template>

<style scoped>
.header-container-actions-wrapper {
    position: relative;
}
</style>