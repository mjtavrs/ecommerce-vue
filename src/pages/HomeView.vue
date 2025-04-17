<script setup>
import { useEcommerceStore } from '../store/ecommerce.js'

const store = useEcommerceStore()
</script>

<template>
    <div class="container">
        <h1>Test to load the products:</h1>
        <button @click="store.loadProducts">Load products</button>

        <pre v-if="store.loadedProducts.length">
            {{ store.loadedProducts }}
        </pre>
        <p v-else>No products loaded</p>
    </div>
</template>

<style scoped>
</style>