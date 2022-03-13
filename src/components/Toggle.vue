<template>
    <Toggle v-model="value" @change="toggle()"/>
</template>

<script lang="ts">
  import { store } from '../store';
  import { MutationBoolean } from '../types';
  import Toggle from '@vueform/toggle'
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    props: {
      initialValue: {
        type: Boolean,
        required: true
      },
      toggleId: {
        type: String, 
        required: true
      }
    },
    components: {
      Toggle
    },

    setup(props) {

      function toggle() {
        const toggleData: MutationBoolean = {
          variable: props.toggleId,
          value: value.value
        }
        
        store.commit('setToggleFilter', toggleData);
      }

      const value = ref(props.initialValue);

      return {
        value,
        toggle
      }

    }
  })
</script>

<style src="@vueform/toggle/themes/default.css"></style>