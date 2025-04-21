import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useEcommerceStore = defineStore('ecommerce', {
    state: () => ({
        // The Fake Store API will return categories and prices, we can filter by them
        activeFilters: {
            categories: [],
            priceRange: [0, 1000]
        },
        cart: [],
        loadedProducts: [],
        loading: false
    }),
    actions: {
        async loadProducts() {
            this.loading = true
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                this.loadedProducts = await response.json()
            } catch (error) {
                console.error('Failed to load the products: ', error)
            } finally {
                this.loading = false
            }
        },
        addProductToCart(product) {
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
            const index = this.cart.findIndex(item => item.id === productId)
            if (index === -1) return

            this.cart[index].quantity++
        },
        decreaseItemQuantity(productId) {
            const index = this.cart.findIndex(item => item.id === productId)
            if (index === -1) return

            if (this.cart[index].quantity > 1) {
                this.cart[index].quantity--
            } else {
                this.cart.splice(index, 1)
            }
        },
        clearCart() {
            this.cart.splice(0, this.cart.length)
        }
    },
    getters: {
        filteredProducts(state) {
            return state.loadedProducts.filter(product => {
                const matchesCategory = 
                    state.activeFilters.categories.length === 0 || 
                    state.activeFilters.categories.includes(product.category)

                const matchesPriceRange = 
                    product.price >= state.activeFilters.priceRange[0] && 
                    product.price <= state.activeFilters.priceRange[1]

                return matchesCategory && matchesPriceRange
            })
        },
        totalItems: (state) => state.cart.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: (state) => state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    },
    persist: true
})