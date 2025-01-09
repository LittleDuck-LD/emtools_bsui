<template>
    <div class="hero_card" :style="{ 'background-color': color }">
        <img :src="head" class="head">
        <div class="holder">
            <Text class="name">{{ name }}</Text>
        </div>
    </div>
</template>

<script setup>
import Text from '../Text/Text.vue';
let props = defineProps(['head', 'name', 'color']);
const _cv = (c) => c == '0' ? '#94D7F4' : c == '1' ? '#2EDD1B' : c == '2' ? '#0087FA' : c == '3' ? '#B116EC' : c == '4' ? '#FF0021' : c == '5' ? '#FFF11E' : '#94D7F4';
var color = _cv(props.color ?? '0');
</script>

<style scoped>
.hero_card {
    position: relative;
    display: flex;
    max-width: 250px;
    max-height: 200px;
    border: solid 5px black;
    border-radius: 5px;
}

.hero_card .head {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}

.holder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: end;
    justify-content: end;
    font-size: 1.5rem;
}
.holder .name{
    margin: 10px;
}
</style>