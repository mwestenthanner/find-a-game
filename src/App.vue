<template>
<div class="app">
  <Title />
  <div class="filter-components">
    <div class="genre-tags">
      <h3>Choose genres</h3>
      <GenreTags v-for="item in sampleTags" :key="item" :tag="item" ></GenreTags>
    </div>
    <div class="score-slider">
      <h3>Choose critic scores</h3>
      <Slider :sliderValue="[60, 100]" />
    </div>
    <div class="playtime-slider">
      <h3>Choose playtime hours</h3>
      <Slider :sliderValue="[5, 20]" />
    </div>
  </div>
  <div class="game-card-grid">
    <GameCard v-for="item in gameList" :key="item.id" :game="item" />
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Title from './components/Title.vue'
import GameCard from './components/GameCard.vue'
import Slider from './components/Slider.vue'
import GenreTags from './components/GenreTag.vue'
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    Title,
    GameCard,
    Slider, 
    GenreTags
  },
      setup() {

        const sampleTags = [
          'Simulation',
          'Adventure',
          'Open World'
        ]

        const store = useStore();
        const gameList = ref(store.state.gameList);

        return {
            gameList,
            sampleTags
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

.filter-components {
  display: grid; 
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 4rem;
  margin-bottom: 3rem;
}

.filter-components h3 {
  margin-bottom: 3rem;
}

.game-card-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 2rem;
}

</style>
