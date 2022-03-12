<template>
<div class="app">
  <Title />
  <Sort />

  <div class="filter-components">
    <div class="platform-tags">
      <h3>Platform</h3>
      <Tag v-for="item in platforms" :key="item" :tag="item" :icon="item.toLowerCase()" @click="platformFilter(item)"></Tag>
    </div>
    <div class="genre-tags">
      <h3>Genres</h3>
      <Tag v-for="item in genreList" :key="item" :tag="item" @click="genreFilter(item)"></Tag>
    </div>
    <div class="score-slider">
      <h3>Critic Scores</h3>
      <Slider :initialValue="scoreSliderData.value" :sliderId="scoreSliderData.variable" />
    </div>
    <div class="playtime-slider">
      <h3>Playtime Hours</h3>
      <Slider :initialValue="playtimeSliderData.value" :sliderId="playtimeSliderData.variable" :max="maxPlaytime" />
    </div>
    <div class="toggle-group">
      <div class="coming-soon">
        <Toggle :initialValue="false" :toggleId="'comingSoon'" /><span> Coming soon only</span>
      </div>
      <div class="leaving-soon">
        <Toggle :initialValue="false" :toggleId="'leavingSoon'" /><span> Leaving soon only</span>
      </div>
    </div>
  </div>

  <div class="game-card-grid">
    <GameCard v-for="item in gameList" :key="item.id" :game="item" />
  </div>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import Title from './components/Title.vue'
import Sort from './components/Sort.vue'
import GameCard from './components/GameCard.vue'
import Slider from './components/Slider.vue'
import Toggle from './components/Toggle.vue'
import Tag from './components/Tag.vue'
import { useStore } from 'vuex';
import { MutationNumberArray } from './types';

export default defineComponent({
  components: {
    Title,
    GameCard,
    Slider, 
    Tag,
    Toggle,
    Sort
  },
  setup() {

    const platforms = [
      'Xbox',
      'PC',
      'Xcloud'
    ]

    const store = useStore();
    const gameList = computed(() => store.getters.getFilteredByAll)
    const maxPlaytime = computed(() => store.getters.getMaxPlaytime)
    const genreList  = ref(store.state.genreList)

    const scoreSliderData: MutationNumberArray = {
      variable: 'score',
      value: [60, 100]
    }

    const playtimeSliderData: MutationNumberArray = {
      variable: 'playtime',
      value: [0, maxPlaytime.value]
    }

    function platformFilter(item: string) {
      store.commit('setPlatformsFilter', item);
    }

    function genreFilter(item: string) {
      store.commit('setGenresFilter', item);
    }

    onMounted(() => {
        store.commit('setSliderFilter', scoreSliderData);
        store.commit('setSliderFilter', playtimeSliderData);
    })


    return {
        gameList,
        platforms,
        scoreSliderData,
        playtimeSliderData,
        maxPlaytime,
        genreList,
        platformFilter,
        genreFilter
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
  grid-template-columns: 20% 1fr;
  grid-template-rows: 1fr 6fr;
  grid-template-areas: 
    "title sort"
    "filters games"
}

Title {
  grid-area: title;
}

Sort {
  grid-area: sort;
}

.filter-components {
  grid-area: filters;
  display: flex;
  flex-direction: column;
  gap: 4rem;
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
