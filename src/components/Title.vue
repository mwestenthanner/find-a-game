<template>
<div class="title">
    <h1>find a <span class="title-tag">game</span></h1>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

})
</script>

<style scoped>

.title {
    color: white;
    margin-bottom: 5rem;
}

.title-tag {
    position: relative;
}

.title-tag::after {
    content: '';
    position: absolute;
    bottom: -2rem;
    left: -0.9rem;
    right: 0.1rem;
    height: 8rem;
    width: 8rem;
    z-index: -1;
    background-image: url('../../public/controller-slanted.svg');
    background-repeat: no-repeat;
    background-size: cover;
}


</style>
