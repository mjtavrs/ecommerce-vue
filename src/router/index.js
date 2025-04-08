import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'
import Product from '../views/Product.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: Home },
    { path: '/catalog', component: Catalog },
    { path: '/products/:id', component: Product },
    { path: '/cart', component: Cart },
    { path: '/checkout', component: Checkout },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router