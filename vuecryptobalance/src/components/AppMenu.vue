<template>
  <div class="menu-bar">
    <div class="menu-container">
      <h1 class="logo">VCB - Vue Crypto Balance</h1>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Rechercher..." />
        <button @click="search">Rechercher</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    search() {
      // Search algo there
      console.log('Recherche :', this.searchQuery);
    },
  },
});
</script>

<style>
.menu-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f1f1f1;
  padding: 10px 20px;
}

.menu-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.search-bar {
  display: flex;
  align-items: center;
}

input[type='text'] {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #ddd;
  border: none;
  border-radius: 3px;
}
</style>