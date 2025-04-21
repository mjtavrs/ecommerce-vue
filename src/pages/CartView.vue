<script setup>
import { computed } from 'vue'
import { PhTrash } from '@phosphor-icons/vue'
import { useEcommerceStore } from '../store/ecommerce.js'

const cartStore = useEcommerceStore()
const cart = computed(() => cartStore.cart)

</script>

<template>
    <div class="cart-container">
        <h1>Review your items</h1>
        <div class="cart-information-container">
            <div class="cart-items">
                <div v-if="cart.length" v-for="item in cart" :key="item.id" class="cart-item">
                    <div class="cart-item-image">
                        <img :src="item.image" />
                    </div>
                    <div class="cart-item-information-container">
                        <div class="cart-item-information-wrapper">
                            <div class="cart-item-metadata">
                                <h3 class="cart-item-title">{{ item.title }}</h3>
                                <p class="cart-item-rating">⭐ {{ item.rating.rate }} ({{ item.rating.count }}) </p>
                                <p class="cart-item-price">US$ {{ (item.price.toFixed(2)) }}</p>
                            </div>
                            <div class="cart-item-actions">
                                <button @click="cartStore.decreaseItemQuantity(item.id)"> - </button>
                                <p>{{ item.quantity }}</p>
                                <button @click="cartStore.increaseItemQuantity(item.id)"> + </button>
                            </div>
                        </div>
                        <button class="clear-cart-btn" @click="cartStore.removeProductFromCart(item.id)">
                            <PhTrash :size="25" />
                            Remove item
                        </button>
                    </div>
                </div>
                <div v-else>
                    <p>
                        Your cart is empty!
                    </p>
                </div>
            </div>
            <div class="cart-summary">
                <h2>Cart summary</h2>
                <div>
                    <p>Number of items in the cart: {{ cartStore.totalItems }}</p>
                    <p>Cart total: US$ {{ cartStore.totalPrice.toFixed(2) }}</p>
                </div>
                <div>
                    <button>Checkout</button>
                    <p>Shipping and taxes are calculated at checkout</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cart-container {
    background-color: white;
    border: 1px solid var(--medium-gray);
    border-radius: 10px;
    overflow: hidden;
    padding: 2rem;

    h1 {
        border-bottom: 1px solid var(--medium-gray);
        font-size: 2.75rem;
        font-weight: 300;
        padding-bottom: 0.5rem;
        margin-bottom: 2rem;
    }
}

.cart-information-container {
    display: flex;
    gap: 10rem;
}

.cart-items {
    border-radius: 10px;
    border: 1px solid var(--medium-gray);
    flex: 1;
    padding-inline: 2rem;
}

.cart-item {
    align-items: flex-start;
    border-bottom: 1px solid var(--medium-gray);
    display: flex;
    gap: 2rem;
    padding-block: 1rem;

    &:last-child {
        border-bottom: none;
    }
}

.cart-item-image {
    align-items: center;
    background-color: white;
    display: flex;
    height: 20rem;
    justify-content: center;
    padding: 2rem;
    overflow: hidden;
    width: 40%;

    img {
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
    }
}

.cart-item-information-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 20rem;
    width: 60%;
}

.cart-item-information-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.cart-item-metadata {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.cart-item-title {
    font-size: 1.75rem;
    font-weight: 300;
}

.cart-item-rating {
    font-size: 1rem;
    font-weight: 500;
}

.cart-item-price {
    font-size: 1.5rem;
    font-weight: 500;
}

.cart-item-actions {
    align-items: center;
    display: flex;
    gap: 1rem;

    p {
        font-size: 1.25rem;
        font-weight: 600;
    }

    button {
        align-items: center;
        background-color: transparent;
        border: 1px solid var(--green);
        border-radius: 5px;
        color: var(--green);
        display: flex;
        font-size: 1.5rem;
        height: 35px;
        justify-content: center;
        outline: none;
        width: 37.5px;
    }
}

.clear-cart-btn {
    width: 33%;
}
</style>