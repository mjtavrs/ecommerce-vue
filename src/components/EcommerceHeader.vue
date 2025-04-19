<script setup>
import { PhUser, PhShoppingCartSimple } from '@phosphor-icons/vue'
</script>

<template>
    <header class="header-container">
        <div class="header-container-title">
            <img src="../assets/images/vue_logo.png" alt="Vue.js logo">
            <h1>Store</h1>
        </div>
        <div class="header-container-actions">
            <span class="header-container-actions-wrapper">
                <PhUser :size="20" color="white"/>
            </span>
        </div>
    </header>
</template>

<style scoped>
.header-container {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
}

.header-container-title {
    align-items: center;
    display: flex;
    gap: 1rem;
    
    img {
        width: 100px;
    }

    h1 {
        font-size: 3rem;
    }
}

.header-container-actions {
    align-items: center;
    display: flex;
    gap: 0.5rem;
}
</style>