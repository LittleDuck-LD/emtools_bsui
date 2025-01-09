<template>
    <div class="icon_card">
        <Text class="desc_title" v-if="title">{{ title }}</Text>
        <img class="ico" :src="ico">
        <span class="desc_text">
            <Text v-if="!link">{{ text }}</Text>
            <span class="linked" v-if="link" @click="href"><Text color="#81D621">{{ text }}</Text></span>
        </span>
    </div>
</template>

<script setup>
import Text from '@/components/Text/Text.vue';
defineProps(['ico', 'title', 'text', 'link', 'href']);
</script>

<style scoped>
.icon_card {
    position: relative;
    background: rgb(0 0 0 / 27%);
    border-radius: 7px;
    display: flex;
    justify-content: center;
    padding: 0.55em 0.50em;
    font-size: inherit;
    box-sizing: content-box;
    align-items: center;
    margin: 10px;
}

.linked{
    cursor: pointer;
}

.ico {
    width: 2em;
    height: 2em;
    object-fit: contain;
    position: absolute;
    left: -15px;
}

.desc_text {
    display: inline-flex;
    justify-content: center;
}

.desc_title {
    position: absolute;
    top: 0;
    margin: -0.7em;
    z-index: 1;
}
</style>