<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProduct } from '../composables/useProduct'
import { PhShoppingCart } from '@phosphor-icons/vue'

const route = useRoute()
const router = useRouter()
const productId = Number(route.params.id)

const { product, error, fetchProduct } = useProduct()

onMounted(async () => {
    // If the user gives an invalid id the app redirects to a not found page
    if (isNaN(productId)) {
        router.replace("/not-found")
        return
    }

    await fetchProduct(productId)

    // If the product is not found the app redirects to a not found page
    if (error.value) {
        router.replace("/not-found")
    }
})
</script>

<template>
    <div v-if="product" class="product-container">
        <div class="product-container-wrapper">
            <div>
                <img :src="product.image" :alt="product.title">
            </div>
            <div>
                <h1>{{ product.title }}</h1>
                <p>{{ product.description }}</p>
                <p>{{ product.rating.rate }}</p>
                <p>{{ product.price }}</p>
            </div>
            <div>
                <p>Quantity</p>
                <div>
                    <button></button>
                    <p></p>
                    <button></button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>