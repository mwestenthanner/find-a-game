<template>
  <div>
    <button v-for="item in tags" :key="item">{{ item }}</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  export default defineComponent({
    props: {
        tags: {
            type: Object as PropType<Array<string>>,
            required: true
        }
    }
   
  })
</script>

<style>

button {
    font-family: 'Lexend Deca', sans-serif;
    display: inline-block;
    padding: 0.25rem 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
    background-color: transparent;
    color: white;
    outline: 1px solid white;
    border: none;
    cursor: pointer;
}


</style>