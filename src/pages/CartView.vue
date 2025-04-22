<script setup>
import { computed } from 'vue'
import { PhShoppingCart, PhTrash } from '@phosphor-icons/vue'
import { useEcommerceStore } from '../store/ecommerce'

const cartStore = useEcommerceStore()
const cart = computed(() => cartStore.cart)
</script>

<template>
    <div class="cart-container">
        <div class="cart-container-header">
            <h1>Review your items</h1>
            <router-link to="/">
                <button v-if="cart.length">
                    <PhShoppingCart :size="30" />
                    Continue shopping
                </button>
            </router-link>
        </div>
        <div class="cart-information-container">
            <div class="cart-items">
                <div v-if="cart.length">
                    <div v-for="item in cart" :key="item.id" class="cart-item">
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
                </div>
                <div v-else>
                    <div class="empty-cart-message">
                        <h2>
                            Ops, seems like your cart is empty!
                        </h2>
                        <p>
                            Keep looking our <router-link to="/">shop</router-link> to find something you like.
                        </p>
                    </div>
                </div>
            </div>
            <div v-if="cart.length" class="cart-summary">
                <h2>Cart summary</h2>
                <div class="cart-summary-items-and-price">
                    <p class="cart-summary-total-items">Number of items in the cart: {{ cartStore.totalItems }}</p>
                    <p class="cart-summary-total-price">Cart total: US$ {{ cartStore.totalPrice.toFixed(2) }}</p>
                </div>
                <div class="cart-summary-actions">
                    <router-link to="/checkout">
                        <button>Checkout</button>
                    </router-link>
                    <button class="clear-cart-btn" @click="cartStore.clearCart">
                        <PhTrash :size="25" />
                        Clear cart
                    </button>
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

}

.cart-container-header {
    align-items: center;
    border-bottom: 1px solid var(--medium-gray);
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.5rem;
    margin-bottom: 2rem;

    h1 {
        font-size: 2.75rem;
        font-weight: 300;
    }

    button {
        align-items: center;
        display: flex;
        gap: 0.5rem;
        padding-inline: 1rem;
    }
}

.cart-information-container {
    display: flex;
    gap: 4rem;
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

/* This button will remove the item from the cart */
.clear-cart-btn {
    width: 33%;
}

.cart-summary {
    border: 1px solid var(--medium-gray);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    max-height: fit-content;
    padding: 1rem;
    min-width: 20%;
    max-width: 25%;

    h2 {
        border-bottom: 1px solid var(--medium-gray);
        font-size: 2rem;
        font-weight: 300;
        padding-bottom: 0.5rem;
    }
}

.cart-summary-items-and-price {
    border-bottom: 1px solid var(--medium-gray);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding-block: 1.5rem;
}

.cart-summary-total-items {
    font-size: 1.1rem;
    font-weight: 300;
}

.cart-summary-total-price {
    font-size: 1.75rem;
    font-weight: 500;
}

.cart-summary-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 1.5rem;

    button {
        width: 100%;
    }

    p {
        font-weight: 500;
        font-size: 0.75rem;
        text-align: center;
    }
}

.empty-cart-message {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    justify-content: center;
    padding-block: 10rem;

    h2 {
        font-size: 2.5rem;
        font-weight: 300;
    }

    p {
        font-size: 1.25rem;
        font-weight: 300;
    }

    a {
        color: olivedrab;
        font-weight: 500;
    }
}
</style>