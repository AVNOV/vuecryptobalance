<template>
  <div>
    <h1>Liste des cryptomonnaies</h1>
    <div class="crypto-cards">
      <router-link v-for="coin in coins" :key="coin.id" :to="`/coin/${coin.id}`" class="crypto-card">
        <img :src="coin.image" :alt="coin.name" class="crypto-image" />
        <h2>{{ coin.name }}</h2>
        <p>{{ coin.symbol }}</p>
        <p>Prix actuel: ${{ coin.currentPrice }}</p>
        <p>Variation 24h: {{ coin.priceChangePercentage }}%</p>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  priceChangePercentage: number;
  image: string;
}

export default defineComponent({
  data() {
    return {
      coins: [] as Coin[],
    };
  },
  mounted() {
    this.fetchCoins();
  },
  methods: {
    async fetchCoins() {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        );
        const data = await response.json();
        this.coins = data.map((coin: any) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          currentPrice: coin.current_price,
          priceChangePercentage: coin.price_change_percentage_24h,
          image: coin.image,
        }));
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>

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