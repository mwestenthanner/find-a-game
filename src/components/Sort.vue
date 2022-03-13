<template>
    <div class="sort">
        <div class="sort-category">
            <select name="sort-cat" id="sort-cat" @change="sort($event)">
                <option value="alphabet">A - Z</option>
                <option value="playtime">Playtime</option>
                <option value="score">Score</option>
            </select>
        </div>
        <div class="sort-direction" @click="setSortDirection()">{{ sortDirection }}</div>
    </div>
</template>

<script lang="ts">
  import { store } from '../store';
import { defineComponent, ref } from 'vue';

  export default defineComponent({

      setup() {

          let sortDirection = ref('↑');

          function setSortDirection() {
              if (sortDirection.value == '↓') {
                store.commit('setSortDirection', false);
                sortDirection.value = '↑';
              } else {
                store.commit('setSortDirection', true);
                sortDirection.value = '↓';
              } 
          }

          function sort(e: Event) {

              const target = e.target as HTMLSelectElement;
              store.commit('setSort', target.value);
              
          }

          return {
              sort,
              setSortDirection,
              sortDirection
          }

      }
    
  })
</script>

<style scoped>

.sort {
    display: flex;
    justify-content: end;
    align-items: end;
    margin-bottom: 2rem;
}

select {
    font-family: 'Lexend Deca', sans-serif;
    color: white;
    background-color: transparent;
    border: none;
    appearance: none;
    cursor: pointer;
}

option {
    font-family: 'Lexend Deca', sans-serif;
    color: white;
    background-color: var(--dark-bg);
    padding: 0.5rem;
}

.sort-direction {
    cursor: pointer;
    padding: 1rem 1rem 0 1rem;
}

</style>