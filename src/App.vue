<template>
<div class="app">
  <Title />
  <Sort />

  <div v-if="loading">
    <Spinner></Spinner>
  </div>

  <main v-else>
    <div class="filter-components sticky">
      <div class="platform-tags">
        <h3>Platform</h3>
        <Tag v-for="item in platforms" :key="item" :tag="item" :icon="item.toLowerCase()" @click="platformFilter(item)"></Tag>
      </div>
      <div class="genre-tags">
        <h3>Genres</h3>
        <TransitionGroup name="list">
          <Tag v-for="item in genreList" :key="item" :tag="item" @click="genreFilter(item)"></Tag>
        </TransitionGroup>
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
          <Toggle :initialValue="false" :toggleId="'comingSoon'" /><span> Exclude coming soon</span>
        </div>
        <div class="leaving-soon">
          <Toggle :initialValue="false" :toggleId="'leavingSoon'" /><span> Exclude leaving soon</span>
        </div>
      </div>
    </div>

    <div class="game-card-grid">
      <TransitionGroup name="list">
      <div class="wrapper" v-for="(item, key) in gameList" :key="item.id">
        <GameCard  :game="item" @toggle="e => addCard(e, key)" />
        <div class="further-info" v-if="selectedGame == key">
          <div class="list-item" v-if="item.comingSoon == false">
            <span class="descriptor">Average playtime: </span><span>{{ item.playtime }} hours</span>
          </div>
          <div class="list-item" v-if="item.comingSoon == false">
            <span class="descriptor">Critic score: </span><span>{{ Math.round(item.score) }} / 100</span>
          </div>
          <div class="list-item">
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
      </TransitionGroup>
    </div>
  </main>


</div>



</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onBeforeMount, ref } from 'vue';
import Title from './components/Title.vue'
import Sort from './components/Sort.vue'
import GameCard from './components/GameCard.vue'
import Slider from './components/Slider.vue'
import Toggle from './components/Toggle.vue'
import Tag from './components/Tag.vue'
import Spinner from './components/Spinner.vue'
import { useStore } from 'vuex';
import { MutationNumberArray } from './types';
import { parseApiData, parseGenres } from '@/composables/functions';

export default defineComponent({
  components: {
    Title,
    GameCard,
    Slider, 
    Tag,
    Toggle,
    Sort,
    Spinner
  },
  setup() {

    const platforms = [
      'Xbox',
      'PC',
      'xCloud'
    ]

    const store = useStore();
    const gameList = computed(() => store.getters.getFilteredByAll)
    const genreList = computed(() => store.getters.getGenres)
    const maxPlaytime = computed(() => store.getters.getMaxPlaytime)

    const loading = ref(true);
    const selectedGame = ref(-1);

    const scoreSliderData: MutationNumberArray = {
      variable: 'score',
      value: [0, 100]
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

    function addCard(e: Event, key: number) {

      if(selectedGame.value == -1) {
        selectedGame.value = key;
      } else selectedGame.value = -1

    }

    onBeforeMount( async () => {

      const store = useStore();

      const resp = await fetch('/.netlify/functions/airtableConnect');
      const data = (await resp.json()).data;

      const games = parseApiData(data);
      const genres = parseGenres(games);

      store.commit('setGenreList', genres);
      store.commit('setGameList', games);

      loading.value = false;

    })

    onMounted(() => {
      
      store.commit('setSliderFilter', scoreSliderData);
      store.commit('setSliderFilter', playtimeSliderData);

    })


    return {
        gameList,
        genreList,
        platforms,
        scoreSliderData,
        playtimeSliderData,
        maxPlaytime,
        loading,
        selectedGame,
        platformFilter,
        genreFilter,
        addCard
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
  align-items: start;
  grid-template-columns: 20% 1fr;
  grid-template-rows: 10rem 1fr;
}

main {
  grid-area: 2 / 1 / 3 / 3;
  display: grid;
  align-items: start;
  grid-template-columns: 20% 1fr;
}

Title {
  grid-area: 1 / 1 / 2 / 2;
}

Sort {
  grid-area: 1 / 2 / 2 / 3;
}

.filter-components {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 3rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.048);
}

.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 2rem;
}

.filter-components h3 {
  margin-bottom: 1rem;
}

.score-slider h3, .playtime-slider h3 {
  margin-bottom: 2.5rem;
}

.game-card-grid {
  margin-left: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 16rem));
  grid-gap: 2rem;
}

.fullwidth {
  grid-column: 1 / -1;
}

.further-info .list-item {
  margin-top: 1rem;
}

.descriptor {
  background-color: var(--orange);
  display: inline-block;
  font-size: 80%;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  border-radius: 0.25rem;
}

.toggle-group > div {
  margin-bottom: 0.5rem;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

@media (max-width: 115rem) { 

  .sticky {
    position: relative;
    top: 0;
  }

 }

@media (max-width: 100rem) { 

  .app {
    grid-template-columns: 30% 1fr;
  }

  main {
    grid-template-columns: 30% 1fr;
  }

  .game-card-grid {
    grid-template-columns: repeat(auto-fit, minmax(14rem, 16rem));
  }

 }

@media (max-width: 64rem) {

  .app {
    grid-template-columns: 80% 1fr;
    width: 80%;
    padding: 6rem 10%;
  }

  main {
    grid-template-columns: 1fr;
    grid-gap: 2rem;
  }

  .game-card-grid {
    margin-left: 0rem;
    grid-template-columns: repeat(2, 1fr);
  }

  .game-card-grid, .filter-components {
    max-width: 70%;
  }

}

@media (max-width: 25rem) {
  
  .filter-components {
    max-width: 65%;
  }

  .game-card-grid {
    grid-template-columns: repeat(auto-fit, minmax(14rem, 100%));
    max-width: 90%;
  }

}


</style>
