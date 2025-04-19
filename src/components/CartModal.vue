<script setup>
import { useEcommerceStore } from '../store/ecommerce'

const cartStore = useEcommerceStore()
const cart = cartStore.cart
</script>

<template>
    <div class="cart-modal-container">
        <div class="cart-items-scroll">
            <div v-if="cart.length !== 0">
                <div v-for="item in cart" :key="item.id" class="cart-item">
                    <img :src="item.image">
                    <div class="cart-item-metadata">
                        <h3>{{ item.title }}</h3>
                        <p>US$ {{ item.price.toFixed(2) }}</p>
                        <p>Quantity: {{ item.quantity }}</p>
                    </div>
                </div>
            </div>
            <div v-else class="empty-message">
                <p>Your cart is empty</p>
            </div>
        </div>
        <router-link to="/checkout" v-if="cart.length !== 0">
            <button class="checkout-btn">Checkout</button>
        </router-link>
    </div>
</template>


<style scoped>

</style>