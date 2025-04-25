<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useEcommerceStore } from '../store/ecommerce'

const orderNumber = ref()
const cartStore = useEcommerceStore()
const router = useRouter()

onMounted(() => {
    if (!cartStore.successAccessAllowed) {
        router.replace('/not-found')
    } else {
        cartStore.resetSuccessAccess()
    }
})

function handleOrderNumberCreationAndResetCart() {
    orderNumber.value = Math.floor(Math.random() * 10001)
    cartStore.clearCart()
}

handleOrderNumberCreationAndResetCart()
</script>

<template>
    <main class="order-successful-container">
        <img src="../assets/images/success_illustration.png" alt="Order successful illustration">
        <div class="order-successful-container-message">
            <h1>
                Order <span>#{{ orderNumber }}</span> successfully placed
            </h1>
            <p>You'll receive more details about your order by e-mail, including tracking information.</p>
            <p>Return to our <router-link to="/">shop</router-link> to find more items!</p>
        </div>
    </main>
</template>

<style scoped>
.order-successful-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: calc(100vh - 18rem);
}

img {
    width: 20%;
}

.order-successful-container-message {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h1 {
        font-size: 3rem;
        font-weight: 300;

        span {
            font-weight: 700;
        }
    }

    p {
        font-size: 1.175rem;

        a {
            color: olivedrab;
            font-weight: 500;
        }
    }
}

@media (max-width: 1024px) {
    img {
        width: 60%;
    }

    .order-successful-container-message {
        gap: 2rem;
        text-align: center;

        h1 {
            font-size: 2.5rem;
            line-height: 100%;
        }

        p {
            font-size: 1rem;
        }
    }
}
</style>