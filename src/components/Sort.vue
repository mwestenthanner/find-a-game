<template>
    <div class="sort">
        <select name="sort" id="sort">
            <option value="default">Sort by</option>
            <option value="default">Latest</option>
            <option value="default">Oldest</option>
            <option value="default">Alphabetical</option>
        </select>
    </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    
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
}

option {
    font-family: 'Lexend Deca', sans-serif;
    color: white;
    background-color: var(--dark-bg);
    padding: 0.5rem;
}

</style>