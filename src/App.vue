<template>
<div class="app">
  <Title />
  <div class="game-card-grid">
    <GameCard v-for="item in gameList" :key="item.id" :game="item" />
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Title from './components/Title.vue'
import GameCard from './components/GameCard.vue'
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    Title,
    GameCard
  },
      setup() {

        const store = useStore();
        const gameList = ref(store.state.gameList)

        return {
            gameList
        }

    }
})
</script>

<style>

body {
  background-color: var(--dark-bg);
  font-family: 'Lexend Deca', sans-serif;
  color: white;
}

.app {
  padding: 8rem;
}

.game-card-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

</style>
