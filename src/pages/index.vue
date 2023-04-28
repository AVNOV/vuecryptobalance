<script setup lang="ts">
const coinStore = useCoinStore();

const search = ref("");
const filteredCoins = computed(() => {
    if (search.value === "") {
        return coinStore.coins;
    }

    return coinStore.coins.filter(c => c.id.toLowerCase().startsWith(search.value.toLowerCase()) || c.symbol.toLowerCase().startsWith(search.value.toLowerCase()))
})


const elemNb = 12
const currentPage = ref(1)
const maxPage = computed(() => {
    return Math.ceil(filteredCoins.value.length / elemNb)
})

watch(maxPage, (val: number) => {
    if (val > currentPage.value) {
        currentPage.value = val
    }
})

const keepPage = ref(0);

watch(search, (val: string, prev: string) => {
    if (prev === "" && val !== "") {
        keepPage.value = currentPage.value;
        currentPage.value = 1;
    }
    if (val === "" && prev !== "") {
        currentPage.value = keepPage.value;
    }
})

const pagesItems = computed(() => {
    const begin = (currentPage.value - 1) * elemNb
    const end = begin + 12 >= filteredCoins.value.length ? filteredCoins.value.length - 1 : begin + 12;
    return filteredCoins.value.slice(begin, end)
})

const nextPage = () => {
    if (currentPage.value < maxPage.value)
        currentPage.value++;
}

const previousPage = () => {
    if (currentPage.value > 1)
        currentPage.value--;
}

onMounted(async () => {
    await coinStore.fetchCoins();
    currentPage.value = 1;
})
</script>

<template>
    <Navbar v-model="search" />
    <div>
        <h1>Liste des cryptomonnaies</h1>
        <div class="crypto-cards">
            <router-link v-for="coin in pagesItems" :key="coin.id" :to="`/coin/${coin.id}`" class="crypto-card">
                <img :src="coin.image" :alt="coin.name" class="crypto-image" />
                <h2>{{ coin.name }}</h2>
                <p>{{ coin.symbol }}</p>
                <p>Prix actuel: ${{ coin.current_price }}</p>
                <p>Variation 24h: {{ coin.price_change_percentage_24h }}%</p>
            </router-link>
        </div>
        <div class="pagination">
            <button @click="previousPage" :disabled="currentPage === 1">Précédent</button>
            <span>Page {{ currentPage }} sur {{ maxPage }}</span>
            <button @click="nextPage" :disabled="currentPage === maxPage">Suivant</button>
        </div>
    </div>
</template>

<style scoped>
.crypto-cards {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
}

.crypto-card {
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    color: inherit;
    min-width: 200px;
}

.crypto-image {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-bottom: 10px;
}

h2 {
    margin-bottom: 5px;
}
</style>