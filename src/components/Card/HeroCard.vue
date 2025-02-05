<template>
    <div class="hero_card" :style="{ 'background-color': color, 'box-shadow': `4px -3px 0px 0px ${color}87` }">
        <img :src="head" class="head">
        <div class="holder">
            <Text class="name">{{ name }}</Text>
        </div>
    </div>
</template>

<script setup>
import Text from '../Text/Text.vue';
import { ref, watch } from 'vue';
let props = defineProps(['head', 'name', 'color']);
const types = {
    '0': '#94D7F4',//初始
    '1': '#2EDD1B',//稀有
    '2': '#0087FA',//超稀有
    '3': '#B116EC',//史诗
    '4': '#FF0021',//神话
    '5': '#FFF11E'//传奇
};
const _cv = (c) => types[c] || types['0'];
var color = ref(_cv(props.color ?? '0'));
watch(() => props.color, () => color.value = _cv(props.color));
</script>

<style scoped>
.hero_card {
    position: relative;
    display: flex;
    max-width: 230px;
    max-height: 150px;
    border: solid 5px black;
    border-radius: 8px;
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

.holder .name {
    margin: 10px;
}
</style>