<template>
    <div class="group_card">
        <div class="group_top_desc">
            <Text class="desc">{{ desc }}</Text>
        </div>
        <div :class="{ group: 'true', [color == null ? 'green' : color]: true }">

            <img class="ico" :src="(src)">
            <div class="group_sub">
                <Text class="title">{{ title }}</Text>
                <Text class="sub_title">{{ sub_title }}</Text>
            </div>

        </div>
    </div>
</template>

<script setup>

import Text from '../Text/Text.vue';
defineProps(['src', 'title', 'sub_title', 'desc', 'color']);
function a(b) {
    if (b.startsWith('http'))
        return b;
    return new URL(b, import.meta.url).href;
}
</script>

<style scoped>
.group_card {
    display: flex;
    flex-direction: column;
    transform: skewX(-5deg);
}

.group_top_desc {
    flex: 0;
    background: #1c1a1d45;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 8px;
    border: solid 2px rgba(0,0,0,0.5);
}

.group_top_desc .desc {
    font-size: 1.2em;
}

.group {
    flex: 1;
    display: flex;
    border-radius: 8px;
    /* border: solid 3px black; */
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 0.5em;
    /* box-shadow: 0px 3px 0px black; */
    box-shadow: 0px 5px 0 0 rgba(0, 0, 0, 0.5);

}

.group .title {
    font-size: 2em;
}

.group .sub_title {
    font-size: 1.5em;
}

.group_card:active {
    transform: scale(0.95) skewX(-5deg);
}

.group>*,
.group_top_desc>* {
    transform: skewX(5deg);
}

.group .ico {
    flex: 0;
    width: 50px;
    height: 50px;
    object-fit: contain;
}

.group .group_sub {
    flex: 1;
    display: inline-flex;
    flex-direction: column;
}

.group .ico,
.group .group_sub {
    margin: 5px;
}
</style>