import { createStore } from 'vuex'
import { Game } from '../types'

export type State = {
  gameList: Array<Game>
};

const state: State = {

  gameList: [

    {
      id: 9138579238745,
      title: 'Stardew Valley',
      img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/xrpmydnu9rpxvxfjkiu7.png',
      description: 'After escaping the burden of city life, an office worker begins their new life managing their grandfather\'s farmland in the rural region of Stardew Valley in this indie mix of top-down action-RPG and life simulation.',
      platform: 'Xbox + PC',
      xcloud: true,
      genres: ['Adventure', 'Role-Playing', 'Simulation'],
      score: 91,
      playtime: 100
    } as Game,

    {
      id: 385034728354,
      title: 'Subnautica',
      img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1iqw.png',
      description: 'Descend into the depths of an alien underwater world filled with wonder and peril. Craft equipment, pilot submarines and out-smart wildlife to explore lush coral reefs, volcanoes, cave systems, and more, all while trying to survive.',
      platform: 'Xbox + PC',
      xcloud: true,
      genres: ['Open World', 'Science fiction', 'Survival'],
      score: 85,
      playtime: 41
  } as Game

  ]

};

export const store = createStore({
  state
});