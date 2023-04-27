<template>
  <div>
    <h1>App</h1>
    <AppMenu />
    <ApiList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ApiList from './components/ItemList.vue';
import AppMenu from './components/AppMenu.vue';

export default defineComponent({
  components: {
    AppMenu,
    ApiList,
  },
});
</script>