<script setup>
import { PhFunnel } from '@phosphor-icons/vue'
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
                        <input type="checkbox">
                        <label for="">Electronics</label>
                    </div>
                    <div class="categories-input-wrapper">
                        <input type="checkbox">
                        <label for="">Jewelery</label>
                    </div>
                </div>
                <div class="categories-input-container">
                    <div class="categories-input-wrapper">
                        <input type="checkbox">
                        <label for="">Men's Clothing</label>
                    </div>
                    <div class="categories-input-wrapper">
                        <input type="checkbox">
                        <label for="">Women's Clothing</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="price-filter">
            <h3>Price</h3>
            <div class="price-input-wrapper">
                <div class="price-input-range">
                    <span>0</span>
                    <span>1000</span>
                </div>
                <label for="">Select a price range</label>
                <input type="range" min="0" max="1000">
            </div>
        </div>
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
    padding: 1rem 1rem 4rem;
    width: 400px;

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
}

.price-input-range {
    display: flex;
    justify-content: space-between;

    span {
        background-color: var(--beige);
        border-radius: 5px;
        font-size: 0.75rem;
        padding: 0.125rem 0.3rem;
    }
}

.price-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    label {
        display: none;
    }
}
</style>