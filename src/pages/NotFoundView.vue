<script setup></script>

<template>
    <main class="not-found-container">
        <img src="../assets/images/404_illustration.png" alt="Not found illustration">
        <div class="not-found-container-message">
            <h1>This page does not exist</h1>
            <p>Return to our <router-link to="/">shop</router-link> to find something you like.</p>
        </div>
    </main>
</template>

<style scoped>
.not-found-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: calc(100vh - 18rem);
}

img {
    width: 20%;
}

.not-found-container-message {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h1 {
        font-size: 3rem;
        font-weight: 300;
    }

    p {
        font-size: 1.175rem;

        a {
            color: olivedrab;
            font-weight: 500;
        }
    }
}
</style>