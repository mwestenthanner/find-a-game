<template>
    <button @click="e => select(e)">{{ tag }}</button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { randomizeTagColor } from '@/composables/functions';

  export default defineComponent({
    props: {
        tag: {
            type: String,
            required: true
        }
    },
    setup() {

        function select(e: MouseEvent) {

            if (e) {

              const target = e.target as HTMLButtonElement;
              const tagColor = randomizeTagColor(target.textContent ?? '');

              if (target.classList.contains('selected')) {

                target.classList.remove('selected');
                target.classList.remove(tagColor);

              } else {

                target.classList.add('selected');
                target.classList.add(tagColor);

              }
            }

        }

        return {
            randomizeTagColor,
            select
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

.selected {
  outline: none;
}


</style>