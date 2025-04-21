import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import CartView from '../pages/CartView.vue'
import CheckoutView from '../pages/CheckoutView.vue'
import ProductDetail from '../pages/ProductDetail.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/cart', component: CartView },
    { path: '/checkout', component: CheckoutView },
    { path: '/product/:id', component: ProductDetail, props: true }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router