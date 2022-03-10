<template>
    <Toggle v-model="value" />
</template>

<script lang="ts">
  import Toggle from '@vueform/toggle'
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    props: {
      toggleValue: {
        type: Boolean,
        required: true
      }
    },
    components: {
      Toggle
    },

    setup(props) {

      const value = ref(props.toggleValue);

      return {
        value
      }

    }
  })
</script>

<style src="@vueform/toggle/themes/default.css"></style>