import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useEcommerceStore = defineStore('ecommerce', {
    state: () => ({
        activeFilters: [],
        cart: [],
        loadedProducts: []
    }),
    actions: {
        async loadProducts() {
            const response = await fetch('https://fakestoreapi.com/products')
            this.loadedProducts = await response.json()
        },
        addProductToCart(product) {
            // Check if the item already exists with this function
            const existingProduct = this.cart.find(item => item.id === product.id)

            if (existingProduct) {
                existingProduct.quantity++
            } else {
                this.cart.push({ ...product, quantity: 1 })
            }
        },
        removeProductFromCart(productId) {
            this.cart = this.cart.filter(item => item.id !== productId)
        },
        increaseItemQuantity(productId) {
            const existingItem = this.cart.find(item => item.id === productId)

            if (!existingItem) return

            existingItem.quantity++
        },
        decreaseItemQuantity(productId) {
            const existingItem = this.cart.find(item => item.id === productId)

            if (!existingItem) return

            if (existingItem.quantity > 1) {
                existingItem.quantity--
            } else {
                this.cart = this.cart.filter(item => item.id !== productId)
            }
        },
        clearCart() {
            this.cart = []
        }
    },
    getters: {
        filteredProducts(state) {
            if (state.activeFilters.length === 0) {
                return state.loadedProducts
            }

            return state.loadedProducts.filter(product => {
                state.activeFilters.includes(product.category)
            })
        },
        totalItems: (state) => state.cart.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: (state) => state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    },
    persist: true
})