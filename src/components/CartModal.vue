<script setup>
import { useEcommerceStore } from '../store/ecommerce';

const cartStore = useEcommerceStore();

const cart = cartStore.cart;
</script>

<template>
  <div class="cart-modal">
    <div class="cart-modal-header">
      <h2>Your cart</h2>
    </div>

    <div class="cart-modal-body">
      <div v-if="cart.length" class="cart-items">
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <div class="cart-item-image">
            <img :src="item.image" />
          </div>
          <div class="cart-item-information">
            <h3>{{ item.title }}</h3>
            <div class="cart-item-actions">
              <button @click="cartStore.decreaseItemQuantity(item.id)"> - </button>
              <p>{{ item.quantity }}</p>
              <button @click="cartStore.increaseItemQuantity(item.id)"> + </button>
            </div>
            <p>Product total: US$ {{ (item.quantity * item.price).toFixed(2) }}</p>
          </div>
        </div>
      </div>

      <div v-else class="empty-message">
        <p>Your cart is empty</p>
      </div>
    </div>

    <div class="cart-modal-footer" v-if="cart.length">
      <h2>Total: US$ {{ cartStore.totalPrice.toFixed(2) }}</h2>
      <router-link to="/checkout">
        <button class="checkout-btn">Checkout</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.cart-modal {
  background-color: white;
  border-radius: 10px;
  border: 1px solid var(--medium-gray);
  -webkit-box-shadow: 0px 0px 25px 1px rgba(31,31,31,0.20);
  -moz-box-shadow: 0px 0px 25px 1px rgba(31,31,31,0.20);
  box-shadow: 0px 0px 25px 1px rgba(31,31,31,0.20);
  display: flex;
  flex-direction: column;
  max-height: 50vh;
  overflow: hidden;
  padding: 0 1rem;
  position: absolute;
  right: 0;
  top: 120%;
  width: 350px;
}

.cart-modal-header {
  border-bottom: 2px solid var(--medium-gray);
  padding: 1rem 0 0.5rem;

  h2 {
    font-weight: 400;
  }
}

.cart-modal-body {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  align-items: center;
  border-bottom: 1px solid var(--medium-gray);
  display: flex;
  gap: 1.25rem;
  padding-bottom: 1rem;

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
}

.cart-item-image {
  width: 50px;
  height: 50px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  overflow: hidden;

  img {
    height: 100%;
    object-fit: contain;
    width: 100%;
  }
}

.cart-item-information {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;

  h3 {
    font-size: 1rem;
    margin: 0 0 0.25rem;
    font-weight: 400;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  .cart-item-actions {
    align-items: center;
    display: flex;
    gap: 1rem;

    button {
      align-items: center;
      border-radius: 5px;
      display: flex;
      height: 20px;
      justify-content: center;
      outline: none;
      width: 25px;
    }
  }

  p {
    margin: 0;
    font-size: 0.875rem;
  }
}

.empty-message {
  text-align: center;
  color: var(--dark-gray);
  padding: 1.5rem;
  flex-grow: 1;
}

.cart-modal-footer {
  border-top: 1px solid var(--medium-gray);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  button {
    width: 100%;
  }
}
</style>
