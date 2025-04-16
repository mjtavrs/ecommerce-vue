import { defineStore } from 'pinia'

export const useEcommerceStore = defineStore('ecommerce', {
    state: () => ({
        activeFilters: [],
        cart: [],
        loadedProducts: []
    }),
    actions: {
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
    persist: true
})