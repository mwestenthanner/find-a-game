<template>
<div class="game-card">
    <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/xrpmydnu9rpxvxfjkiu7.png" alt="Titel">
    <p>Description</p>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {

    const count = ref(0);

    return {
        count
    }

  }
})
</script>

<style scoped>

</style>
