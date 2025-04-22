import { ref } from 'vue'
import { useEcommerceStore } from '../store/ecommerce'

export function useProduct() {
    const product = ref(null)
    const error = ref(null)

    const fetchProduct = async (id) => {
        const cartStore = useEcommerceStore()

        let foundProduct = cartStore.loadedProducts.find(product => product.id === id)

        if (!foundProduct) {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`)

                if (!response.ok) throw new Error("Product not found")

                foundProduct = await response.json()
            } catch (err) {
                error.value = err.message
                return
            }
        }

        product.value = foundProduct
    }

    return { product, error, fetchProduct }
}