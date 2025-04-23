import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import CartView from '../pages/CartView.vue'
import CheckoutView from '../pages/CheckoutView.vue'
import ProductDetailView from '../pages/ProductDetailView.vue'
import NotFoundView from '../pages/NotFoundView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/cart', component: CartView },
    { path: '/checkout', component: CheckoutView },
    { path: '/product/:id', component: ProductDetailView, props: true },
    { path: '/:catchAll(.*)', component: NotFoundView }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router