import { acceptHMRUpdate, defineStore } from "pinia";
import { Coin } from "~/types/coin";

export type CoinStore = {
    coins: globalThis.Ref<Coin[]>
    getById: (id: string) => Coin | null
    fetchCoins: () => Promise<void>
}

export const useCoinStore = defineStore("coin", (): CoinStore => {
    const coins = ref<Coin[]>([]);

    const getById = (id: string): Coin | null => {
        return coins.value.find(coin => coin.id === id) ?? null
    }

    const fetchCoins = async (): Promise<void> => {
        try {
            const response = await fetch(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
            );
            const data: Coin[] = await response.json();
            coins.value = data
        } catch (error) {
            console.error(error);
        }
    }
    
    return { coins, fetchCoins, getById }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCoinStore, import.meta.hot));
}

