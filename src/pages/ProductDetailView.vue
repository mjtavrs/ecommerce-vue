<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProduct } from '../composables/useProduct'
import { useEcommerceStore } from '../store/ecommerce'
import { PhShoppingCartSimple, PhPlus, PhCheck } from '@phosphor-icons/vue'

const props = defineProps(['id'])

const route = useRoute()
const router = useRouter()
const productId = ref(Number(route.params.id))
const store = useEcommerceStore()

const quantityToBeBought = ref(1)
const addedToCart = ref(false)

const { product, error, fetchProduct } = useProduct()

function increaseItemQuantity() {
    quantityToBeBought.value++
}

function decreaseItemQuantity() {
    if (quantityToBeBought.value > 1) quantityToBeBought.value--
}

function handleAddToCart() {
    if (product.value) {
        store.addProductToCart(product.value, quantityToBeBought.value)
        addedToCart.value = true

        setTimeout(() => {
            router.push("/cart")
        }, 750)
    }
}

watch(() => route.params.id, async (newId) => {
    const id = Number(newId)
    
    // If the user gives an invalid id the app redirects to a not found page
    if (isNaN(id)) {
        router.replace("/not-found")
        return
    }

    await fetchProduct(id)

    // If the product is not found the app redirects to a not found page
    if (error.value) {
        router.replace("/not-found")
    } else {
        productId.value = id
        quantityToBeBought.value = 1
        addedToCart.value = false
    }
}, { immediate: true })
</script>

<template>
    <main>
        <div class="return-button-container">
            <router-link to="/">
                <button v-if="product" class="return-button">
                    Return to the store
                </button>
            </router-link>
        </div>
        <div v-if="product" class="product-container">
            <div class="product-container-wrapper">
                <div class="product-container-image">
                    <img :src="product.image" :alt="product.title">
                </div>
                <div class="product-container-information">
                    <h1 class="product-title">{{ product.title }}</h1>
                    <p class="product-price">US$ {{ (product.price.toFixed(2)) }}</p>
                    <p class="product-rating">⭐ {{ product.rating.rate }} ({{ product.rating.count }})</p>
                    <p class="product-description">{{ product.description }}</p>
                    <div class="product-container-actions">
                        <h3>Quantity</h3>
                        <div class="product-container-quantity">
                            <button @click="decreaseItemQuantity" class="decreaseButton"> - </button>
                            <p>{{ quantityToBeBought }}</p>
                            <button @click="increaseItemQuantity" class="increaseButton"> + </button>
                        </div>
                        <div class="product-container-add-to-bag">
                            <button @click="handleAddToCart" class="add-to-bag-button">Add to cart</button>
                            <div @click="handleAddToCart" class="product-container-add-to-bag-animated-icon">
                                <PhShoppingCartSimple :size="30" color="white" />
                                <span>
                                    <PhPlus :size="12" weight="bold" v-if="!addedToCart"/>
                                    <PhCheck :size="12" weight="bold" v-else />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.return-button-container {
    display: flex;
    justify-content: flex-end;

    button {
        padding-inline: 1rem;
        margin-bottom: 1rem;
    }
}

.product-container {
    background-color: white;
    border: 1px solid var(--medium-gray);
    border-radius: 10px;
    padding: 2rem;
}

.product-container-wrapper {
    display: flex;
    gap: 5rem;
}

.product-container-image {
    align-items: center;
    background-color: white;
    display: flex;
    justify-content: center;
    height: 30rem;
    overflow: hidden;
    padding: 2rem;
    width: 30rem;

    img {
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
    }
}

.product-container-information {
    flex: 1;
}

.product-title {
    font-size: 3rem;
    font-weight: 300;
}

.product-price {
    font-size: 2rem;
    font-weight: 600;
}

.product-rating {
    font-size: 1.125rem;
    font-weight: 600;
    padding-top: 1rem;
}

.product-description {
    font-size: 1.25rem;
    padding-block: 1rem;
    text-align: justify;
}

.product-container-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h3 {
        font-weight: 500;
    }
}

.product-container-quantity {
    align-items: center;
    border: 1px solid var(--green);
    border-radius: 7px;
    display: flex;
    gap: 1rem;
    width: fit-content;

    button {
        align-items: center;
        border-radius: 5px;
        display: flex;
        height: 35px;
        justify-content: center;
        outline: none;
        width: 35px;
    }

    .decreaseButton {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .increaseButton {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
}

.product-container-add-to-bag {
    align-items: center;
    display: flex;
    gap: 0.5rem;

}

.add-to-bag-button {
    padding-inline: 2rem;
}

.product-container-add-to-bag-animated-icon {
    background-color: var(--green);
    border-radius: 10px;
    cursor: pointer;
    line-height: 0;
    position: relative;
    padding: 0.65rem;
    transition: background-color 250ms ease-in-out;

    &:hover {
        background-color: #3a5c54;
    }

    span {
        background-color: var(--beige);
        border-radius: 100%;
        line-height: 0;
        padding: 0.1rem 0.05rem;
        position: absolute;
        top: 5%;
        right: 5%;
    }
}

@media (max-width: 767px) {
    .product-container-wrapper {
        flex-direction: column;
        gap: 1rem;
    }

    .product-container-image {
        width: 100%;
    }

    .product-title {
        font-size: 2rem;
    }

    .product-price {
        font-size: 1.75rem;
        padding-top: 0.5rem;
    }

    .product-rating {
        font-size: 1rem;
    }

    .product-description {
        font-size: 1.175rem;
    }

    .product-container-actions {
        gap: 0.5rem;
        margin-top: 1rem;
    }

    .product-container-add-to-bag {
        gap: 1rem;
        margin-top: 1rem;
    }
}
</style>