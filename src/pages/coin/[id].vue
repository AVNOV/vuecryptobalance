<script setup lang="ts">
import { Coin } from '~/types/coin';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const coinStore = useCoinStore()
const router = useRouter()

const coin = ref<Coin>()

onMounted(async () => {
    await coinStore.fetchCoins();
    const ret = coinStore.getById(props.id);

    if (ret === null) {
        router.push({ name: "404" });
    } else {
        coin.value = ret;
    }
})

</script> 

<template>
    <div v-if="coin" class="coin-details">
        <h2>{{ coin.name }} ({{ coin.symbol }})</h2>
        <div class="details">
            <div class="field">
                <span class="label">Prix :</span>
                <span class="value">{{ coin.current_price }}</span>
            </div>
            <div class="field">
                <span class="label">Capitalisation boursière :</span>
                <span class="value">{{ coin.market_cap }}</span>
            </div>
            <div class="field">
                <span class="label">Volume (24h) :</span>
                <span class="value">{{ coin.total_volume }}</span>
            </div>
            <div class="field">
                <span class="label">Variation (24h) :</span>
                <span class="value">{{ coin.price_change_percentage_24h }}%</span>
            </div>
            <div class="field">
                <span class="label">Rang :</span>
                <span class="value">{{ coin.market_cap_rank }}</span>
            </div>
            <div class="field">
                <span class="label">Symbole :</span>
                <span class="value">{{ coin.symbol }}</span>
            </div>
            <div class="field">
                <span class="label">Volume total :</span>
                <span class="value">{{ coin.total_volume }}</span>
            </div>
            <div class="field">
                <span class="label">Offre en circulation :</span>
                <span class="value">{{ coin.circulating_supply }}</span>
            </div>
            <div class="field">
                <span class="label">Offre maximale :</span>
                <span class="value">{{ coin.max_supply }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.coin-details {
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 4px;
}

.coin-details h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.coin-details .details {
  margin-top: 20px;
}

.coin-details .field {
  display: flex;
  margin-bottom: 10px;
}

.coin-details .label {
  font-weight: bold;
  margin-right: 5px;
  color: #555;
}

.coin-details .value {
  font-weight: normal;
  color: #333;
}

.coin-details .value.positive {
  color: green;
}

.coin-details .value.negative {
  color: red;
}
</style>