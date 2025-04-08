<script setup>

</script>

<template>
    <header>
        <div>
            <h1>
                Vue E-commerce
            </h1>
            <p>
                Buy new stuff here!
            </p>
        </div>
        <nav>
            <ul>
                <li>
                    <router-link to='/' class="navigation-links">
                        Home
                    </router-link>
                </li>
                <li>
                    <router-link to='/catalog' class="navigation-links">
                        Catalog
                    </router-link>
                </li>
                <li>
                    <router-link to='/cart' class="navigation-links">
                        Cart
                    </router-link>
                </li>
                <li>
                    <router-link to='/checkout' class="navigation-links">
                        Checkout
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    align-items: center;
    border-bottom: 1px solid #909090;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-block: 2rem;
    width: 100%;

    div {
        align-items: inherit;
        display: inherit;
        flex-direction: inherit;
    }

    nav {
        ul {
            display: flex;
            gap: 1.5rem;
            list-style: none;

            li {
                .navigation-links {
                    color: inherit;
                    font-weight: 500;
                    text-decoration: none;
                }
            }
        }
    }
}
</style>