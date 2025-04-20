<script setup>
import { useEcommerceStore } from '../store/ecommerce';

const store = useEcommerceStore()

const props = defineProps({
    product: Object
})
</script>

<template>
    <div class="product-card">
        <div class="product-card-image-container">
            <img :src="product.image" :alt="product.title">
        </div>
        <div class="product-card-metadata">
            <div class="product-card-metadata-wrapper">
                <h3 class="product-card-metadata-title">{{ product.title }}</h3>
                <span class="product-card-metadata-category">{{ product.category }}</span>
                <p class="product-card-metadata-price">US$ {{ (product.price.toFixed(2)) }}</p>
            </div>
            <button @click="store.addProductToCart(product)">Add to cart</button>
        </div>
    </div>
</template>

<style scoped>
.product-card {
    border: 1px solid var(--medium-gray);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    overflow: hidden;
}

.product-card-image-container {
    align-items: center;
    background-color: white;
    display: flex;
    height: 12.5rem;
    justify-content: center;
    padding: 2rem;
    overflow: hidden;
    width: 100%;

    img {
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
    }
}

.product-card-metadata {
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}

.product-card-metadata-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.product-card-metadata-title {
    display: block;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
}

.product-card-metadata-category {
    background-color: var(--medium-gray);
    border-radius: 5px;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.2rem 0.6rem;
    text-transform: uppercase;
    max-width: fit-content;
}

.product-card-metadata-price {
    font-size: 1.15rem;
    font-weight: 600;
}
</style>