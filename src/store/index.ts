import { filterByAll, filterByGenres, filterByPlatform, filterByPlaytime, filterByScore, filterComingSoon, filterLeavingSoon, getMaxPlaytime } from '@/composables/filters';
import { createStore, GetterTree, MutationTree } from 'vuex'
import { FilterGroup, Game, MutationNumberArray, MutationBoolean } from '../types'

export type State = {
  gameList: Array<Game>,
  genreList: Array<string>,
  filters: FilterGroup
};

const state: State = {

  gameList: [

    {
      id: 9138579238745,
      title: 'Stardew Valley',
      img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/xrpmydnu9rpxvxfjkiu7.png',
      description: 'After escaping the burden of city life, an office worker begins their new life managing their grandfather\'s farmland in the rural region of Stardew Valley in this indie mix of top-down action-RPG and life simulation.',
      platform: 'PC',
      xcloud: true,
      genres: ['Adventure', 'Role-Playing', 'Simulation'],
      score: 91,
      playtime: 113,
      comingSoon: false,
      leavingSoon: false
    } as Game,

    {
      id: 385034728354,
      title: 'Subnautica',
      img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1iqw.png',
      description: 'Descend into the depths of an alien underwater world filled with wonder and peril. Craft equipment, pilot submarines and out-smart wildlife to explore lush coral reefs, volcanoes, cave systems, and more, all while trying to survive.',
      platform: 'Xbox',
      xcloud: true,
      genres: ['Open World', 'Science fiction', 'Survival'],
      score: 85,
      playtime: 41,
      comingSoon: false,
      leavingSoon: false
    } as Game

  ],

  genreList: [],

  filters: {
    scoreMin: 0,
    scoreMax: 100,
    playtimeMin: 0,
    playtimeMax: 9999,
    platforms: [],
    genres: [],
    comingSoon: false,
    leavingSoon: false
  }

};


const getters: GetterTree<State, State> = {

  getFilteredByAll(state: State) {
    return filterByAll(state.gameList, state.filters);
  },

  getFilteredByPlatform(state: State) {
    return filterByPlatform(state.gameList, state.filters);
  },

  getFilteredByGenres(state: State) {
    return filterByGenres(state.gameList, state.filters);
  },

  getFilteredByScore(state: State) {
    return filterByScore(state.gameList, state.filters);
  },

  getFilteredByPlaytime(state: State) {
    return filterByPlaytime(state.gameList, state.filters);
  },

  getComingSoon(state: State) {
    return filterComingSoon(state.gameList, state.filters);
  },

  getLeavingSoon(state: State) {
    return filterLeavingSoon(state.gameList, state.filters);
  },

  getMaxPlaytime(state: State) {
    return getMaxPlaytime(state.gameList);
  }

}

const mutations: MutationTree<State> = {

  setGameList(state: State, games: Array<Game>) {
    state.gameList = games;
  },

  setGenreList(state: State) {
    
    let genreList: Array<string> = [];

    state.gameList.forEach(game => {
      genreList = genreList.concat(game.genres);
    });

    state.genreList = genreList.filter(function(item, pos) {
      return genreList.indexOf(item) == pos;
    });

  },

  setFilters(state: State, filters: FilterGroup) {
    state.filters = filters;
  },

  setPlatformsFilter(state: State, platforms: Array<string>) {
    state.filters.platforms = platforms;
  },

  setGenresFilter(state: State, genres: Array<string>) {
    state.filters.genres = genres;
  },

  setSliderFilter(state: State, data: MutationNumberArray) {
    state.filters[data.variable + 'Min'] = data.value[0];
    state.filters[data.variable + 'Max'] = data.value[1];
  },

  setToggleFilter(state: State, data: MutationBoolean) {
    state.filters[data.variable] = data.value;
  }

}

export const store = createStore({
  state,
  getters,
  mutations
});