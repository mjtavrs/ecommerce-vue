<script setup>
import { ref } from 'vue'
import { useEcommerceStore } from '../store/ecommerce'
import { usePaymentInputFormatter } from '../composables/usePaymentInputFormatter'

const cartStore = useEcommerceStore()
const cart = cartStore.cart
const { formatCardNumber, formatExpirationDate } = usePaymentInputFormatter()
const fixedShippingCost = 5

const cardNumber = ref('')
const expirationDate = ref('')

function handleCardNumber(e) {
    cardNumber.value = formatCardNumber(e.target.value)
}

function handleExpirationDate(e) {
    expirationDate.value = formatExpirationDate(e.target.value)
}
</script>

<template>
    <main class="checkout-container">
        <div v-if="cart.length" class="checkout-container-content">
            <h1>Checkout</h1>
            <div class="checkout-content">
                <div class="checkout-customer-information">
                    <div class="shipping-information-container">
                        <h2>Shipping information</h2>
                        <div class="shipping-information-inputs">
                            <input type="text" class="shipping-information-input" id="full-name"
                                placeholder="Full name">
                            <input type="email" class="shipping-information-input" id="email" placeholder="E-mail">
                            <input type="text" class="shipping-information-input" id="address" placeholder="Address">
                            <input type="text" class="shipping-information-input" id="city-state-zipcode"
                                placeholder="City, State, ZIP">
                        </div>
                    </div>
                    <div class="payment-method-container">
                        <h2>Payment method</h2>
                        <div class="payment-methods-selectors">
                            <input type="radio" id="credit-card" name="payment-method" value="credit-card" checked>
                            <label for="credit-card">Credit card</label>
                        </div>
                        <div class="payment-method-inputs">
                            <input type="text" placeholder="Card number (Numbers only)" maxlength="19" v-model="cardNumber" @input="handleCardNumber">
                            <div class="payment-method-expiration-cvv">
                                <input type="text" placeholder="Card owner name" class="card-owner-name-input">
                                <input type="text" placeholder="Expiration Date (MM/YYYY)" class="expiration-date-input" maxlength="7" v-model="expirationDate" @input="handleExpirationDate">
                                <input type="text" placeholder="CVV" class="cvv-input" maxlength="3">
                            </div>
                        </div>
                    </div>
                    <div class="accept-terms">
                        <input type="checkbox" id="accept-terms">
                        <label for="accept-terms">I agree to the terms and conditions</label>
                    </div>
                </div>
                <div class="checkout-cart-information">
                    <div class="checkout-cart-information-container">
                        <h2>Order summary</h2>
                        <div class="order-summary-items">
                            <div v-for="item in cart" :key="item.id">
                                <div class="order-summary-item">
                                    <div class="order-summary-item-title-and-quantity">
                                        <p>{{ item.title }}</p>
                                        <div>
                                            <p>x{{ item.quantity }}</p>
                                        </div>
                                    </div>
                                    <p class="order-summary-item-price">
                                        US$ {{ (item.price).toFixed(2) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="order-summary-subtotal-information">
                            <div class="order-summary-flex-separator">
                                <p>Subtotal</p>
                                <span>US$ {{ (cartStore.totalPrice).toFixed(2) }}</span>
                            </div>
                            <div class="order-summary-flex-separator">
                                <p>Shipping</p>
                                <span>US$ {{ fixedShippingCost.toFixed(2) }}</span>
                            </div>
                        </div>
                        <div>
                            <div class="order-summary-flex-separator">
                                <p>Total</p>
                                <span>US$ {{ (cartStore.totalPrice + fixedShippingCost).toFixed(2) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="checkout-cart-actions">
                        <div>
                            <router-link to="/">
                                <button class="add-more-items-button">Add more items</button>
                            </router-link>
                            <button class="clear-cart-btn" @click="cartStore.clearCart()">
                                Cancel order
                            </button>
                        </div>
                        <router-link to="/">
                            <button>Place order</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div>
                <h2>Ops, seems like your cart is empty!</h2>
                <p>Keep looking our <router-link to="/">shop</router-link> to find something you like.</p>
            </div>
        </div>
    </main>
</template>

<style scoped>
h1 {
    border-bottom: 1px solid var(--medium-gray);
    font-weight: 400;
    font-size: 3rem;
    margin-bottom: 2rem;
    text-align: center;
}

h2 {
    border-bottom: 1px solid var(--medium-gray);
    font-weight: 300;
    font-size: 1.75rem;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
}

input[type=text],
input[type=email] {
    border: 1px solid var(--medium-gray);
    border-radius: 5px;
    color: var(--green);
    font-size: 1rem;
    padding: 0.75rem 1rem;

    &::placeholder {
        color: var(--dark-gray);
    }
}

.checkout-container {
    background-color: white;
    border: 1px solid var(--medium-gray);
    border-radius: 10px;
    padding: 2rem;
}

.checkout-container-content {
    display: flex;
    flex-direction: column;
}

.checkout-content {
    display: flex;
}

.checkout-customer-information {
    border-right: 1px solid var(--medium-gray);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-right: 5rem;
    margin-right: 5rem;
    width: 70%;
}

.shipping-information-container, .payment-method-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.shipping-information-inputs {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.payment-methods-selectors {
    align-items: center;
    display: flex;
    gap: 0.5rem;

    input[type=radio] {
        height: 15px;
        width: 15px;
    }
}

.payment-method-inputs {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.payment-method-expiration-cvv {
    display: flex;
    gap: 1rem;
}

.card-owner-name-input {
    flex: 1;
}

.expiration-date-input, .cvv-input {
    width: 25%;
}

.accept-terms {
    align-items: center;
    display: flex;
    gap: 0.5rem;
}

.checkout-cart-information {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 30%;
}

.order-summary-items {
    display: flex;
    gap: 2rem;
    flex-direction: column;
}

.order-summary-item {
    align-items: center;
    display: flex;
    justify-content: space-between;
}

.order-summary-item-title-and-quantity {
    align-items: center;
    display: flex;
    gap: 1rem;
    width: 100%;
    
    p {
        font-size: 0.875rem;
        font-weight: 500;
        width: 200px;
    }

    div {
        background-color: var(--beige);
        border: 1px solid var(--medium-gray);
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 25px;
        width: 25px;
        text-align: center;
        
        p {
            line-height: 0;
            font-weight: 600;
            font-size: 0.875rem;
        }
    }
}

.order-summary-item-price {
    font-weight: 500;
    min-width: fit-content;
}

.order-summary-subtotal-information {
    border-top: 1px solid var(--medium-gray);
    border-bottom: 1px solid var(--medium-gray);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-block: 1rem;
    padding-block: 1rem;
}

.order-summary-flex-separator {
    display: flex;
    justify-content: space-between;

    p, span {
        font-size: 1.15rem;
        font-weight: 500;
    }
}

.checkout-cart-actions {
    border-top: 1px solid var(--medium-gray);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 1rem;
    
    div {
        display: flex;
        gap: 0.5rem;
        
        a {
            width: 100%;
        }
    }

    button {
        width: 100%;
    }
}

.add-more-items-button {
    background-color: transparent;
    border: 1px solid var(--green);
    color: var(--green);
    transition: all 250ms ease-in-out;

    &:hover {
        background-color: var(--green);
        color: white;
        border: 1px solid transparent;
    }
}
</style>