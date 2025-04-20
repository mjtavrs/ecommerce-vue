<script setup>
import { useEcommerceStore } from '../store/ecommerce.js'
import { onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import CartFilter from '../components/CartFilter.vue'

const store = useEcommerceStore()

onMounted(() => store.loadProducts())
</script>

<template>
    <div class="container">
        <CartFilter />
        <div v-if="!store.loadedProducts.length">
            <p>Loading products...</p>
        </div>
        <div v-else class="products-list">
            <ProductCard v-for="product in store.loadedProducts" :key="product.id" :product="product" />
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    gap: 1rem;
}

.products-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    width: 100%;
}
</style>