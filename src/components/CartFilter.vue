<script setup>
import { ref, watch } from 'vue'
import { useEcommerceStore } from '../store/ecommerce'
import { PhFunnel, PhWarningCircle } from '@phosphor-icons/vue'

const store = useEcommerceStore()

const selectedCategories = ref([])
const minProductPrice = ref('')
const maxProductPrice = ref('')
const error = ref('')

function applyFilters() {
    const parsedMinProductPrice = parseFloat(minProductPrice.value) || '0'
    const parsedMaxProductPrice = parseFloat(maxProductPrice.value) || '1000'

    if (parsedMinProductPrice > parsedMaxProductPrice) {
        error.value = 'The minimum price cannot be greater than the maximum price'
        return
    }

    store.activeFilters = {
        ...store.activeFilters,
        priceRange: [parsedMinProductPrice, parsedMaxProductPrice],
        categories: selectedCategories.value
    }

    error.value = ''
}

function allowOnlyNumbersInFilter(e) {
    const allowedKeys = /^[0-9\b]+$/
    if (!allowedKeys.test(e.key)) {
        e.preventDefault()
    }
}
</script>

<template>
    <aside>
        <div class="categories-filter-header">
            <span class="categories-filter-header-icon">
                <PhFunnel :size="25" color="#1d4239" weight="fill" />
            </span>
            <h2>Filters</h2>
        </div>
        <div class="categories-filter">
            <h3>Categories</h3>
            <div class="categories-container">
                <div class="categories-input-container">
                    <div class="categories-input-wrapper">
                        <input type="checkbox" v-model="selectedCategories" value="electronics">
                        <label>Electronics</label>
                    </div>
                    <div class="categories-input-wrapper">
                        <input type="checkbox" v-model="selectedCategories" value="jewelery">
                        <label>Jewelery</label>
                    </div>
                </div>
                <div class="categories-input-container">
                    <div class="categories-input-wrapper">
                        <input type="checkbox" v-model="selectedCategories" value="men's clothing">
                        <label>Men's Clothing</label>
                    </div>
                    <div class="categories-input-wrapper">
                        <input type="checkbox" v-model="selectedCategories" value="women's clothing">
                        <label>Women's Clothing</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="price-filter">
            <h3>Price</h3>
            <div class="price-input-container">
                <div class="price-input-wrapper">
                    <label for="min-product-price">
                        Minimum price:
                    </label>
                    <input
                        id="min-product-price"
                        type="text" 
                        placeholder="0"
                        v-model="minProductPrice"
                        @keypress="allowOnlyNumbersInFilter"
                    >
                </div>
                <div class="price-input-wrapper">
                    <label for="max-product-price">
                        Maximum price:
                    </label>
                    <input
                        id="max-product-price"
                        type="text" 
                        placeholder="1000"
                        v-model="maxProductPrice"
                        @keypress="allowOnlyNumbersInFilter"
                    >
                </div>
            </div>
            <div v-if="error" class="error-message">
                <span>
                    <PhWarningCircle :size="20" color="darkred" weight="light" />
                </span>
                <p>
                    {{ error }}
                </p>
            </div>
        </div>
        <button @click="applyFilters">Apply filters</button>
    </aside>
</template>

<style scoped>
aside {
    background-color: white;
    border: 1px solid var(--medium-gray);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    height: fit-content;
    gap: 0.5rem;
    padding: 1rem 1rem 2rem;
    width: 400px;

}

.categories-filter {
    margin-top: 0.5rem;
}

.categories-filter-header {
    align-items: center;
    display: flex;
    gap: 0.5rem;

    h2 {
        font-weight: 500;
    }
}

.categories-filter-header-icon {
    background-color: var(--beige);
    border-radius: 5px;
    padding: 0.25rem;
    line-height: 0;
}

.categories-filter, .price-filter {
    h3 {
        border-bottom: 1px solid var(--medium-gray);
        font-weight: 500;
    }
}

.categories-container {
    display: flex;
    gap: 1.5rem;
    padding: 0.75rem 0;
}

.categories-input-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.categories-input-wrapper {
    align-items: center;
    display: flex;
    gap: 0.25rem;
    
    label {
        font-size: 0.875rem;
    }
}

.price-filter {
    display: flex;
    flex-direction: column;

    h3 {
        margin-bottom: 0.75rem;
    }
}

.price-input-range {
    display: flex;
    justify-content: space-between;

    span {
        background-color: var(--beige);
        border-radius: 5px;
        font-size: 0.75rem;
        font-weight: 500;
        padding: 0.125rem 0.3rem;
    }
}

.price-input-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.price-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    label {
        font-size: 0.875rem;
    }

    input {
        border: 1px solid var(--medium-gray);
        border-radius: 5px;
        padding: 0.5rem;
    }
}

.error-message {
    align-items: flex-start;
    display: flex;
    gap: 0.25rem;
    margin-top: 0.5rem;

    p {
        color: darkred;
        font-size: 0.75rem;
        font-weight: 400;
    }
}

button {
    margin-top: 1rem;
}

</style>