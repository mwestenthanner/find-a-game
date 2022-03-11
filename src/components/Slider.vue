<template>
  <div>
    <Slider v-model="value" @update="updateSlider()" />
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
      }
    },
    components: {
      Slider
    },

    setup(props) {

      const value = ref(props.initialValue);

      function updateSlider() {

        const sliderData: MutationNumberArray = {
          variable: props.sliderId,
          value: value.value
        }

        store.commit('setSliderFilter', sliderData);

      }

      return {
        value,
        updateSlider
      }

    }
  })
</script>

<style src="@vueform/slider/themes/default.css"></style>