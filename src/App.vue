<template>
<div class="app">
  <Title />

  <div class="filter-components">
    <div class="platform-tags">
      <h3>Platform</h3>
      <Tag v-for="item in platforms" :key="item" :tag="item" :icon="item.toLowerCase()" ></Tag>
    </div>
    <div class="genre-tags">
      <h3>Genres</h3>
      <Tag v-for="item in sampleTags" :key="item" :tag="item" ></Tag>
    </div>
    <div class="score-slider">
      <h3>Critic Scores</h3>
      <Slider :sliderValue="[60, 100]" />
    </div>
    <div class="playtime-slider">
      <h3>Playtime Hours</h3>
      <Slider :sliderValue="[5, 20]" />
    </div>
    <div class="toggle-group">
      <div class="coming-soon">
        <Toggle :toggleValue="false" /><span> Coming soon</span>
      </div>
      <div class="leaving-soon">
        <Toggle :toggleValue="false" /><span> Leaving soon</span>
      </div>
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
import Toggle from './components/Toggle.vue'
import Tag from './components/Tag.vue'
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    Title,
    GameCard,
    Slider, 
    Tag,
    Toggle
  },
      setup() {

        const platforms = [
          'Xbox',
          'PC',
          'Xcloud'
        ]

        const sampleTags = [
          'Simulation',
          'Adventure',
          'Open World',
          'House'
        ]

        const store = useStore();
        const gameList = ref(store.state.gameList);

        return {
            gameList,
            sampleTags,
            platforms
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
  padding: 6rem;
  display: grid;
  grid-template-areas: 
    "title title title title title title title"
    "filters games games games games games games"
}

Title {
  grid-area: title;
}

.filter-components {
  grid-area: filters;
  display: grid; 
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 2rem;
  padding: 3rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.048);
}

.filter-components h3 {
  margin-bottom: 1rem;
}

.score-slider h3, .playtime-slider h3 {
  margin-bottom: 2.5rem;
}

.game-card-grid {
  grid-area: games;
  margin-left: 2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2rem;
}

.toggle-group > div {
  margin-bottom: 0.5rem;
}

</style>
