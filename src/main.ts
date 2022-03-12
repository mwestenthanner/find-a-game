import { createApp } from 'vue'
import { store } from "./store"
import App from './App.vue'

store.commit('setGenreList');

createApp(App)
    .use(store)
    .mount('#app')
