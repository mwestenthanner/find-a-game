import { filterByAll, filterByGenres, filterByPlatform, filterByPlaytime, filterByScore, filterComingSoon, filterLeavingSoon, getMaxPlaytime, sortedBy } from '@/composables/filters';
import { createStore, GetterTree, MutationTree } from 'vuex'
import { FilterGroup, Game, MutationNumberArray, MutationBoolean } from '../types'

export type State = {
  gameList: Array<Game>,
  genreList: Array<string>,
  filters: FilterGroup
  sort: string
  sortDirectionDown: boolean
};

const state: State = {

  gameList: [

    {
      id: '9138579238745',
      title: 'Stardew Valley',
      img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/xrpmydnu9rpxvxfjkiu7.png',
      description: 'After escaping the burden of city life, an office worker begins their new life managing their grandfather\'s farmland in the rural region of Stardew Valley in this indie mix of top-down action-RPG and life simulation.',
      platform: ['PC'],
      genres: ['Adventure', 'Role-Playing', 'Simulation'],
      score: 91,
      playtime: 113,
      added: '2021-10-01',
      leaving: '',
      comingSoon: false,
      leavingSoon: false
    } as Game,

    {
      id: '9138579223745',
      title: 'The Elder Scrolls V: Skyrim',
      img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tnw.png',
      description: 'Skyrim reimagines and revolutionizes the open-world fantasy epic, bringing to life a complete virtual world open for you to explore any way you choose. Play any type of character you can imagine, and do whatever you want; the legendary freedom of choice, storytelling, and adventure of The Elder Scrolls is realized like never before.',
      platform: ['PC'],
      genres: ['Action', 'Fantasy', 'Open World'],
      score: 96,
      playtime: 291,
      added: '2022-01-01',
      leaving: '',
      comingSoon: false,
      leavingSoon: true
    } as Game,

    {
      id: '385034728354',
      title: 'Subnautica',
      img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1iqw.png',
      description: 'Descend into the depths of an alien underwater world filled with wonder and peril. Craft equipment, pilot submarines and out-smart wildlife to explore lush coral reefs, volcanoes, cave systems, and more, all while trying to survive.',
      platform: ['Xbox'],
      genres: ['Open World', 'Science fiction', 'Survival'],
      score: 85,
      playtime: 41,
      added: '2021-02-01',
      leaving: '',
      comingSoon: true,
      leavingSoon: false
    } as Game,

    {
      id: '385034729054',
      title: 'A Plague Tale: Innocence',
      img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1lat.png',
      description: 'A Plague Tale: Innocence, on PlayStation 4, Xbox One and PC, tells the grim story of two siblings fighting together for survival in the darkest hours of History. This new video game from Asobo Studio sends you on an emotional journey through the 14th century France, with gameplay combining adventure, action and stealth, supported by a compelling story. Follow the young Amicia and her little brother Hugo, who face the brutality of a ravaged world as they discover their purpose to expose a dark secret. On the run from the Inquisition\'s soldiers, surrounded by unstoppable swarms of rats incarnating the Black Death, Amicia and Hugo will learn to know and trust each other as they struggle for their lives against all odds.',
      platform: ['Xbox', 'Xcloud'],
      genres: ['Action', 'Fantasy', 'Stealth'],
      score: 81,
      playtime: 10,
      added: '2020-08-01',
      leaving: '',
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
  },

  sort: '',

  sortDirectionDown: false

};


const getters: GetterTree<State, State> = {

  getAll(state: State) {
    return state.gameList;
  },

  getFilteredByAll(state: State) {
    return sortedBy(filterByAll(state.gameList, state.filters), state.sort, state.sortDirectionDown);
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
  },

  getSorted(state: State) {
    return sortedBy(state.gameList, state.sort, state.sortDirectionDown);
  },
  
  getGenres(state: State) {
    return state.genreList;
  }

}

const mutations: MutationTree<State> = {

  setGameList(state: State, games: Array<Game>) {
    state.gameList = games;
  },

  setGenreList(state: State, genres: Array<string>) {
    state.genreList = genres;
  },

  setAllFilters(state: State, filters: FilterGroup) {
    state.filters = filters;
  },

  setGenresFilter(state: State, genre: string) {
    if (state.filters.genres.includes(genre)) {
      const filtered = state.filters.genres.filter(item => item !== genre);
      state.filters.genres = filtered;
    } else state.filters.genres.push(genre);
    
  },

  setPlatformsFilter(state: State, tag: string) {

    if (state.filters.platforms.includes(tag)) {
      const filtered = state.filters.platforms.filter(item => item !== tag);
      state.filters.platforms = filtered;
    } else state.filters.platforms.push(tag);

  },

  setSliderFilter(state: State, data: MutationNumberArray) {
    state.filters[data.variable + 'Min'] = data.value[0];
    state.filters[data.variable + 'Max'] = data.value[1];
  },

  setToggleFilter(state: State, data: MutationBoolean) {
    state.filters[data.variable] = data.value;
  },

  setSort(state: State, data: string) {
    state.sort = data;
  },

  setSortDirection(state: State, data: boolean) {
    state.sortDirectionDown = data;
  }

}

export const store = createStore({
  state,
  getters,
  mutations
});