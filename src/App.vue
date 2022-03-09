<template>
<div class="app">
  <Title />
  <GameCard />
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Title from './components/Title.vue'
import GameCard from './components/GameCard.vue'

export default defineComponent({
  components: {
    Title,
    GameCard
  },
  setup() {

    const count = ref(0);

    return {
        count
    }

  }
})
</script>

<style>

body {
  background-color: var(--dark-bg);
}

</style>
