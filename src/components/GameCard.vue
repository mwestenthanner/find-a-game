<template>
<div class="game-card" :style="{ backgroundImage: 'url(' + game.img + ')' }" @mouseenter="showInfo = true" @mouseleave="showInfo = false">

    <div class="on-card" :class="showInfo ? 'show' : 'hide'">
      <div class="platforms">
        <svg id="pc-icon" version="1.1" viewBox="0 0 8.4666665 8.4666669" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs2"/><g id="layer1" transform="translate(0,-288.53332)"><path d="M 2,3 C 1.4477381,3.0000552 1.0000552,3.4477381 1,4 v 20 c 5.52e-5,0.552262 0.4477381,0.999945 1,1 h 28 c 0.552262,-5.5e-5 0.999945,-0.447738 1,-1 V 4 C 30.999945,3.4477381 30.552262,3.0000552 30,3 Z m 14,18 c 0.552285,0 1,0.447715 1,1 0,0.552285 -0.447715,1 -1,1 -0.552285,0 -1,-0.447715 -1,-1 0,-0.552285 0.447715,-1 1,-1 z m -1,5 v 1.001953 h -3.099609 c -1.334635,0.06901 -1.23112,2.070963 0.103515,2.001953 h 7.994141 c 1.334635,0 1.334635,-2.001953 0,-2.001953 H 17 V 26 Z" transform="matrix(0.26458333,0,0,0.26458333,0,288.53332)"/></g></svg>
        <svg id="xbox-icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M369.9 318.2c44.3 54.3 64.7 98.8 54.4 118.7-7.9 15.1-56.7 44.6-92.6 55.9-29.6 9.3-68.4 13.3-100.4 10.2-38.2-3.7-76.9-17.4-110.1-39C93.3 445.8 87 438.3 87 423.4c0-29.9 32.9-82.3 89.2-142.1 32-33.9 76.5-73.7 81.4-72.6 9.4 2.1 84.3 75.1 112.3 109.5zM188.6 143.8c-29.7-26.9-58.1-53.9-86.4-63.4-15.2-5.1-16.3-4.8-28.7 8.1-29.2 30.4-53.5 79.7-60.3 122.4-5.4 34.2-6.1 43.8-4.2 60.5 5.6 50.5 17.3 85.4 40.5 120.9 9.5 14.6 12.1 17.3 9.3 9.9-4.2-11-.3-37.5 9.5-64 14.3-39 53.9-112.9 120.3-194.4zm311.6 63.5C483.3 127.3 432.7 77 425.6 77c-7.3 0-24.2 6.5-36 13.9-23.3 14.5-41 31.4-64.3 52.8C367.7 197 427.5 283.1 448.2 346c6.8 20.7 9.7 41.1 7.4 52.3-1.7 8.5-1.7 8.5 1.4 4.6 6.1-7.7 19.9-31.3 25.4-43.5 7.4-16.2 15-40.2 18.6-58.7 4.3-22.5 3.9-70.8-.8-93.4zM141.3 43C189 40.5 251 77.5 255.6 78.4c.7.1 10.4-4.2 21.6-9.7 63.9-31.1 94-25.8 107.4-25.2-63.9-39.3-152.7-50-233.9-11.7-23.4 11.1-24 11.9-9.4 11.2z"/></svg>
        <svg id="cloud-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48h-48z" fill="none"/><path d="M38.71 20.07c-1.36-6.88-7.43-12.07-14.71-12.07-5.78 0-10.79 3.28-13.3 8.07-6.01.65-10.7 5.74-10.7 11.93 0 6.63 5.37 12 12 12h26c5.52 0 10-4.48 10-10 0-5.28-4.11-9.56-9.29-9.93z"/></svg>
      </div>
      <div class="basic-info">
        <h3>{{ game.title }}</h3>
        <div class="genres">
          <span v-for="(item, key) in game.genres" :key="key" :class="randomizeTagColor()">{{ item }}</span>
        </div>
      </div>
    </div>

    <div class="further-info">
      <p>{{ game.description }}</p>
      <p>Playtime: {{ game.playtime }}</p>
      <p>Review score: {{ game.score }}</p>
    </div>
</div>
</template>

<script lang="ts">
import { Game } from '@/types';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  props: {
      game:  {
          type: Object as PropType<Game>,
          required: true
      }
  },
  setup() {

    let showInfo = ref(false);

    function randomizeTagColor() {

      const tagColors = ['purple', 'pink', 'yellow', 'orange'];
      return tagColors[Math.floor(Math.random() * tagColors.length)];

    }

    return {
      randomizeTagColor,
      showInfo
    }

  }
})
</script>

<style scoped>

.game-card {
  aspect-ratio: 3 / 4;
  background-repeat: no-repeat;
  background-size: 100%;
  border-radius: 1rem;
  overflow: hidden;
}

.on-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 1rem;
}

.hide {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s linear 300ms, opacity 300ms;
}

.show {
  visibility: visible;
  opacity: 1;
  transition: visibility 0s linear 0s, opacity 300ms;
}

.basic-info {
  padding: 2rem 2rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
    border-radius: 1rem;
}


.basic-info h3 {
  font-size: 150%;
  margin-bottom: 1rem;
}

.platforms {
  padding: 2rem;
  display: flex;
  justify-content: flex-end;
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%);
  height: 5rem;
}


.platforms > svg:not(:first-child) {
  margin-left: 0.5rem;
}

.platforms > svg {
  height: 1.5rem;
  width: auto;
  fill: white;
}

.genres > span {
  display: inline-block;
  font-size: 80%;
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
}

.genres > span:hover {
  background-color: transparent;
  color: white;
  outline: 1px solid white;
}

.further-info {
  display: none;
}


</style>
