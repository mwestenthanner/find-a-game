<template>
<header>
    <h1>find a <span class="title-tag">game</span></h1>
    <h2>on xbox game pass</h2>
</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

})
</script>

<style scoped>

header {
    color: white;
    margin-bottom: 4rem;
    font-size: 120%;
}

header h2 {
    font-size: 60%;
    text-transform: uppercase;
}

.title-tag {
    position: relative;
}

.title-tag::after {
    content: '';
    position: absolute;
    bottom: -2.2rem;
    left: -0.9rem;
    right: 0.1rem;
    height: 9rem;
    width: 9rem;
    z-index: -1;
    background-image: url('../../public/controller-slanted.svg');
    background-repeat: no-repeat;
    background-size: cover;
}


</style>
