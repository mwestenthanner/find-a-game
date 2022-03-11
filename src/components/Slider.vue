<template>
  <div>
    <Slider v-model="value" @update="updateSlider()" :max="maximum" />
  </div>
</template>

<script lang="ts">
  import { store } from '../store'
  import { MutationNumberArray } from '../types'
  import Slider from '@vueform/slider'
  import { defineComponent, PropType, ref } from 'vue';

  export default defineComponent({
    props: {
      initialValue: {
        type: Object as PropType<Array<number>>,
        required: true
      },
      sliderId: {
        type: String, 
        required: true
      },
      max: {
        type: Number,
        required: false
      }
    },
    components: {
      Slider
    },

    setup(props) {

      const value = ref(props.initialValue);
      const maximum = ref(props.max) ?? 100;

      function updateSlider() {

        const sliderData: MutationNumberArray = {
          variable: props.sliderId,
          value: value.value
        }

        store.commit('setSliderFilter', sliderData);

      }

      return {
        value,
        maximum,
        updateSlider
      }

    }
  })
</script>

<style src="@vueform/slider/themes/default.css"></style>