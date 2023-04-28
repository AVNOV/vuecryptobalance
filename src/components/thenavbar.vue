<script setup lang="ts">
    const props = defineProps({
        modelValue: {
            type: String,
            required: true,
        }
    })

    const emit = defineEmits(["update:modelValue"]);

    const searchValue = computed({
        get(): string {
            return props.modelValue
        },
        set(val: string): void {
            emit("update:modelValue", val)
        }
    })
</script>

<template>
    <div class="menu-bar">
        <div class="menu-container">
            <h1 class="logo">VCB - Vue Crypto Balance</h1>
            <div class="search-bar">
                <input type="text" v-model="searchValue" placeholder="Rechercher..." />
            </div>
        </div>
    </div>
</template>
  
<style>
.menu-bar {
    width: 100%;
    background-color: #77bbff;
}

.menu-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    padding-left: 2em;
}

.search-bar {
    display: flex;
    align-items: center;
    padding-right: 4em;
}

input[type='text'] {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

</style>
