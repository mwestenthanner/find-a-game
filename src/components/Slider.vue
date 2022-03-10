<template>
  <div>
    <Slider v-model="value" />
  </div>
</template>

<script lang="ts">
  import Slider from '@vueform/slider'
  import { defineComponent, PropType, ref } from 'vue';

  export default defineComponent({
    props: {
      sliderValue: {
        type: Object as PropType<Array<number>>,
        required: true
      }
    },
    components: {
      Slider
    },

    setup(props) {

      const value = ref(props.sliderValue);

      return {
        value
      }

    }
  })
</script>

<style src="@vueform/slider/themes/default.css"></style>