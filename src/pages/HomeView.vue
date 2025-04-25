<script setup>
import { useEcommerceStore } from '../store/ecommerce.js'
import { computed, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import CartFilter from '../components/CartFilter.vue'

const store = useEcommerceStore()
const products = computed(() => store.filteredProducts)

onMounted(() => {
    store.activeFilters = {...store.activeFilters, priceRange: [0, 1000], categories: []}
    store.loadProducts()
})
</script>

<template>
    <main class="container">
        <CartFilter />
        <div v-if="store.loading">
            <p>Loading products, please wait...</p>
        </div>
        <div v-else-if="!products.length">
            <p>No products found!</p>
        </div>
        <div v-else class="products-list">
            <TransitionGroup name="fade" tag="div" class="products-list">
                <ProductCard v-for="product in products" :key="product.id" :product="product" />
            </TransitionGroup>
        </div>
    </main>
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

.fade-enter-active, .fade-leave-active {
    transition: all 700ms ease-in-out;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: scale(0.7);
}

@media (max-width: 767px) {
    .container {
        flex-direction: column;
    }
}
</style>