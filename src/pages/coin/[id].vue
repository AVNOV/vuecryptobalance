<script lang="ts">
export default {
    beforeRouteEnter: async (to, from, next) => {
        const coinStore = useCoinStore();
        await coinStore.fetchCoins();

        return next;
    }
}
</script>

<script setup lang="ts">
const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const coinStore = useCoinStore()
const router = useRouter()

const coin = computed(() => {
    const ret = coinStore.getById(props.id);

    if (ret === null) {
        router.push({ name: "404" });
    }

    return ret
})
</script> 

<template>
    <div v-if="coin !== null" class="coin-details">
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
    padding: 20px;
}

.coin-details h2 {
    margin: 0;
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
}

.coin-details .value {
    font-weight: normal;
}
</style>